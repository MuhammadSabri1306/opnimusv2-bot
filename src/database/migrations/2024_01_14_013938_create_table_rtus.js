const { Sequelize } = require("sequelize");

/*
 * queryInterface is typeof QueryInterface
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 * https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
*/
module.exports = {

    async up({ context: queryInterface }) {
        await queryInterface.createTable("rtus", {
            rtu_id: {
                type: Sequelize.INTEGER(5),
                primaryKey: true,
                autoIncrement: true
            },
            rtu_cid: Sequelize.STRING(40),
            rtu_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            rtu_sname: {
                type: Sequelize.STRING(5),
                allowNull: false
            },
            location_id: {
                type: Sequelize.INTEGER(4),
                allowNull: false,
                references: {
                    model: "locations",
                    key: "location_id"
                }
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
            regional_id: {
                type: Sequelize.INTEGER(1),
                allowNull: true,
                references: {
                    model: "regionals",
                    key: "regional_id"
                },
                onDelete: "set null",
                onUpdate: "set null"
            },
            updated_at: Sequelize.DATE
        });
    },

    async down({ context: queryInterface }) {
        await queryInterface.dropTable("rtus");
    }

};