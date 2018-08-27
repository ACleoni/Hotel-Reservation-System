'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false
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
        },
        emailConfirmed:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return User
}