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


class ModalView extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            arrival: new Date(),
            departure: new Date(),
            firstName: '',
            lastname: '',
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
                    <View style={{height: height / 1.2, width: width / 1.1, backgroundColor: '#fff', borderRadius: 10}}>
                        <ScrollView>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Reservation for Hilton Hotel</Text>
                            </View>
                            {/* User Info */}
                            <View style={{marginTop: 3}}>
                                
                                <Input
                                    placeholder="First Name"
                                />
                                <Input 
                                    placeholder={"Last Name"}
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
                            <View style={{marginTop: 23, marginBottom: 23}}>
                                <Button onPress={() => this.props.navigation.navigate('Home')}>Confirm</Button>
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