import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { AppContext } from '../Store/AppContext'


export default FlatListItem = (props) => {




    const { id, title, onPress } = { ...props }
    return (

        <TouchableOpacity
            style={styles.TextButtonsSmall}
            onPress={(id, title) => onPress(id, title)}
        >

            <Text style={styles.TextButtons}> {title} </Text>

        </TouchableOpacity>


    )

}



styles = StyleSheet.create({
    TextButtonsSmall: {
        color: 'white',
        fontSize: 15,
        padding: 10,
        margin: 7,
        backgroundColor: '#353536',
        borderRadius: 15,
    },
    TextButtons: {
        color: 'white',
        fontSize: 20,
    },
})