'use strict';

module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('hotel', {
        name:
        { 
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Hotel.associate = ((models) => {
        models.hotel.belongsTo(models.reservation, {
            foreignKey:
            {
                allowNull: false
            }
        })
    })
    return Hotel
}