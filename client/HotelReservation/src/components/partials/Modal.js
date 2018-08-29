import React, {Component} from 'react';
import 
{
    Dimensions,
    DatePickerIOS,
    View,
    ScrollView,
    Modal,
    Text,
    TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalViews extends Component {
    render() {
        return (
            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this._handleCloseModal}
                    presentationStyle={"overFullScreen"}
            >
                <View style={{backgroundColor: '#000', height: height, width: width, alignItems: 'center', justifyContent: 'space-around'}}>
                    <Logo marginTop={23} />
                    <View style={{height: height / 1.2, width: width / 1.1, backgroundColor: '#fff', borderRadius: 10}}>
                        <ScrollView>

                            {/* User Info */}
                            <View style={{marginTop: 3}}>
                                <Text style={styles.label}>Details</Text>
                                <Input
                                    placeholder="First Name"
                                    borderColor='grey'
                                    borderWidth={1}
                                />
                                <Input 
                                    placeholder={"Last Name"}
                                    borderColor='grey'
                                    borderWidth={1}
                                />
                                <Input 
                                    placeholder={"Email Address"}
                                    borderColor='grey'
                                    borderWidth={1}
                                />
                                <DatePickerIOS 
                                    
                                />
                                <DatePickerIOS 

                                />
                            </View>

                            {/* Payment Info */}
                            <View style={{marginTop: 23}}>
                                <Text style={styles.label}>Payment Information</Text>
                                <Input
                                    placeholder={'Card Number'}
                                    borderColor='grey'
                                    borderWidth={1}
                                />
                                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Input
                                        placeholder={'CVC'}
                                        borderColor='grey'
                                        borderWidth={1}
                                        width={100}
                                    />
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                    <Input
                                        placeholder={'MM'}
                                        borderColor='grey'
                                        borderWidth={1}
                                        width={50}
                                    />
                                    <View style={{height: 3, width: 10, backgroundColor: 'lightgrey', opacity: 1, margin: 3}}></View>
                                    <Input
                                        placeholder={'YY'}
                                        borderColor='grey'
                                        borderWidth={1}
                                        width={50}
                                    />
                                    </View>
                                </View>
                                <Input
                                        placeholder={'Name On Card'}
                                        borderColor='grey'
                                        borderWidth={1}
                                        
                                />
                            </View>
                            <View style={{marginTop: 23, marginBottom: 23}}>
                                <Button onPress={() => this.props.navigation.navigate('Login')}>Submit</Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
}