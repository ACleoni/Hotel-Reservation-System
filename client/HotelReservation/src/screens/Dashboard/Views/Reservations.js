
import React, {Component} from 'react';
import {View, Text, Input, StyleSheet, TouchableOpacity} from 'react-native';
import {BackgroundWrapper} from '../../../components/partials';

class Reservations extends Component {
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        // this.animation.play();
    }

    render() {
        return (
            // <BackgroundWrapper style={styles.container}>
            <View>

            </View>
                // <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                //     <Text style={{position: 'absolute', top: 404, fontSize: 18, fontWeight: 'bold', color: '#ad5f43'}}>Get Started</Text>
                // </TouchableOpacity>
            // </BackgroundWrapper>
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

export default Reservations