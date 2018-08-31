'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
        firstName:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        hotelName:
        {
            type: DataTypes.STRING,
            allowNull: false
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
        },
        confirmed:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    Reservation.associate = ((models) => {
        models.reservation.belongsTo(models.user)
    })
    return Reservation
}