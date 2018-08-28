'use strict';

module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('hotel', {
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
        street_addr:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        city:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        state:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        country:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        starting_price:
        { 
            type: DataTypes.STRING,
            allowNull: false
        },
        avail_rooms:
        { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt:
        {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '2018-08-27 13:57:22.282-04'
        },
        updatedAt:
        {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '2018-08-27 13:57:22.282-04'
        }
    });
    Hotel.associate = ((models) => {
        models.hotel.hasMany(models.reservation)
    })
    return Hotel
}