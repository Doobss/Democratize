import React, { useContext, useEffect, } from 'react'
import { Animated, View, Text, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage, Modal } from 'react-native'
import Buttons from '../Components/Buttons';
import LoginModal from '../Components/LoginModal';
import RegisterModal from '../Components/RegisterModal'
import { DispatchContext, StateContext } from '../Store/AppContext'
import { FIELD, LOGIN, FETCHLOGIN, } from '../Reducers/LoginReducers'
import { BlurView } from 'expo-blur'
import styled from 'styled-components'



// test = async () => {

//     const response = await AsyncStorage.getItem('persistedUsers')
//     const persistedUsers = JSON.parse(response)
//     alert(persistedUsers.length)
// }

// testPer = async () => {

//     try {
//         const response = await AsyncStorage.getItem('persistedUsers')
//         //const response = await AsyncStorage.getAllKeys()
//         //data = JSON.parse(response)
//         alert(response)
//     }
//     catch (error) {
//         alert(error)
//     }
// }

// testKeys = async () => {

//     try {
//         const response = await AsyncStorage.getAllKeys()
//         //const response = await AsyncStorage.getAllKeys()
//         //data = JSON.parse(response)
//         alert(response)
//     }
//     catch (error) {
//         alert(error)
//     }
// }

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




export default LoginScreen = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    // useEffect(() => {
    //     getLoginState('users')
    // }, [, state.screenState.registerSuccses, state.currentUser])


    useEffect(() => {
        // alert('loginscreen')
        homeScreenDataInit()
    }, [state.users])

    useEffect(() => {
        // alert('loginSuccsescalled')
        if (state.screenState.loginSuccses === true) {

            handleLogin()
            dispatch({
                type: 'RESET-LOGIN'
            })

        }
    }, [state.screenState.loginSuccses])

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




    //initai retrive data function and set screen state
    getLoginState = async (dataType) => {
        try {
            const response = await AsyncStorage.getItem('users')
            dispatch({
                type: FETCHLOGIN,
                payload: JSON.parse(response),
                screenState: initalScreenState,
            })
        }
        catch (error) {
            alert(error)

        }
    }

    testStateData = (data) => {

        const testState = JSON.stringify(data)
        alert(testState)

    }

    handleLogin = () => {
        props.navigation.navigate('HomeScreen')
    }

    navigateToRegister = () => {
        props.navigation.navigate('RegisterScreen')
    }





    return (


        state.showModal ? (
            <BackgroundImage source={require('../assets/LoginBG.png')} >

                <ContentContainer>


                    <Modal
                        visible={state.showModal}
                        onRequestClose={() => dispatch({
                            type: 'CLOSE-MODAL'
                        })}
                        animationType={'fade'}
                        transparent={true}
                    >

                        <LoginModal
                            modalToRender={state.modalName} />
                        <RegisterModal
                            modalToRender={state.modalName} />

                    </Modal>

                </ContentContainer>

            </BackgroundImage>

        ) : (<BackgroundImage source={require('../assets/LoginBG.png')} >

            <ContentContainer>

                <ButtonContainer >

                    <TitleBar>
                        <Greeting> Welcome </Greeting>
                    </TitleBar>
                    <Buttons
                        ButtonsTitle='login'
                        onPress={() => dispatch({
                            type: 'SHOW-MODAL',
                            payload: 'loginModal'
                        })} />
                    <Buttons
                        ButtonsTitle='Register New User'
                        onPress={() => dispatch({
                            type: 'SHOW-MODAL',
                            payload: 'registerModal'
                        })}
                    />

                    {/* <Buttons
                        ButtonsTitle='Test current'
                        onPress={() => test()}
                    />
                    <Buttons
                        ButtonsTitle='Test Persisted'
                        onPress={() => testPer()}
                    />
                    <Buttons
                        ButtonsTitle='Test all keys'
                        onPress={() => testKeys()}
                    /> */}


                </ButtonContainer>

                <Modal
                    visible={state.showModal}
                    onRequestClose={() => dispatch({
                        type: 'CLOSE-LOGIN-MODAL'
                    })}
                    animationType={'fade'}
                    transparent={true}
                >
                    <LoginModal />

                </Modal>

            </ContentContainer>

        </BackgroundImage>
            )

    )

}



