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
    Alert
} from 'react-native';

import Input  from '../form/Input';
import Button  from '../form/Button';

const { width, height } = Dimensions.get('window');

import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

/* The User and Reservation queries handle th creation new reservations as well as the creation of e new user
    by email if one does not alreay exist. IF user already exists, a new reservation will
    be created and assigned to the users Id.  
*/
const User = gql`
    mutation ($email: String!) 
    {
        createUser(email: $email) 
        {
            id
            email
        }
    }
`

const Reservation = gql`
    mutation (
                $firstName: String!, 
                $lastName: String!, 
                $hotelName: String!, 
                $arrivalDate: String!, 
                $departureDate: String!
                $confirmed: Boolean!
                $userId: Int!
                
            ) 
        {
        createReservation(
            firstName: $firstName, 
            lastName: $lastName, 
            hotelName: $hotelName, 
            arrivalDate: $arrivalDate, 
            departureDate: $departureDate
            confirmed: $confirmed
            userId: $userId
            
        ) 
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
            userId: ''
        }
        this._handleChangeInput = this._handleChangeInput.bind(this);
        this._setArrival = this._setArrival.bind(this);
        this._setDeparture = this._setDeparture.bind(this);
    }

    async _handleSubmit()
    {
        await this.props.User({
            variables:
            {
                email: this.state.email,
                
            }
        }).then(res => {
            this.setState({
                userId: res.data.createUser.id
            })
        }).catch(err => {
            Alert.alert(err.message)
        })

        await this.props.Reservation({
            variables:
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                hotelName: this.props.hotelName,
                arrivalDate: this.state.arrival,
                departureDate: this.state.departure,
                confirmed: true,
                userId: this.state.userId
            }
        }).then(res => {
            Alert.alert(
                'Reservation Confirmed',
                `Your reservation for ${this.props.hotelName} is reserved under the name ${this.state.firstName} ${this.state.lastName} with and ID of ${res.data.createReservation.id}.`,
                [
                    {text: 'Continue', onPress: () => this.props._handleCloseModal()},
                ],
                { cancelable: false }
            )
        }).catch(err => {
            err
            Alert.alert(err.message)
        })
        
    }

    _handleChangeInput(event, target)
    {
        this.setState({[target]: event})
    }

    _setArrival(newDate) 
    {
        this.setState({
            arrival: newDate
        })
    }

    _setDeparture(newDate) 
    {
        this.setState({
            departure: newDate
        })
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
                                    name={'firstName'}
                                    value={this.state.firstName}
                                    placeholder={"First Name"}
                                    onChange={(event) => this._handleChangeInput(event, 'firstName')}
                                />
                                <Input 
                                    name={'lastName'}
                                    value={this.state.lastName}
                                    placeholder={"Last Name"}
                                    onChange={(event) => this._handleChangeInput(event, 'lastName')}
                                    marginTop={13}
                                />
                                <Input
                                    name={'email'}
                                    value={this.state.email}
                                    keyboardType={'email-address'}
                                    placeholder={"Email Address"}
                                    onChange={(event) => this._handleChangeInput(event, 'email')}
                                    marginTop={23}
                                />
                                <Text style={styles.label}>Date of Arrival</Text>
                                <DatePickerIOS
                                    date={this.state.arrival}
                                    mode={'date'}
                                    onDateChange={this._setArrival}
                                />
                                <Text style={styles.label}>Date of Departure</Text>
                                <DatePickerIOS 
                                    date={this.state.departure}
                                    mode={'date'}
                                    onDateChange={this._setDeparture}
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
                                <Button onPress={() => this._handleSubmit()}
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

export default compose(
    graphql(User, {name: 'User'}),
    graphql(Reservation, {name: 'Reservation'})
)(ModalView)