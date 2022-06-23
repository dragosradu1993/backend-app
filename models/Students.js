const { Sequelize, DataTypes, Model } = require("sequelize")

module.exports = (sequelize) => {
    const Student = sequelize.define("Students", {
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        identityId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true
            }
        },
        educationForm: {
            type: DataTypes.ENUM('ZI', 'ID'),
            allowNull: false
        },
        budgetForm: {
            type: DataTypes.ENUM('BUGET', 'TAXA'),
            allowNull: false
        }
    })

    Student.associate = (models) => {
        Student.hasMany(models.Projects, {
          foreignKey: 'studentId',
          as: 'projects'
        })
        Student.belongsTo(models.Profiles)
        Student.belongsToMany(models.Promotions, {through: 'Promotions_Students'})
    }

    return Student
}