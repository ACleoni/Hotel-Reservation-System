
import React, 
{
    Component
} from 'react';
import 
{
    View, 
    Text,
    ActivityIndicator, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';

import  { FormInput } from 'react-native-elements';

import { gql } from 'apollo-boost';
import { graphql, compose, Query } from 'react-apollo';


const getReservationsById = gql`
query ResById($id: Int!){
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
                value: '',
                queryByEmail: false,
                querybyId: false
            }
            this._handleChange = this._handleChange.bind(this);
            this._checkValue = this._checkValue.bind(this);
        }
    
    _handleChange(event , target) 
    {
        this.setState({[target]: event})
    }

    _checkValue()
    {
        let atSign = '@';
        // this.state.value.includes(atSign)  ? this.setState({ 
        //                                         queryByEmail: true, 
        //                                         querybyId: false 
        //                                     })
        //                                     : this.setState({
        //                                         queryByEmail: false,
        //                                         querybyId: true
        //                                     }) 
    }

    async _queryById()
    {
        return <Query query={getReservationsById} variables={{email: 'alexander.cleoni@gmail.com'}}>
            {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) {
                return <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
            } else
                return data.resByEmail.map((hotel, index) => {
                    return (
                        <View style={styles.cardContainer} key={index}>
                            <View style={styles.cardSection}>
                                <View style={styles.card}>
                                    <Text style={{ fontSize: 20, fontWeight: '400', opacity: 0.98, color: 'black' }}>{hotel.name}</Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={{paddingBottom: 10, fontSize: 16, color: 'black', marginTop: 1, fontWeight: '200'}}>{hotel.city}, {hotel.state}</Text>
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'black', marginTop: 1,}}>{hotel.availRooms} rooms left</Text>
                                    
                                </View>

                                <View style={{height: '100%', justifyContent: 'space-around', }}>
                                    <View>
                                        <Text style={{ fontSize: 22, color: 'black', marginTop: 1, paddingTop: 2}}>{hotel.startingPrice}</Text>
                                        <Text style={{ fontSize: 14, color: 'black', marginTop: 1}}>Avg price per night</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this._handleModalVisible(hotel.name)}>
                                        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#3ab71d', flex: 0, borderRadius: 0, width: 120, height: 30, borderRadius: 5}}>
                                            <Text style={{fontSize: 14, color: '#fff'}}>
                                                Reserve Now
                                            </Text>
                                        </View>  
                                    </TouchableOpacity> 
                                </View>  
                            </View>
                        </View>
                    )
                })
            }}
        </Query>
    }

    componentDidMount() 
    {
        console.log('Mounting')
        setTimeout(() => {
            console.log(this.props)
        }, 2000)
    }

    render() {
        return (
            <View>
                <FormInput
                    value={this.state.value}
                    onSubmitEditing={this._checkValue()}
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
    graphql(getReservationsById, {name: 'ResById'})
)(Reservations)