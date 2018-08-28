const UserService = require('../../service/UserService');
const { UserType } = require('../types');

const {
    GraphQLString
} = require('graphql');

module.exports = {
    type: UserType,
    args: 
    {
        email: 
        { 
            type: GraphQLString 
        }
    },
    resolve: async(obj, { email }, { res }) => {
        try 
        {
            await UserService._createUser(email);
            return { email };
        } 
        catch (err) 
        {
            throw err;
        }
    }
}