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
                return obj.firstName
            }
        },
        lastName:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.lastName
        },
        hotelName:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.hotelName
        },
        arrivalDate:
        {
            type:  new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.arrivalDate
        },
        departureDate:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.departureDate
        },
        confirmed:
        {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: (obj) => obj.confirmed
        }
    })
})

module.exports = ReservationType