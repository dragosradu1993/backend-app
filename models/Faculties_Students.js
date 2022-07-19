const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const Faculties_Students = sequelize.define('Faculties_Students', {
            id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
    })

    return Faculties_Students

}