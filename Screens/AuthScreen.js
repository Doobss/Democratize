import React, { useContext, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { AsyncStorage, Modal, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import { DispatchContext, StateContext } from '../Store/AppContext';
import Buttons from '../Components/Buttons';

import AsyncStorageReset from '../Components/AsyncStorageReset'

const initalScreenState = {

    userName: '',
    password: '',
    confirmPassword: '',
    passwordMatch: false,
    checkingPasswords: false,
    district: '',
    name: '',
    userState: '',
    loginSucssesful: false,
    registerSuccses: false,
}


export default AuthScreen = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    useLayoutEffect(() => {
        checkUserLogin()
        // setTimeout(() => {
        //     alert()
        // }, 1000);
    }, [])

    PersistedLogin = () => {
        props.navigation.navigate('HomeScreen')
    }

    goToLoginScreen = () => {
        props.navigation.navigate('LoginScreen')
    }


    useEffect(() => {
        if (state.loginSuccses === true) {
            setTimeout(() => {
                PersistedLogin()
            }, 300);
        }
        else if (state.loginSuccses === false) {
            setTimeout(() => {
                goToLoginScreen()
            }, 300)
        }
        else {

        }
    }, [state.loginSuccses,])


    //fetch data function needed for the home screen and attached screens
    homeScreenDataInit = async () => {
        try {
            console.log('homefetch')
            const response = await AsyncStorage.getItem('reps')
            const response2 = await AsyncStorage.getItem('posts')
            const response3 = await AsyncStorage.getItem('stateArray')
            const response4 = await AsyncStorage.getItem('bills')
            const response5 = await AsyncStorage.getItem('calendar')
            dispatch({
                type: 'FETCH-HOME',
                payload: JSON.parse(response),
                payload2: JSON.parse(response2),
                payload3: JSON.parse(response3),
                payload4: JSON.parse(response4),
                payload5: JSON.parse(response5),
            })
        }
        catch (error) {
            alert(error)

        }
    }

    //grabs users data for the login screen
    loginScreenInit = async (dataType) => {
        try {
            const response = await AsyncStorage.getItem('users')
            //console.log(response)
            const usersArray = JSON.parse(response)
            //console.log(usersArray)
            dispatch({
                type: 'FETCH-LOGIN',
                payload: usersArray,
                screenState: initalScreenState,
            })
        }
        catch (error) {
            alert(error)

        }
    }


    checkUserLogin = async () => {
        const response = await AsyncStorage.getItem('currentUser')
        const respnse2 = await AsyncStorage.getItem('persistedUsers')

        const lastLoggedin = JSON.parse(response)
        const persisted = JSON.parse(respnse2)

        if (persisted.length === 0) {
            loginScreenInit()
            dispatch({
                type: 'PERSISTED-LOGIN-FAIL',

            })
        }
        else if (lastLoggedin === null) {
            //alert('No one logged in')
            loginScreenInit()
            dispatch({
                type: 'PERSISTED-LOGIN-FAIL',

            })
        }
        else {
            const loggedInUser = persisted.reduce((acc, item) => item.userName === lastLoggedin.userName ? item : acc)
            // alert(JSON.stringify(lastLoggedin))
            if ((Date.now() - loggedInUser.timeLoggedIn) > lastLoggedin.autoLoginTime) {
                loginScreenInit()
                dispatch({
                    type: 'PERSISTED-LOGIN-FAIL',

                })
            }
            else {

                homeScreenDataInit()
                dispatch({
                    type: 'PERSISTED-LOGIN',
                    payload: lastLoggedin,
                })
            }
        }
    }

    test = () => {
        alert(JSON.stringify(state))
    }


    return (
        // <Container >
        <BlurView tint='dark' intensity={90} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} >


            <Modal
                visible={state.showModal && state.modalName === 'Auth'}
                // visible={true}
                onRequestClose={() => dispatch({
                    type: 'CLOSE-MODAL'
                })}
                animationType={'fade'}
                transparent={true}
            >
                <ImgContainer source={require('../assets/LoginBG.png')} >
                    <BlurView tint='dark' intensity={75} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} >
                        {/* <Buttons ButtonsTitle='test state' size={'minimal'} onPress={() => handleLogin()} /> */}

                        <Greeting>Hello {state.currentUser.userName ? state.currentUser.userName : null}</Greeting>
                        <AsyncStorageReset />
                    </BlurView>
                </ImgContainer>

            </Modal>

        </BlurView>
        /* </Container> */
    )
}

//color: #171A27;

const Container = styled.View`
    flex: 1;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0);
`

const ImgContainer = styled.ImageBackground`
    flex: 1;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
`
const SectionHeadLine = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #171A27;
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

const Greeting = styled.Text`
     font-size: 34px;
    font-weight: bold;
    /* color: #171A27; */
    color: white;
    opacity: .9;

`



const LargerView = styled.ImageBackground`
   
    height: 320px;
    width: 320px;
    border-radius: 1px;
    border-color:rgba(0,0,0, 0);
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0);
    overflow: hidden;
    margin: 10px;
`