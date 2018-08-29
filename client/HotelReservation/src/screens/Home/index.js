
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { BackgroundWrapper } from '../../components/partials';
import { Button } from '../../components/';

// import lottiebtn from '../../assets/lottiebtn.json';

class Home extends Component {
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        // this.animation.play();
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <BackgroundWrapper style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={() => navigate('Dashboard')}>Get Started</Button>
                </View>
            </BackgroundWrapper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 100
    }
});

export default Home
