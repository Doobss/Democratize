
import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Modal, Linking, ScrollView } from 'react-native'
import Buttons from '../Components/Buttons';
import { DispatchContext } from '../Store/AppContext'
import MyModal from '../Components/MyModal'
import StaticList from '../Components/StaticList'
import { AsyncStorage } from 'react-native'
import { FIELD, LOGIN, FETCHLOGIN, } from '../Reducers/LoginReducers'
// possible intial screenState
// screenState:{
//     userName: '',
//     password: '',
//     confirmPassword: '',
//     passwordMatch: false,
//     checkingPasswords: false,
//     district: '',
//     guestForm: false,
//     name: '',
//     userState: '',
//     mounted: true,
//     loginSucssesful: false,
// }

export default RegisterForm = (props) => {


    const [state, dispatch] = useContext(DispatchContext)


    useEffect(() => {
        getRegisterState('stateArray')

    }, [])

    getRegisterState = async (dataType1) => {
        try {
            const response = await AsyncStorage.getItem(dataType1)
            dispatch({
                type: 'FETCH-REGISTER',
                payload: JSON.parse(response),
                //screenState: initialRegisterData,

            })
        }
        catch (error) {
            alert(error)

        }
    }

    // handleRegConfirmPasswordChange = (text) => {
    //     checkPasswordMatch(text, registerData.password)
    //     setRegisterData(registerData => ({...registerData , confirmPassword: text}))
    // }


    // checkPasswordMatch = (confirmPassword, password) => {
    //     setRegisterData(registerData => ({...registerData, checkingPasswords: true}))
    //     if(confirmPassword === password){
    //         setRegisterData(registerData => ({...registerData, passwordMatch: true}))
    //     }else{
    //         setRegisterData(registerData => ({...registerData, passwordMatch: false}))
    //     }
    // }

    passwordInputColor = (checking, match) => {
        if (checking === true && match === false) {
            return (styles.textInputNonMatchingPasswords)
        } else if (checking === true && match === true) {
            return (styles.textInputMatchingPasswords)
        }
        else {
            return (styles.textInput)
        }
    }

    handleAdduser = (state) => {

        if (state.screenState.passwordMatch === true) {
            // const newUser = {
            //     userName: registerData.userName,
            //     name: registerData.name,
            //     userState: state.currentUser.userState,
            //     district: registerData.district,
            //     password: registerData.password,
            //     posts: [''],
            //     oldUsers: state.users,
            // }

            alert('User added')
            //props.navigation.navigate('LoginSreen')
        }
        else {
            alert('Check information')
        }
    }

    navigateToLogin = () => {
        props.navigation.navigate('LoginScreen')
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Text style={styles.text}> Register Here  </Text>
            <TextInput style={styles.textInput}
                placeholder='New Username'
                onChangeText={(text) => dispatch({
                    type: FIELD,
                    field: 'userName',
                    value: text,
                })}
                value={state.screenState.userName}
            />
            <TextInput style={styles.textInput}
                placeholder='My Name'
                onChangeText={(text) => dispatch({
                    type: FIELD,
                    field: 'name',
                    value: text,
                })}
                value={state.screenState.name}
            />
            {/* <TextInput style = {styles.textInput}
                    placeholder = 'My  State'
                    onChangeText = {(text) => changeModalShowing(true)}
                    value = {registerData.state}
                    //editable = {false}
                    onFocus = {() => changeModalShowing(true) }
                    /> */}
            <Buttons
                style={styles.textInput}
                ButtonsTitle={'My  State'}
                onPress={() => dispatch({
                    type: 'SHOW-MODAL',
                })}
            />

            <Modal
                visible={state.showModal}
                onRequestClose={() => dispatch({
                    type: 'CLOSE-MODAL'
                })}
                animationType={'slide'}
                //presentationStyle = {'overFullScreen'}
                transparent={true}
            >

                <MyModal
                    modalType={'picker'}
                    dataToRender={state.stateArray}

                />

            </Modal>

            <TextInput style={styles.textInput}
                placeholder='My Congresstional District'
                onChangeText={(text) => dispatch({
                    type: FIELD,
                    field: 'district',
                    value: text,
                })}
                value={state.screenState.district}
            />

            <Buttons
                size={'small'}
                style={styles.textInput}
                ButtonsTitle={'Find My District'}
                onPress={() => Linking.openURL('https://www.house.gov/representatives/find-your-representative')}
            />
            <TextInput style={passwordInputColor(state.screenState.checkingPasswords, state.screenState.passwordMatch)}
                placeholder='My Password'
                onChangeText={(text) => dispatch({
                    type: FIELD,
                    field: 'password',
                    value: text,
                })}
                value={state.screenState.password}
                secureTextEntry
            />
            <TextInput style={passwordInputColor(state.screenState.checkingPasswords, state.screenState.passwordMatch)}
                placeholder='Confirm My password'
                onChangeText={(text) => dispatch({
                    type: FIELD,
                    field: 'confirmPassword',
                    value: text,
                })}
                value={state.screenState.confirmPassword}
                secureTextEntry
            />
            <Buttons
                ButtonsTitle='Register'
                onPress={() => dispatch({
                    type: 'ADDUSER',
                })}
            />
            <Buttons
                ButtonsTitle='Back to User Login'
                onPress={() => dispatch({
                    type: 'NAVIGATE',
                    navigate: navigateToLogin()
                })}
            />

        </KeyboardAvoidingView>
    )


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 17
    },
    textInput: {
        margin: 10,
        padding: 15,
        height: 50,
        width: 250,
        borderColor: 'dimgrey',
        borderWidth: 1,
        backgroundColor: '#353536',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 17,
        color: 'white',
    },
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