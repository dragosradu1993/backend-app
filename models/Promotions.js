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
         }
    })

    Promotion.associate = (models) => {
        
        Promotion.hasMany(models.Projects, {
          foreignKey: 'promotionId',
          as: 'projects'
        })
        Promotion.belongsToMany(models.Students, {through: 'Promotions_Students'})
        Promotion.belongsToMany(models.Teachers, {through: 'Promotions_Teachers'})
    }
    return Promotion
}