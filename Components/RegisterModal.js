import React, { useRef, useContext, useEffect } from 'react'
import { View, Text, TextInput, Modal, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native'
import Buttons from '../Components/Buttons';
import { DispatchContext, StateContext } from '../Store/AppContext'
import styled from 'styled-components'
import { LOGIN, FIELD } from '../Reducers/LoginReducers'
import { BlurView } from 'expo-blur'
import PasswordMatch from '../Components/PasswordMatch'


export default RegisterModal = (props) => {

    const shouldRender = (props.modalToRender === 'registerModal' ? true : false)

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)



    const userNameRegisterRef = useRef()
    const nameRef = useRef()
    const stateRef = useRef()
    const districtRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    foucsInitalTextInput = () => {
        userNameRegisterRef.current.focus()
    }

    return (
        shouldRender ? (
            <ScrollView
                contentContainerStyle={{ width: '100%', height: '150%', alignContent: 'flex-start', }}
                onScroll={() => Keyboard.dismiss()}
            >
                <BlurView tint='dark' intensity={85} style={{ flex: 1, }}>
                    <Container>
                        <InputField
                            ref={userNameRegisterRef}
                            onSubmitEditing={() => nameRef.current.focus()}
                            placeholder='New Username'
                            placeholderTextColor='white'
                            onChangeText={(text) => dispatch({
                                type: FIELD,
                                field: 'userName',
                                value: text,
                            })}
                            value={state.screenState.userName}
                        />
                        <InputField
                            ref={nameRef}
                            onSubmitEditing={() => stateRef.current.focus()}
                            placeholder='My Name'
                            placeholderTextColor='white'
                            onChangeText={(text) => dispatch({
                                type: FIELD,
                                field: 'name',
                                value: text,
                            })}
                            value={state.screenState.name}
                        />
                        <InputField
                            ref={stateRef}
                            onSubmitEditing={() => districtRef.current.focus()}
                            placeholder='My State'
                            placeholderTextColor='white'
                            onChangeText={(text) => dispatch({
                                type: FIELD,
                                field: 'userState',
                                value: text,
                            })}
                            value={state.screenState.userState}
                        />
                        <InputField
                            ref={districtRef}
                            //onSubmitEditing={() => passwordRef.current.focus()}
                            placeholder='My Congresstional District'
                            placeholderTextColor='white'
                            onChangeText={(text) => dispatch({
                                type: FIELD,
                                field: 'district',
                                value: text,
                            })}
                            value={state.screenState.district}
                        />
                        <Buttons
                            size={'minimal'}
                            style={styles.textInput}
                            ButtonsTitle={'Find My District'}
                            onPress={() => Linking.openURL('https://www.house.gov/representatives/find-your-representative')}
                        />
                        <PasswordMatch
                            //ref={passwordRef}
                            placeholder='My passwrod'
                            //onSubmitEditing={() => confirmPasswordRef.current.focus()}
                            field='password'
                        />
                        <PasswordMatch
                            placeholder='Confirm password'
                            //ref={confirmPasswordRef}
                            field='confirmPassword'
                        />
                        <Buttons
                            ButtonsTitle='Register'
                            onPress={() => dispatch({
                                type: 'ADDUSER',
                            })}
                        />
                        <Buttons
                            size='minimal'
                            ButtonsTitle='Cancel'
                            onPress={() => dispatch({
                                type: 'CLOSE-LOGIN-MODAL',

                            })}
                        />


                    </Container>
                </BlurView>
            </ScrollView>
        ) : (
                <View />
            )
    )
}


const Container = styled.KeyboardAvoidingView`
    margin-top: 100px;
    background: rgba(0,0,0, 0);
    width: 100%;
    height: 100%;
    align-items: center;
    
`



const InputField = styled.TextInput`
    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 1px #FFFFFF;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    margin: 10px;
    padding-left: 20px
    font-size: 18px;
    color: white;
    text-align: left;
`

const passwordInputField = styled.TextInput`
    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 1px #FFFFFF;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    margin: 10px;
    padding-left: 20px
    font-size: 18px;
    color: white;
    text-align: left;
`
const passwordInputMatch = styled.TextInput`
    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 2px green;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    margin: 10px;
    padding-left: 20px
    font-size: 18px;
    color: white;
    text-align: left;
`
const passwordInputFieldNotMatched = styled.TextInput`
    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 2px red;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    margin: 10px;
    padding-left: 20px
    font-size: 18px;
    color: white;
    text-align: left;
`