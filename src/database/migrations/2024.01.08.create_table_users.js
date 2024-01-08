const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: { type: Sequelize.DataTypes.STRING, allowNull: false },
            createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: true }
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable('users');
    }

};