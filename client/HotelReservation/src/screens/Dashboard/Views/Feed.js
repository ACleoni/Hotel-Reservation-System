
import React, 
{
    Component
} from 'react';

import 
{
    View, 
    ScrollView, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';


class Feed extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        // this.animation.play();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView> 
                    <View style={styles.cardSection}>
                        <View style={{height: 100, width: '100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 5}}>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', height: 60, width: 210, paddingTop: 10}}>
                                <Text style={{ fontSize: 22, paddingLeft: 1, color: 'black' }}>Hilton Hotel</Text>
                                <View style={{ flexDirection: 'row', paddingLeft: 1}}>
                                    <Text style={{paddingBottom: 10, fontSize: 16, color: 'black', opacity: 0.98, marginTop: 1, paddingLeft: 1 }}>Atlanta, GA</Text>
                                </View>
                                <Text style={{ fontSize: 14, color: 'black', marginTop: 1, paddingLeft: 1 }}>8 rooms available</Text>
                                
                            </View>

                            <View style={{height: '100%', justifyContent: 'space-around'}}>
                                <View>
                                    <Text style={{ fontSize: 22, color: 'black', marginTop: 1, paddingTop: 2}}>$100</Text>
                                    <Text style={{ fontSize: 14, color: 'black', marginTop: 1}}>Avg price per night</Text>
                                </View>
                                <TouchableOpacity>
                                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#3ab71d', flex: 0, borderRadius: 0, width: 120, height: 30, borderRadius: 5}}>
                                        <Text style={{fontSize: 14, color: '#fff'}}>
                                            Reserve Now
                                        </Text>
                                    </View>  
                                </TouchableOpacity> 
                            </View>  
                        </View>
                    </View>
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
    cardSection: {
        flex: 1,
        alignItems: 'center',     
        borderRadius: 5,
        borderBottomWidth: 1, 
        marginLeft: 15, 
        marginRight: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    }
});

export default Feed