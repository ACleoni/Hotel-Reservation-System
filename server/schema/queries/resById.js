const UserService = require("../../service/UserService");
const { ReservationType } = require('../types');
const
{
    GraphQLID
} = require('graphql');

module.exports = {
    type: ReservationType,
    args: 
    { 
        id: 
        { 
            type: GraphQLID 
        } 
    },
    resolve: async(obj, { id }, { res }) => {
        if (!id)
        {
            throw Error("Unauthorized request.")
        }
            const 
            {
                firstName, 
                lastName, 
                hotelName,
                arrivalDate,
                departureDate,
                confirmed
            } = await UserService._getReservationById(id) 

        return {
            id,
            firstName,
            lastName ,
            hotelName,
            arrivalDate ,
            departureDate,
            confirmed,
        }      
    }
}
