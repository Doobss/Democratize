
import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import Buttons from '../Components/Buttons';
import { DispatchContext, StateContext } from '../Store/AppContext';



export default ActivityLoader = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    return (
        <View style={styles.content}>
            <ActivityIndicator size='large' />
            <Buttons
                ButtonsTitle='test state'
                onPress={() => testStateData(state)}
            />
            {/* <Buttons
                ButtonsTitle='flip loading'
                onPress={dispatch({
                    type: 'SCREEN-LOADED'
                })}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 3 / 2,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexGrow: 10,
        backgroundColor: 'green',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    nameLine: {

        marginTop: 30,
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',

    },
    content: {
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 17
    },
    list: {
        flex: 1 / 4,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
    }

})