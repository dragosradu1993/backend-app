const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    const App = sequelize.define("App", {
        appName: {
            type: DataTypes.STRING, 
         },
         appLogo: {
             type: DataTypes.STRING,
             allowNull: true
         },
         logoPath: {
             type: DataTypes.STRING,
             allowNull: true
         },
         universityName: {
             type: DataTypes.STRING,
         },
         phoneNumber: {
             type: DataTypes.STRING,
         },
         universityAddress: {
             type: DataTypes.STRING,
         },
         isSet: {
             type: DataTypes.BOOLEAN,
             allowNull: false,
             defaultValue: false 
         }
    })

    App.associate = function(models) {
        App.hasMany(models.Users, {
            foreignKey: 'appId',
            as: 'users'
        });
    }
    return App
}