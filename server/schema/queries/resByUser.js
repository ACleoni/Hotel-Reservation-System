const UserService = require("../../service/UserService");
const { UserType } = require('../types');
const
{
    GraphQLString
} = require('graphql');

module.exports = {
    type: UserType,
    args: 
    { 
        email: 
        { 
            type: GraphQLString
        } 
    },
    resolve: async(obj, { email }, { res }) => {
        const reservationList = await UserService._getAllReservationsByEmail(email);
        return reservationList;
    }
}