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
        city: 
        { 
            type: GraphQLString
        } 
    },
    resolve: async(obj, { city }, { res }) => {
        const hotelList = await UserService._getHotels(city) 
        return hotelList
    }
}