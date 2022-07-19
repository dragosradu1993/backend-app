const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const Promotions_Teachers = sequelize.define('Promotions_Teachers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        availableSlotsBachelors: {
            type: DataTypes.INTEGER,
            defaultValue:0,
            allowNull: false
        },
        availableSlotsDisertations: {
            type: DataTypes.INTEGER,
            defaultValue:0,
            allowNull: false
        },
        isCoordinatorBachelors: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isCoordinatorDisertation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return Promotions_Teachers

}