const Greeting = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    text-align: center;
    
`
const TitleBar = styled.View`
    width: 100%;
    margin-top: 15px;
    margin-bottom: 10px;
    
   
`
const ButtonContainer = styled.View`
    height: 280px;
    width: 330px;
    border-radius: 0px;
    /* border: 1px #FFFFFF; */
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    margin: 20px;
    margin-bottom: 30px;
    align-items: center;
    justify-content: center;
`

const ContentContainer = styled.View`
    background: rgba(0,0,0, 0);
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    
`
const BackgroundImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    
`
const InputField = styled.TextInput`
    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 1px #FFFFFF;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    margin: 10px;
    font-size: 14px;
    color: white;
    text-align: left;
`




const styles = StyleSheet.create({

    textInputNonMatchingPasswords: {
        margin: 10,
        padding: 15,
        height: 50,
        width: 250,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: '#353536',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 17,
        color: 'white',
    }, textInputMatchingPasswords: {
        margin: 10,
        padding: 15,
        height: 50,
        width: 250,
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: '#353536',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 17,
        color: 'white',
    },

})






 // handlePress = () => {
    //     const { usersPassword, password, zipcode } = this.state
    //     if (password === usersPassword && zipcode !== '')
    //         return (
    //          this.props.navigation.navigate('HomeScreen', {firstName: this.state.firstName, zipcode: this.state.zipcode})
    //         )
    //     else 
    //         return( alert('Wrong Password or no zipcode')

    //         )
    // }


    //Inital Form for registering or logining in

        // if(state.currentUser === '' && loginData.guestForm === false) return(
        //     <KeyboardAvoidingView style = {styles.container} behavior = 'padding'>
        //                  <Text style = {styles.text}> Find User Here </Text>
        //                         <TextInput style = {styles.textInput}
        //                             placeholder = 'Username'
        //                             onChangeText = {(text) => dispatch({
        //                                 type: FIELD,
        //                                 field: 'userName',
        //                                 value: text,
        //                             })}
        //                             value = {loginData.userName}
        //                             />
        //                                <Buttons 
        //                             ButtonsTitle='Find User'
        //                             onPress = {() =>changeCurrentUser(loginData.userName, state.users)}
        //                             />
        //                             <Buttons 
        //                             ButtonsTitle='Register New User'
        //                             onPress = {() => props.navigation.navigate('RegisterScreen')}
        //                             />
        //                             <Buttons 
        //                             ButtonsTitle='Enter as guest'
        //                             onPress = {() =>setLoginData(loginData => ({...loginData, guestForm: true, registerForm: true}))}
        //                             />
        //     </KeyboardAvoidingView>
        // )

         // const [loginData, setLoginData] = useState({    

    //         userName: state.userName,
    //         password: '',
    //         confirmPassword: '',
    //         passwordMatch: false,
    //         checkingPasswords: false,
    //         district: '',
    //         registerForm: false,
    //         guestForm: false,
    //         name: '',
    //         state: '',
    //     })

        // handleUserNameChange = (text) => {
    //     setLoginData(loginData => ({...loginData , userName: text}))
    // }
    // handlePasswordChange = (text) => {
    //     setLoginData(loginData => ({...loginData , password: text}))
    // }
    // handleConfirmPasswordChange = (text) => {
    //     checkPasswordMatch(text, loginData.password)
    //     setLoginData(loginData => ({...loginData , confirmPassword: text}))
    // }
    // handleDistrictChange = (text) => {
    //     setLoginData(loginData => ({...loginData , district: text}))
    // }
    // handleNameChange = (text) => {
    //     setLoginData(loginData => ({...loginData , name: text}))
    // }
    // handleStateChange = (text) => {
    //     setLoginData(loginData => ({...loginData , state: text}))
    // }