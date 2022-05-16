import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import Location from 'expo'
import Permissions from 'expo-permissions'


export default class Maps extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            status: {},
            location: null,
            zipcode: '',
            userState: '',
        }
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            this.getLocation();
        }



        getLocation = async () => {
            const location = await Location.getCurrentPositionAysc({})
            this.setState({ location })
        }
    }


    componentDidMount() {
        //this.getLocationAsync();
    }


    render() {

        //if(!this.state.location){
        // return (<View/>)

        return (
            <MapView

                style={styles.maps}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,

                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    maps: {
        flex: 1,
        width: 370,
        backgroundColor: 'white',
        height: 50

    }


})
//provider = {Expo.MapView.PROVIDER_GOOGLE}