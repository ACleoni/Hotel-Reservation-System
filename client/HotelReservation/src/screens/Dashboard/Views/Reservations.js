
import React, 
{
    Component
} from 'react';
import 
{
    Dimensions,
    View,
    ScrollView,
    Text,
    ActivityIndicator, 
    StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

import  { FormInput } from 'react-native-elements';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Button from '../../../components/form/Button';


const ReservationsByUserEmail = gql`
    query ResByUser($email: String!)
    {
        resByUser(email: $email) 
        {
            reservationList 
            {
                id
                firstName
                lastName
                hotelName
                arrivalDate
                departureDate
                confirmed
            }
        }
    }
`

const ReservationsById = gql`
    query ResById($id: String!) 
    {
        resById(id: $id) 
        {
		    id 
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
                includesAtSign: false
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
        console.log(this.state.value)
        this.state.value.includes(atSign)  ? this.setState({ 
                                                includesAtSign: true 
                                            })
                                            : this.setState({
                                                includesAtSign: false
                                            }) 
    }

    _queryById()
    {
        return <Query query={ReservationsById} variables={{id: 1}}>
            {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) {
                return <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
            } else
                    console.log(data)
                    return (
                        <View style={styles.cardContainer}>
                            <View style={styles.cardSection}>
                                <View style={styles.card}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '400', opacity: 0.98, color: 'black' }}>{}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '400', opacity: 0.98, color: 'black', marginTop: 10, marginBottom: 5 }}>Reserved for: </Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={{paddingBottom: 10, fontSize: 16, color: 'black', marginTop: 1, fontWeight: '200'}}>From: </Text>
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'black', marginTop: 1,}}>Reservation ID: </Text>
                                </View>
                            </View>
                        </View>
                    )
            }}
        </Query>
    }

    _queryByUser()
    {
        return <Query query={ReservationsByUserEmail} variables={{email: this.state.value}}>
            {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) {
                return <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
            } else if (!data) {
                return  <Text style={{fontSize: 14, textAlign: 'center', fontStyle: 'italic'}}>
                            No Reservations found for this email address.
                        </Text>
            } else
                return data.resByUser.reservationList.map((reservation, index) => {
                    const arrival = new Date(reservation.arrivalDate).toDateString()
                    const departure = new Date(reservation.departureDate).toDateString()
                    return (
                        <View style={styles.cardContainer} key={index}>
                            <View style={styles.cardSection}>
                                <View style={styles.card}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '400', opacity: 0.98, color: 'black' }}>{reservation.hotelName}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '400', opacity: 0.98, color: 'black', marginTop: 10, marginBottom: 5 }}>Reserved for: {reservation.firstName} {reservation.lastName}</Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={{paddingBottom: 10, fontSize: 16, color: 'black', marginTop: 1, fontWeight: '200'}}>From: {arrival} - {departure}</Text>
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'black', marginTop: 1,}}>Reservation ID: {reservation.id}</Text>
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
        // this._queryByUser()
    }

    render() {
        return (
            <View>
                <FormInput
                    value={this.state.value}
                    autoCapitalize={'none'}
                    placeholder={'Enter your email or your Reservation ID'}
                    onSubmitEditing={this._checkValue}
                    onChangeText={(event) => this._handleChange(event, 'value')}
                />
                <ScrollView style={{height: height / 1.3, margin: 5}}>
                    {this.state.includesAtSign ? this._queryByUser() : this._queryById()}
                </ScrollView>
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
    cardContainer: {
        margin: 10,
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderRadius: 5,
        width: width / 1.1,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: 
        {
            height: 1,
            width: 1
        }
    }
});

export default Reservations