const UserService = require("../../service/UserService");
const { ReservationType } = require('../types');
const
{
    GraphQLInt
} = require('graphql');

module.exports = {
    type: ReservationType,
    resolve: async(obj, { reservation }, {res}) => {
        if (!reservation)
        {
            throw Error("Unauthorized request.")
        }
        await UserService._getReservationById(reservation.id)
        return id
    }
}