const { user, reservation, hotel } = require('../models').sequelize.models;
const validator = require('validator');
const compare = require('compare-lat-lon');

// Everything in the UserService class handles information from the GraphQL schema and returns data depending
// on the queries or mutations that are requested by the user. All information is stored in a database using postgres and sequelize.
// Queries being made are pulled from the database and returned to the client.

class UserService
{
    async _createUser(email)
    {
        try
        {
            await _validateEmail(email);
            const userRecord = await user.findOrCreate({
                where: 
                {   
                    email 
                }
            })
            .then(res => res[0].dataValues)
            return userRecord
        }
        catch(err)
        {
            throw err
        }
    }

    async _createReservation(firstName, lastName, hotelName, arrivalDate, departureDate, confirmed, userId)
    {
        try
        {
            await _validateRequest(firstName, lastName, hotelName, arrivalDate, departureDate, confirmed, userId);
            const reservationRecord = await reservation.create({
                firstName: firstName, 
                lastName: lastName, 
                hotelName: hotelName, 
                arrivalDate: arrivalDate, 
                departureDate: departureDate, 
                confirmed: true,
                userId: userId
            })
            .then(res => res.dataValues)
            return reservationRecord
        }
        catch(err)
        {
            throw err
        }
    }

    async _getReservationById(id)
    {
        try
        {
            const reservationRecord = await reservation.findById(id);
            if (reservationRecord === null) throw "No ID found for requested reservation."
            return reservationRecord
        }
        catch(err)
        {
            throw err
        }
    }

    async _getAllReservationsByEmail(userId)
    {
        try
        {
            const reservationRecord = await reservation.findAll({
                where:
                {
                    userId
                }
            })
            .then(res => {
                return new Promise((resolve, reject) => {
                    let reservationList = [];
                    for(let i=0; i < res.length; i++) 
                    {
                        reservationList.push(res[i].dataValues);
                        if (i == res.length - 1) resolve(reservationList);
                    }
                });
            })       
            if (!reservationRecord) throw "No reservations found.";
            return reservationRecord
        }
        catch(err)
        {
            throw err
        }
    }

    async _getHotels(lat, lon)
    {
        try
        {
            const hotelRecord = await hotel.findAll({
                
            })
            .then(res => {
                return new Promise((resolve, reject) => {
                    let hotelList = []
                    for (let i=0; i < res.length; i++)
                    {
                        // This function loops through all hotels
                        // compares distances between the users location and the hotels location
                        // and only returns hotels within 20 km or approximately 10 - 12 miles of the users location 
                        if (compare(lat, lon, res[i].dataValues.latitude, res[i].dataValues.longitude) < 20) {
                            hotelList.push(res[i].dataValues);
                        }
                        if ( i == res.length -1) resolve(hotelList)
                    }
                })
            })
            return hotelRecord
        }
        catch(err)
        {
            throw err
        }
    }
}


// Validates whether an email is a valid email or of the input field is left blank
const _validateEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) reject("Please enter a valid email address.");
        if (!validator.isEmail(String(email))) reject("Email is invalid. Please try again.");
        resolve()
    })
};

// Validates a request to make a reservation to ensure all fields are filled out properly
const _validateRequest = (firstName, lastName, hotelName, arrivalDate, departureDate) => {
    return new Promise((resolve, reject) => {
        if (!firstName) reject("Please enter your first name.");
        if (!lastName) reject("Please enter your last name.");
        if (!hotelName) reject("Please enter the name of the hotel you would like to reserve.");
        if (!arrivalDate) reject("Please enter a date of arrival.");
        if (!departureDate) reject("Please enter a date of return.");
        resolve();
    })
};

module.exports = (new UserService());
