const { Sequelize } = require("sequelize");
const { Umzug, JSONStorage } = require("umzug");
const dbConfig = require("../../../config/database/default");
const { appPath, realAppPath } = require("../../../utils/app");
const { MigrationTemplate, MigrationWithTableTemplate } = require("../../../utils/migration");
const { formatDate } = require("../../../utils/date");

const { host, username, password, database } = dbConfig.get();
const migrationsDir = appPath("database/migrations");
const migrationsPathGlob = `${ migrationsDir }/*.js`;
const jsonStoragePath = realAppPath("storages/migration/migration-storage.json");
const templateDir = appPath("controllers/clis/migration");

const templates = [
    new MigrationWithTableTemplate({
        filePath: templateDir + "/template.create-table.js",
        typeExtractor: migrationName => migrationName.indexOf("create_table") === 0 ? "create_table" : null
    }),
    new MigrationWithTableTemplate({
        filePath: templateDir + "/template.alter-table.js",
        typeExtractor: migrationName => migrationName.indexOf("alter_table") === 0 ? "alter_table" : null
    }),
    new MigrationTemplate({ filePath: templateDir + "/template.default.js" }),
];

module.exports.createMigrator = (params = {}) => {

    const sequelize = new Sequelize(database, username, password, { host, dialect: "mysql" });

    const config = {
        migrations: {
            glob: [ "*.js", { cwd: migrationsDir } ]
        },
        context: sequelize.getQueryInterface(),
        storage: new JSONStorage({ path: jsonStoragePath }),
        logger: console
    };

    if(params.templateContent) {
        if(typeof params.templateContent != "string")
            throw new Error("migration.createMigrator templateContent should be string");
        config.create = {
            template: filepath => [
                [filepath, params.templateContent],
            ]
        };
    }

    const umzug = new Umzug(config);
    return { umzug, sequelize };

};

module.exports.createMigration = async (migrationName) => {
    const template = templates.find(templ => templ.isMatch(migrationName));
    const { umzug } = this.createMigrator({
        templateContent: template.getContent()
    });
    await umzug.create({
        name: `${ formatDate(new Date(), "y_m_d_his") }_${ migrationName }.js`,
        folder: migrationsDir,
        prefix: "NONE",
        skipVerify: true,
        allowConfusingOrdering: true
    });

};

module.exports.status = async () => {

    const { umzug } = this.createMigrator();
    // console.log(umzug);
    const migrations = await umzug.pending();
    console.log( migrations.map(migration => migration.name) );

}

module.exports.execute = async (params = {}) => {
    const { name, step } = params;
    const { umzug, sequelize } = this.createMigrator();

    if(Array.isArray(name)) {
        
        // e.g await umzug.up({ migrations: ['20141101203500-task', '20141101203501-task-2'] });
        await umzug.up({ migrations: name });

    } else if(name) {
        
        // e.g await umzug.up({ to: '20141101203500-task' });
        await umzug.up({ to: name });

    } else if(step) {

        // e.g await umzug.up({ step: 2 })
        await umzug.up({ step });

    } else {

        const migrations = await umzug.up();

    }

    sequelize.authenticate().then(() => sequelize.close());
};

module.exports.revert = async (params = {}) => {
    const { name, step, all } = params;
    const { umzug, sequelize } = this.createMigrator();

    if(Array.isArray(name)) {
        
        // e.g await umzug.down({ migrations: ['20141101203500-task', '20141101203501-task-2'] });
        await umzug.down({ migrations: name });

    } else if(name) {
        
        // e.g await umzug.down({ to: '20141101203500-task' });
        await umzug.down({ to: name });

    } else if(step) {

        // e.g await umzug.down({ step: 2 })
        await umzug.down({ step });

    } else if(all) {

        // e.g await umzug.down({ step: 2 })
        await umzug.down({ to: 0 });

    } else {

        await umzug.down();

    }

    sequelize.authenticate().then(() => sequelize.close());
};