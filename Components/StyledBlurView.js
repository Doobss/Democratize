import React, { useContext, useEffect, useState } from 'react'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'


export default StyledBlurView = (props) => {

    return (
        <BlurView tint={props.theme === 'light' ? 'default' : 'dark'} intensity={85} style={styles.blurBox} >
            {props.children}
        </BlurView>
    )
}

const styles = StyleSheet.create({
    blurBox: { width: '100%', height: '100%', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }

})