const
{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:
        {
            type: GraphQLInt,
            resolve: (obj) => obj.id
        },
        email:
        {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (obj) => obj.email
        }
    })
})

module.exports = UserType;