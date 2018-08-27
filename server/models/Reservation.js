'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        username:
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
        },
        arrivalDate:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        departureDate:
        {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });
    return Reservation
}