'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
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
    Reservation.associate = ((models) => {
        models.reservation.belongsTo(models.hotel)
    })
    return Reservation
}