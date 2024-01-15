const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable("locations", {
            location_id: {
                type: Sequelize.INTEGER(4),
                primaryKey: true,
                autoIncrement: true
            },
            location_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            location_sname: {
                type: Sequelize.STRING(5),
                allowNull: false
            },
            datel_id: {
                type: Sequelize.INTEGER(3),
                allowNull: true,
                references: {
                    model: "datels",
                    key: "datel_id"
                },
                onDelete: "set null",
                onUpdate: "set null"
            },
            updated_at: Sequelize.DATE
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable("locations");
    }

};