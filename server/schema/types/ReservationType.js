const
{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: () => ({
        id:
        {
            type: GraphQLInt,
            resolve: (obj) => obj.id
        },
        username:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.username
        },
        email:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.email
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
        }
    })
})

module.exports = ReservationType