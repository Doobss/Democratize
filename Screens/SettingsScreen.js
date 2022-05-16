import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { StyleSheet, Animated, ScrollView, AsyncStorage } from 'react-native'
import AsyncStorageReset from '../Components/AsyncStorageReset'
import Buttons from '../Components/Buttons';
import { BlurView } from 'expo-blur'
import StyledBlurView from '../Components/StyledBlurView';
import { StateContext } from '../Store/AppContext';
import GetBillData from '../HardCodedData/GetBillData'

export default SettingsScreen = (props) => {

    const [state,] = useContext(StateContext)
    const [panState, setPanState] = useState({
        pan: new Animated.Value()
    })

    const [screenDim, setScreenDim] = useState({
        height: 0,
        width: 0,
    })

    logout = async () => {
        await AsyncStorage.setItem('currentUser', '')
        alert('logged out')
        props.navigation.navigate('LoginScreen')
    }


    return (
        <Container source={state.currentUser.theme === 'light' ? require('../assets/LightBG3.png') : require('../assets/DarkBG2.png')} >
            <ScrollView
                contentContainerStyle={{ flex: 1, alignContent: 'center', justifyContent: 'center', }}
            >

                <LargerView source={require('../assets/LoginBG.png')} >
                    <StyledBlurView theme={state.currentUser.theme}>
                        {/* <BlurView tint='default' intensity={85} style={styles.blurBox} > */}
                        {/* <ContentContainer >
                            <SectionHeadLine> Hello </SectionHeadLine>
                        </ContentContainer>
                        <ContentContainer >
                            <SectionHeadLine> Hello </SectionHeadLine>
                        </ContentContainer>
                        <ContentContainer >
                            <SectionHeadLine> Hello </SectionHeadLine>
                        </ContentContainer>
                        <ContentContainer >
                            <SectionHeadLine> Hello </SectionHeadLine>
                        </ContentContainer> */}
                        {/* </BlurView> */}
                    </StyledBlurView>
                </LargerView>
                <Buttons ButtonsTitle={'Logout'} color='dark' onPress={() => logout()} />
                <GetBillData shoudLoadData={true} />
                <AsyncStorageReset />

            </ScrollView>
        </Container>
    )
}

//color: #171A27;


const Container = styled.ImageBackground`
    flex: 1;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
`
const SectionHeadLine = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: white;
    opacity:1;
`

const TestImageOutline = styled.ImageBackground`
    height: 310px;
    width: 310px;
    border-radius: 1px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const ContentContainer = styled.View`

   height: 140px;
    width: 140px;
    border-radius: 10px;
    margin: 5px
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgba(255, 255, 255, .4);
    /* box-shadow: 7px 5px 5px rgba(0,0,0, 0.5); */
`

const LargerView = styled.ImageBackground`
   
    height: 320px;
    width: 320px;
    border-radius: 10px;
    border-color:rgba(0,0,0, 0);
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0);
    overflow: hidden;
    margin: 10px;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`

const BorderImage = styled.View`
  height: 320px;
    width: 320px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 10px;
`

const styles = StyleSheet.create({
    blurBox: { width: '100%', height: '100%', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }

})