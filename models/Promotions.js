const { Sequelize, DataTypes, Model } = require("sequelize")

module.exports = (sequelize) => {
    const Promotion = sequelize.define("Promotions", {
        year: {
            type: DataTypes.INTEGER, 
            allowNull:false,
        },
        isCurrent: {
           type: DataTypes.BOOLEAN,
           allowNull: false
        },
        dateLimitStudents: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        dateLimitTeachers: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    })

    Promotion.associate = (models) => {
        Promotion.hasMany(models.Messages)
        Promotion.hasMany(models.Projects)
        Promotion.belongsToMany(models.Students, {through: 'Promotions_Students'})
        Promotion.belongsToMany(models.Teachers, {through: 'Promotions_Teachers'})
        Promotion.belongsTo(models.Faculties)
    }
    return Promotion
}