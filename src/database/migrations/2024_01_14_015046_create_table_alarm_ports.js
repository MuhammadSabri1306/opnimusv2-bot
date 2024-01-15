const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable("alarm_ports", {
            alarm_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            port_no: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            port_name: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            port_value: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            port_unit: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            port_severity: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            alarm_type: {
                type: Sequelize.STRING(10),
                allowNull: true
            },
            rtu_sname: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            rtu_status: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            is_closed: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            opened_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            closed_at: Sequelize.DATE
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable("alarm_ports");
    }

};