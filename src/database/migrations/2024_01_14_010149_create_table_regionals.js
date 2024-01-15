const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable("regionals", {
            regional_id: {
                type: Sequelize.INTEGER(1),
                primaryKey: true,
                autoIncrement: true
            },
            regional_name: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            regional_sname: {
                type: Sequelize.STRING(3),
                allowNull: false
            },
            regional_code: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            updated_at: Sequelize.DATE
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable("regionals");
    }

};