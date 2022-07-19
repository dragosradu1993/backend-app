const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const Promotions_Students = sequelize.define('Promotions_Students', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }
    })

    return Promotions_Students

}