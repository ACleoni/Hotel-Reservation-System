const
{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
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
        }
    })
})

module.exports = UserType;