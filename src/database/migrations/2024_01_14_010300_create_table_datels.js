const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable("datels", {
            datel_id: {
                type: Sequelize.INTEGER(3),
                primaryKey: true,
                autoIncrement: true
            },
            datel_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            witel_id: {
                type: Sequelize.INTEGER(3),
                allowNull: true,
                references: {
                    model: "witels",
                    key: "witel_id"
                },
                onDelete: "set null",
                onUpdate: "set null"
            },
            updated_at: Sequelize.DATE
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable("datels");
    }

};