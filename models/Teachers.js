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
      
        Teacher.hasMany(models.Projects, {
          foreignKey: 'teacherId',
          target: 'id'
        });
        Teacher.belongsTo(models.Profiles)
        Teacher.belongsToMany(models.Promotions, {through: 'Promotions_Teachers'})
    }
    return Teacher
}