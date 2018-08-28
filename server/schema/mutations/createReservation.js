const UserService = require('../../service/UserService');
const { ReservationType } = require('../types');

const {
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

module.exports = {
    type: ReservationType,
    args: 
    {
        firstName: 
        { 
            type: GraphQLString 
        },
        lastName:
        {
            type: GraphQLString 
        },
        hotelName:
        {
            type: GraphQLString 
        },
        arrivalDate:
        {
            type: GraphQLString 
        },
        departureDate:
        {
            type: GraphQLString 
        },  
        confirmed: 
        {
            type: GraphQLBoolean
        },
        userId: 
        {
            type: GraphQLInt
        }
    },
    resolve: async(obj, { firstName, lastName, hotelName, arrivalDate, departureDate, confirmed, userId }, { res }) => {
        try 
        {
            await UserService._createReservation(firstName, lastName, hotelName, arrivalDate, departureDate, confirmed, userId);
            return { 
                        firstName, 
                        lastName, 
                        hotelName, 
                        arrivalDate, 
                        departureDate, 
                        confirmed,
                        userId
                    };
        } 
        catch (err) 
        {
            throw err;
        }
    }
}