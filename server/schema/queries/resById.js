const UserService = require("../../service/UserService");
const { ReservationType } = require('../types');
const
{
    GraphQLID
} = require('graphql');

module.exports = {
    type: ReservationType,
    resolve: async({id: {reservation}}) => {
        if (!id)
        {
            throw Error("Unauthorized request.")
        }
        return await UserService._getReservationById(reservation.id)
    }
}