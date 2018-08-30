const UserService = require("../../service/UserService");
const { HotelListType } = require('../types');
const
{
    GraphQLString
} = require('graphql');

module.exports = {
    type: HotelListType,
    args: 
    { 
        latitude: 
        { 
            type: GraphQLString
        },
        longitude:
        {
            type: GraphQLString
        }

    },
    resolve: async(obj, { latitude, longitude }, { res }) => {
        const hotelList = await UserService._getHotels(latitude, longitude) 
        return hotelList
    }
}