const UserService = require("../../service/UserService");
const { UserType } = require('../types');
const
{
    GraphQLString,
    GraphQLID
} = require('graphql');

module.exports = {
    type: UserType,
    args: 
    { 
        id: 
        { 
            type: GraphQLID
        } 
    },
    resolve: async(obj, { id }, { res }) => {
        const reservationList = await UserService._getAllReservationsByEmail(id);
        return reservationList;
    
    }
}