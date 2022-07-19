const {Sequelize,DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    const Faculty = sequelize.define("Faculties", {
         name: {
             type: DataTypes.STRING,
             allowNull: true
         },
         address: {
             type: DataTypes.STRING,
             allowNull: true
         },
         phoneNumber: {
             type: DataTypes.STRING,
         },
         shortName: {
             type: DataTypes.STRING,
             unique: true
         }
    })

    Faculty.associate = function(models) {
        Faculty.belongsToMany(models.Students,{through: 'Faculties_Students'})
        Faculty.hasMany(models.Secretaries, {
            foreignKey: 'facultyId',
            as: 'secretaries'
           })
        Faculty.belongsToMany(models.Teachers, {through: 'Faculties_Teachers'})
        Faculty.hasMany(models.Promotions)
        Faculty.hasMany(models.Projects)
    }
    return Faculty
}