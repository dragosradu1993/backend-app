'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRoles', {
        roleName: {
            type: DataTypes.ENUM('ADMIN', 'SECRETARY', 'STUDENT', 'TEACHER'),
            allowNull: true
        }
    });
    UserRole.associate = (models) => {
        UserRole.belongsTo(models.Users)
    }
    return UserRole;
}


