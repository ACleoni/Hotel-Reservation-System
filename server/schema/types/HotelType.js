const
{
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType
} = require('graphql');

const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: () => ({
        id: 
        { 
            type: GraphQLID,
            resolve: (obj) => obj.id
        },
        name:
        {
            type: GraphQLString,
            resolve: (obj) => obj.name
        },
        streetAddr:
        {
            type: GraphQLString,
            resolve: (obj) => obj.street_addr
        },
        city:
        {
            type: GraphQLString,
            resolve: (obj) => obj.city
        },
        state:
        {
            type: GraphQLString,
            resolve: (obj) => obj.state
        },
        latitude:
        { 
            type: GraphQLString,
            resolve: (obj) => obj.latitude
        },
        longitude:
        { 
            type: GraphQLString,
            resolve: (obj) => obj.longitude
        },
        startingPrice:
        { 
            type: GraphQLString,
            resolve: (obj) => obj.starting_price
        },
        availRooms:
        { 
            type: GraphQLInt,
            resolve: (obj) => obj.avail_rooms
        }
    })
});

module.exports = HotelType