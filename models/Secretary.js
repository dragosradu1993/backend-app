const { Sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Secretary = sequelize.define("Secretaries", {
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('LICENTA', 'MASTER'),
            allowNull: false
        }
    })

    Secretary.associate = function(models) {
        Secretary.belongsTo(models.Profiles)
    }
    return Secretary
}