
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
    StyleSheet, 
    TouchableOpacity
} from 'react-native';

import { ModalView }  from '../../../components/partials';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo'

const { width, height } = Dimensions.get('window');


/* This query is resposible for retrieving hotels within 10 - 12 miles of the users
    location using the geolocation api that is built into react native for iOS and 
    comparing the coordinates of the user to the coordinates of each hotel.
    By doing so each hotel is filtered and only the hotels that match the distance requirements are
    rendered in the scrollview. 
*/
const getHotelListQuery = gql`
    query HotelByCoord($latitude: String!, $longitude: String!) {
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

class Feed extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: false,
            selectedHotel: '',
            latitude: "33.7924134", 
            longitude: "-84.2866816",
            error: null
        }
        this._handleCloseModal = this._handleCloseModal.bind(this);
        this._handleModalVisible=this._handleModalVisible.bind(this);
    }


    static navigationOptions = {
        header: null
    }

    _handleCloseModal()
    {
        this.setState({
            modalVisible: false
        })
    }

    _handleModalVisible(hotelName) 
    {
        this.setState({
            modalVisible: true,
            selectedHotel: hotelName
        })
    };

    _renderHotelList()
    {
        return <Query query={getHotelListQuery} variables={{latitude: this.state.latitude , longitude: this.state.longitude}}>
            {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) 
            {
                return <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
            } else
                return data.hotelByCoord.hotelList.map((hotel, index) => {
                    return (
                        <View style={styles.cardContainer} key={index}>
                            <View style={styles.cardSection}>
                                <View style={styles.card}>
                                    <Text style={styles.cardHeader}>{hotel.name}</Text>
                                    <View style={styles.locationContainer}>
                                        <Text style={styles.location}>{hotel.city}, {hotel.state}</Text>
                                    </View>
                                    <Text style={styles.rooms}>{hotel.availRooms} rooms left</Text>
                                    
                                </View>

                                <View style={styles.btmHalfContainer}>
                                    <View>
                                        <Text style={styles.price}>{hotel.startingPrice}</Text>
                                        <Text style={styles.priceText}>Avg price per night</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this._handleModalVisible(hotel.name)}>
                                        <View style={styles.btnContainer}>
                                            <Text style={styles.btnText}>
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
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        },
        (error) => this.setState({
            error: error.message
        }), { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000 
            },
        )
    }
    

    render() {
        return (
            <View style={styles.container}>
                <ModalView visible={this.state.modalVisible} 
                            hotelName={this.state.selectedHotel}
                            _handleCloseModal={this._handleCloseModal} />
                <ScrollView>
                    {this._renderHotelList()}
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
    loaderContainer: {
        height: height / 1.1,
        width: width / 1.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
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
    },
    cardSection: 
    {
        height: 105, 
        width: width / 1.1, 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: "space-between"
    },
    card: 
    { 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        height: 60, 
        width: width * .5,  
        paddingTop: 10
    },
    cardHeader:
    { 
        fontSize: 20, 
        fontWeight: '400', 
        opacity: 0.98, 
        color: 'black' 
    },
    locationContainer:
    {
        flexDirection: 'row'
    },
    location:
    {
        paddingBottom: 10, 
        fontSize: 16, 
        color: 'black', 
        marginTop: 1, 
        fontWeight: '200'
    },
    rooms:
    { 
        fontSize: 14, 
        color: 'black', 
        marginTop: 1
    },
    btmHalfContainer:
    {
        height: '100%', 
        justifyContent: 'space-around'
    },
    price:
    { 
        fontSize: 22, 
        color: 'black', 
        marginTop: 1, 
        paddingTop: 2
    },
    priceText:
    { 
        fontSize: 14, 
        color: 'black', 
        marginTop: 1
    },
    btnContainer:
    {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#3ab71d', 
        flex: 0, 
        borderRadius: 0, 
        width: 120, 
        height: 30, 
        borderRadius: 5
    },
    btnText:
    {
        fontSize: 14, 
        color: '#fff'
    }
});

export default Feed;