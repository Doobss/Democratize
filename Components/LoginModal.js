import React, { useRef, useContext, useEffect } from 'react'
import { View, Text, TextInput, Modal, KeyboardAvoidingView, Keyboard } from 'react-native'
import Buttons from '../Components/Buttons';
import { DispatchContext, StateContext } from '../Store/AppContext'
import styled from 'styled-components'
import { LOGIN, FIELD } from '../Reducers/LoginReducers'
import { BlurView } from 'expo-blur'

export default LoginModal = (props) => {

    const shouldRender = (props.modalToRender === 'loginModal' ? true : false)

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    const userNameRef = useRef()
    const passwordRef = useRef()




    checkUser = () => {
        const user = state.users.filter((item) => item.userName === state.screenState.userName)
        dispatch({
            type: LOGIN,
            payload: user[0]
        })
    }



    // foucsInitalTextInput = () => {
    //     userNameRef.current.focus()
    // }

    return (
        shouldRender ? (
            <BlurView tint='default' intensity={85} style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 1)' }}>
                <Container>
                    <InputField
                        ref={userNameRef}
                        inputType='userName'
                        onSubmitEditing={() => passwordRef.current.focus()}
                        placeholder='Username'
                        placeholderTextColor='white'
                        onChangeText={(text) => dispatch({
                            type: FIELD,
                            field: 'userName',
                            value: text,
                            payload: 'hi',
                        })}
                        value={state.screenState.userName}
                    />
                    <InputField
                        ref={passwordRef}
                        inputType='password'
                        placeholder='Password'
                        placeholderTextColor='white'
                        onChangeText={(text) => dispatch({
                            type: FIELD,
                            field: 'password',
                            value: text,
                        })}
                        value={state.screenState.password}
                        secureTextEntry
                    />
                    <Buttons
                        ButtonsTitle='Login'
                        onPress={() => checkUser()}
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

        ) : (
                <View />
            )
    )
}


const Container = styled.KeyboardAvoidingView`
    background: rgba(0,0,0, 0);
    flex:1;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
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