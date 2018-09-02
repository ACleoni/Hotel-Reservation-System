
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import  {Button, FormInput} from 'react-native-elements';

import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';


const resById = gql `
query ($id: String!){
	resById(id: $id) 
    {
        id
        firstName
        lastName
        hotelName
        arrivalDate
        departureDate
    }
}
`

class Reservations extends Component 
{
    constructor(props)
        {
            super(props);
            this.state = {
                value: ''
            }
            this._handleChange = this._handleChange.bind(this);
            this._checkValue = this._checkValue.bind(this);
        }
    
    _handleChange(event , target) 
    {
        this.setState({[target]: event})
    }

    async _checkValue()
    {
        let atSign = '@';
        this.state.value.includes(!atSign) ? 
        await this.props.resById({
            variables:
            {
                id: 1
            }
        }).then(res => {
            console.log(res)
        }) 
        
        : null;
    }

    componentDidMount() 
    {
        // this.animation.play();
    }

    render() {
        return (
            <View>
                <FormInput
                    value={this.state.value}
                    onSubmitEditing={this._checkValue}
                    onChangeText={(event) => this._handleChange(event, 'value')}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default compose(
    graphql(resById, {name: 'Id'}),
    // graphql(resByUser, {name: 'User'})
)(Reservations)