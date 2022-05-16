import React, { useRef, useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Modal, KeyboardAvoidingView, Keyboard } from 'react-native'
import { DispatchContext, StateContext } from '../Store/AppContext';
import styled from 'styled-components'
import { LOGIN, FIELD } from '../Reducers/LoginReducers'


export default PasswordMatch = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)
    const fieldType = props.field

    const [match, setMatch] = useState(false)
    const [checking, setChecking] = useState(false)

    useEffect(() => {


        if (state.screenState.password === state.screenState.confrimPassword && checking === true)
            //setMatch(true)
            alert('match')
        else if (state.screenState.password !== state.screenState.confrimPassword && (state.screenState.password !== '') && (state.screenState.confrimPassword !== ''))
            setChecking(true)
        else {

        }

    }, [state])

    // if (match === true) return (

    //     <PasswordInputMatch

    //         placeholder={props.placeholder}
    //         placeholderTextColor='white'
    //         onChangeText={(text) => dispatch({
    //             type: FIELD,
    //             field: fieldType,
    //             value: text,
    //         })}
    //         value={state.screenState[fieldType]}
    //         secureTextEntry
    //     />

    // )
    // else if (checking === true) return (

    //     <PasswordInputFieldNotMatched

    //         placeholder={props.placeholder}
    //         placeholderTextColor='white'
    //         onChangeText={(text) => dispatch({
    //             type: FIELD,
    //             field: fieldType,
    //             value: text,
    //         })}
    //         value={state.screenState[fieldType]}
    //         secureTextEntry
    //     />
    // )
    return (

        <PasswordInputField

            placeholder={props.placeholder}
            placeholderTextColor='white'
            onChangeText={(text) => dispatch({
                type: FIELD,
                field: fieldType,
                value: text,
            })}
            value={state.screenState[fieldType]}
            secureTextEntry
        />
    )


}




const PasswordInputField = styled.TextInput`
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

const PasswordInputMatch = styled.TextInput`
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

const PasswordInputFieldNotMatched = styled.TextInput`
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