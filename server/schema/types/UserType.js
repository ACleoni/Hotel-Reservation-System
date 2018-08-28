const ReservationType = require('./ReservationType')

const
{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:
        {
            type: GraphQLID,
            resolve: (obj) => obj.id
        },
        email:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.email
        },
        reservationList:
        {
            type: new GraphQLList(ReservationType),
            resolve: (obj) => obj.reservationList
        }
    })
})

module.exports = UserType;