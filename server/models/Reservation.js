'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
        first_name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        hotel_name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrival_date:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        departure_date:
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