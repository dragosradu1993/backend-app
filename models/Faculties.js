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
        Faculty.hasMany(models.Students, {
         foreignKey: 'facultyId',
         as: 'students'
        })
        Faculty.hasMany(models.Secretaries, {
            foreignKey: 'facultyId',
            as: 'secretaries'
           })
        Faculty.hasMany(models.Teachers, {
            foreignKey: 'facultyId',
            as: 'teachers'
        })
        Faculty.hasMany(models.Promotions, {
            foreignKey: 'facultyId',
            as: 'promotions'
        })
        Faculty.hasMany(models.Projects, {
            foreignKey: 'facultyId',
            as: 'projects'
        })
    }
    return Faculty
}