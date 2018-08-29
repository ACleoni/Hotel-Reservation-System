const
{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
} = require('graphql');

const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: () => ({
        id:
        {
            type: GraphQLID,
            resolve: (obj) => obj.id
        },
        firstName:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => {
                console.log(obj)
                return obj.first_name
            }
        },
        lastName:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.last_name
        },
        hotelName:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.hotel_name
        },
        arrivalDate:
        {
            type:  new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.arrival_date
        },
        departureDate:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.departure_date
        },
        confirmed:
        {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: (obj) => obj.confirmed
        }
    })
})

module.exports = ReservationType