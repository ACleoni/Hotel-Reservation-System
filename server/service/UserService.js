var crypto = require('crypto');
const { user, reservation } = require('../models').sequelize.models;
const validator = require('validator');



class UserService
{
    async _createUser(email)
    {
        try
        {
            await _validateEmail(email);
            const userRecord = await user.create({
                email 
            })
            .then(res => {
                res.dataValues
            })
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
                first_name: firstName, 
                last_name: lastName, 
                hotel_name: hotelName, 
                arrival_date: arrivalDate, 
                departure_date: departureDate, 
                confirmed: false,
                userId: userId
            })
            .then(res => {
                res.dataValues
            })
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
            return id
        }
        catch(err)
        {
            throw err
        }
    }

    async _getAllReservationsByEmail(email)
    {
        try
        {
            const reservationRecord = await reservation.findOne({
                where:
                {
                    email
                }
            })
            .then(reservations => {
                console.log(reservations);
            })
            
            if (!reservationRecord) throw "No reservations found.";
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
}

// Validates a request to make a reservation to ensure all fields are filled out properly
const _validateRequest = (firstName, lastName, hotelName, arrivalDate, departureDate) => {
    return new Promise((resolve, reject) => {
        if (!firstName) reject("Please enter your first name.");
        if (!lastName) reject("Please enter your first name.");
        if (!hotelName) reject("Please enter the name of the hotel you would like to reserve.");
        if (!arrivalDate) reject("Please enter a date of arrival.");
        if (!departureDate) reject("Please enter a date of return.");
        resolve();
    })
};

// After user successfully makes a reservation, a confirmation link is sent to their email to confirm the reservation
const _generateConfirmationToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('hex'));
        });
    });
}

module.exports = (new UserService());
