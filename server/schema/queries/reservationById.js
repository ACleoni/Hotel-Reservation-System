const UserService = require("../../service/UserService");
const { ReservationType } = require('../types');
const
{
    GraphQLInt
} = require('graphql');

module.exports = {
    type: ReservationType,
    resolve: async(obj, args, { reservation }) => {
        if (!reservation)
        {
            throw Error("Unauthorized request.")
        }
        return await UserService._getReservationById(reservation.id)
    }
}