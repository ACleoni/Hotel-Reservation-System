const jwt = require('jsonwebtoken');
const { Reservation } = require('../models').sequelize.models;
const validator = require('validator');


class ReservationService
{
    async _createReservation(username, email, arrivalDate, departureDate)
    {
        try
        {
            await _validateRequest(username, email, arrivalDate, departureDate)
        }
        catch(err)
        {
            throw err
        }
    }
}