const { Sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const User = sequelize.define("Users", {
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmailOrEmpty(val, next) {
                    if(!val || val === "" || validateEmail(val)) {
                        return next()
                    } else {
                        return next('Email is invalid!')
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userRole: {
            type: DataTypes.ENUM('ADMIN', 'STUDENT', 'TEACHER', 'SECRETARY'),
            allowNull: false
        },
        userBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        loginRetry: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    User.associate = (models) => {
        User.hasOne(models.AppSettings, {as: 'appsettings', foreignKey: 'userId'})
/*        User.hasOne(models.Rights, {as: 'rights', foreignKey:'userId'})
        User.hasOne(models.Students, {as: 'student', foreignKey:'userId'})
        User.hasOne(models.Teachers, {as: 'teacher', foreignKey:'userId'})
        User.hasOne(models.Secretaries, {as: 'secretary', foreignKey:'userId'})
        User.belongsTo(models.Universities, {foreignKey: 'universityId', as: 'user'})
        */
    }
    return User
}

validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}