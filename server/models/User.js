'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                isEmail:
                {
                    args: true,
                    msg: "Please enter a valid email address."
                }
            }
        }
    });
    User.associate = ((models) => {
        models.user.hasMany(models.reservation)
    })
    return User
}