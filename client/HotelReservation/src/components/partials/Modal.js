import React, 
{
    Component
} from 'react';

import 
{
    Dimensions,
    StyleSheet,
    DatePickerIOS,
    View,
    ScrollView,
    Modal,
    Text,
} from 'react-native';

import Input  from '../form/Input';
import Button  from '../form/Button';

const { width, height } = Dimensions.get('window');

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo'

/* This query is resposible for retrieving hotels within 10 - 12 miles of the users
    location using the geolocation api that is built into react native for iOS and 
    comparing the coordinates of the user to the coordinates of each hotel.
    By doing so each hotel is filtered and only the hotels that match the distance requirements are
    rendered in the scrollview. 
*/
const createReservation = gql`
    mutation ($latitude: String!, $longitude: String!) {
        hotelByCoord(latitude: $latitude, longitude: $longitude) {
            hotelList {
                id
                name
                city
                state
                availRooms
                startingPrice
            }
        }
    }
`

class ModalView extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            arrival: new Date(),
            departure: new Date(),
            firstName: '',
            lastName: '',
            email: '',
        }
    }
    render() 
    {
        return (
            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this._handleCloseModal}
                    presentationStyle={"overFullScreen"}
            >
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.2)', height: height, width: width, alignItems: 'center', justifyContent: 'space-around'}}>
                    <View style={{height: height / 1.2, width: width / 1.05, backgroundColor: '#fff', borderRadius: 10}}>
                        <ScrollView>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Reservation for {this.props.hotelName}</Text>
                            </View>
                            {/* User Info */}
                            <View style={{marginTop: 3}}>
                                
                                <Input
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    name={'firstName'}
                                    onChange={(event) => this._handleChangeInput(event, 'firstName')}
                                />
                                <Input 
                                    placeholder={"Last Name"}
                                    value={this.state.lastName}
                                    name={'password'}
                                    onChange={(event) => this._handleChangeInput(event, 'password')}
                                    marginTop={13}
                                />
                                <Input 
                                    placeholder={"Email Address"}
                                    marginTop={23}
                                />
                                <Text style={styles.label}>Date of Arrival</Text>
                                <DatePickerIOS 
                                    date={this.state.arrival}
                                    mode={'date'}
                                />
                                <Text style={styles.label}>Date of Arrival</Text>
                                <DatePickerIOS 
                                    date={this.state.departure}
                                    mode={'date'}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{marginTop: 23, marginBottom: 23}}>
                                <Button onPress={() => this.props._handleCloseModal()} 
                                        backgroundColor={'red'}
                                        width={125}
                                        paddingLeft={5}
                                        paddingRight={5}
                                    
                                >Cancel 
                                </Button>
                            </View>
                            <View style={{marginTop: 23, marginBottom: 23}}>
                                <Button onPress={() => this.props.navigation.navigate('Home')}
                                        width={125}
                                        paddingLeft={5}
                                        paddingRight={5}
                                >Confirm
                                </Button>
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    header: 
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    headerText: 
    {
        fontSize: 20,
        fontWeight: '600'
    },
    label: {
        paddingLeft: 35,
        fontSize: 14,
        marginTop: 33,
        color: 'black'
    }

})

export default ModalView