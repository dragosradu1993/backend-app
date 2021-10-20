const { Sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const AppSetting = sequelize.define("AppSettings", {
        isSet: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        themeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        navbarColor: {
            type: DataTypes.STRING,
            allowNull: false
        }       
    })

    AppSetting.associate = (models) => {
        AppSetting.belongsTo(models.Users, {foreignKey: 'userId'})
    }

    return AppSetting
}