
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

/* 
    Renders a list of reservations associated with a certain users id. The function will take an email as an input. Once the backend returns the proper data,
    it will return the reservations list whos user id matches that of the id associated with the email that was entered.
*/
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
            }
        }
    }
`
/* Returns a single reservation if the user enters an id number. If no reservation exists for the id that is entered, a callback error will prompt the suer to
    enter a different id.
*/
const ReservationsById = gql`
    query ResById($id: ID!) 
    {
        resById(id: $id) 
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
            this._handleQuery = this._handleQuery.bind(this);
        }
    
    _handleChange(event , target) 
    {
        // Listens for every keystroke and updates the state immediately
        this.setState({[target]: event})
    }

    _handleQuery()
    {  
        const numericArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        for (i=0; i < numericArray.length; i++) 
        {
            // Checks whether the input is a reservation ID
            if (this.state.value.includes(numericArray[i])) 
            {
                return ( 
                    <Query query={ReservationsById} variables={{id: this.state.value}}>
                            {({ loading, error, data, refetch, networkStatus }) => {
                            if (loading) 
                            {
                                return <View style={styles.loaderContainer}>
                                            <ActivityIndicator size="large" color="#000" />
                                        </View>
                            } else if (error)
                            {
                                // Ignores certain error messages that are irrelevant for the user
                                if (error.message.includes('integer'))
                                {
                                    return null
                                } else 
                                    return <Text>
                                                {/* Slices the portion of the error that says GraphQLError: and simply just displays the message */}
                                                {error.message.slice(14)}
                                            </Text>
                            } else {
                                const arrival = new Date(data.resById.arrivalDate).toDateString()
                                const departure = new Date(data.resById.departureDate).toDateString()
                                return (     
                                    <View style={styles.cardContainer}>
                                        <View style={styles.cardSection}>
                                            <View style={styles.card}>
                                                <Text style={styles.cardHeader}>
                                                    {data.resById.hotelName}
                                                </Text>
                                                {/* Separates hotel name from the users data */}
                                                <View style={styles.cardLineBreak}></View>

                                                <Text style={styles.userName}>
                                                    Reserved for: {data.resById.firstName} {data.resById.lastName}
                                                </Text>

                                                <View style={styles.dateContainer}>
                                                    <Text style={styles.date}>Arrival: {arrival}</Text>
                                                    <Text style={styles.date}>Departure: {departure}</Text>
                                                </View>
                                                
                                                <Text style={styles.resId}>
                                                    Reservation ID: {data.resById.id} 
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        }
                    </Query>
                )
            // Checks if the input is a users email
            } else if (emailRegex.test(this.state.value))
            {
                return (
                    <Query query={ReservationsByUserEmail} variables={{email: this.state.value}}>
                        {({ loading, error, data, refetch, networkStatus }) => {
                            if (loading) {
                                return <View style={styles.loaderContainer}>
                                            <ActivityIndicator size="large" color="#000" />
                                        </View>
                            } else if (error) {
                                return  <Text style={{fontSize: 14, textAlign: 'center', fontStyle: 'italic'}}>
                                            {error.message.slice(14)}
                                        </Text>
                            } else          
                                return data.resByUser.reservationList.map((reservation, index) => {
                                    const arrival = new Date(reservation.arrivalDate).toDateString()
                                    const departure = new Date(reservation.departureDate).toDateString()
                                    return (
                                        <View style={styles.cardContainer} key={index}>
                                            <View style={styles.cardSection}>
                                                <View style={styles.card}>
                                                    <Text style={styles.cardHeader}>
                                                        {reservation.hotelName}
                                                    </Text>

                                                    {/* Separates hotel name from the users data */}
                                                    <View style={styles.cardLineBreak}></View>

                                                    <Text style={styles.userName}>
                                                        Reserved for: {reservation.firstName} {reservation.lastName}
                                                    </Text>

                                                    <View style={styles.dateContainer}>
                                                        <Text style={styles.date}>Arrival: {arrival}</Text>
                                                        <Text style={styles.date}>Departure: {departure}</Text>
                                                    </View>
                                                
                                                    <Text style={styles.resId}>
                                                        Reservation ID: {reservation.id} 
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }}
                    </Query>
                )
            }
        }
    }

    render() {
        return (
            <View>
                <FormInput
                    value={this.state.value}
                    keyboardType={'email-address'}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Enter your email or your Reservation ID'}
                    onChangeText={(event) => this._handleChange(event, 'value')}
                />
                <ScrollView style={styles.scrollView}>
                    {this._handleQuery()}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scrollView:
    {
        height: height / 1.3, 
        margin: 5
    },
    cardContainer: 
    {
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
    },
    cardHeader: 
    { 
        fontSize: 20, 
        textAlign: 'center', 
        fontWeight: '400',  
        color: 'black' 
    },
    cardLineBreak:
    {
        height: 1, 
        width: '98%', 
        alignSelf: 'center', 
        backgroundColor: '#000', 
        marginVertical: 10 
    },
    userName:
    { 
        fontSize: 18, 
        fontWeight: '400', 
        opacity: 0.98, 
        color: 'black', 
        marginVertical: 10
    },
    dateContainer:
    {
        marginBottom: 10
    },
    date:
    {
        fontStyle: 'italic', 
        fontSize: 16, 
        color: '#000', 
        fontWeight: '200'
    },
    resId:
    {
        fontSize: 14, 
        color: 'black', 
        marginTop: 1,
    }
});

export default Reservations