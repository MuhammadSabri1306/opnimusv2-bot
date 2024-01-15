const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable("alert_modes", {
            mode_id: {
                type: Sequelize.INTEGER(1),
                primaryKey: true,
                autoIncrement: true
            },
            mode_name: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            mode_rules: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            mode_title: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            mode_description: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            updated_at: Sequelize.DATE
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable("alert_modes");
    }

};