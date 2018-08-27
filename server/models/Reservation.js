'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
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
        reservedHotelName:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Reservation.associate = ((models) => {
        models.reservation.belongsTo(models.user, {
            foreignKey:
            {
                allowNull: false
            }
        })
    })
    return Reservation
}