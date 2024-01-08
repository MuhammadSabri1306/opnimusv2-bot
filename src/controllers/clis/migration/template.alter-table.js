const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        // await queryInterface.addColumn('{{ tableName }}', {});
        // await queryInterface.changeColumn('{{ tableName }}', {});
        // await queryInterface.removeColumn('{{ tableName }}', {});
    },

    async down({ context: queryInterface }) {
        // await queryInterface.addColumn('{{ tableName }}', {});
        // await queryInterface.changeColumn('{{ tableName }}', {});
        // await queryInterface.removeColumn('{{ tableName }}', {});
    }

};