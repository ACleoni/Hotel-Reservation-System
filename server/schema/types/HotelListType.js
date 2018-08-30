const HotelType = require('./HotelType')
const
{
    GraphQLList,
    GraphQLID,
    GraphQLObjectType
} = require('graphql');

const HotelListType = new GraphQLObjectType({
    name: 'HotelList',
    fields: () => ({
        id: 
        { 
            type: GraphQLID,
            resolve: (obj) => obj.id
        },
        hotelList:
        {
            type: new GraphQLList(HotelType),
            resolve: (obj) => obj
        }
    })
});

module.exports = HotelListType;