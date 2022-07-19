const { Sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Teacher = sequelize.define("Teachers", {
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        }      
    })

    Teacher.associate = function(models) {
      
        Teacher.hasMany(models.Projects)
        Teacher.belongsTo(models.Profiles)
        Teacher.belongsToMany(models.Promotions, {through: 'Promotions_Teachers'})
        Teacher.belongsToMany(models.Faculties, {through: 'Faculties_Teachers'})
    }
    return Teacher
}