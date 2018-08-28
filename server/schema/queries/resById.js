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
                first_name, 
                last_name, 
                hotel_name,
                arrival_date,
                departure_date,
                confirmed
            } = await UserService._getReservationById(id) 

        return {
            id,
            firstName: first_name,
            lastName: last_name,
            hotelName: hotel_name,
            arrivalDate: arrival_date,
            departureDate: departure_date,
            confirmed: confirmed,
        }      
    }
}
