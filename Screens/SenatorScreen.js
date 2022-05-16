import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Buttons from '../Components/Buttons'
import { DispatchContext } from '../Store/AppContext';
import StaticList from '../Components/StaticList'
import uuidv4 from 'uuid/v4'
import { FIELD, SENSCREEN } from '../Reducers/LoginReducers';
import { AsyncStorage } from 'react-native'
import styled from 'styled-components'
import { BlurView } from 'expo-blur'



const initalRepScreenState = {

    postInput: '',
    senatorState: '',
    newPost: false,
}

export default SenatorScreen = (props) => {

    const passedRepId = props.navigation.getParam('repId', 'no id')


    const [state, dispatch] = useContext(DispatchContext)


    useEffect(() => {
        setSenatorScreenState(initalRepScreenState)

        if (state.screenState.newPost === true) {
            newPostData('posts')
        }

    }, [, state.screenState.newPost])


    newPostData = async (dataType1) => {
        try {
            const response = await AsyncStorage.getItem(dataType1)

            dispatch({
                type: 'FETCH-NEW-POSTS',
                payload: JSON.parse(response),
            })
        }
        catch (error) {
            alert(error)

        }
    }
    setSenatorScreenState = (initalRepScreenState) => {
        dispatch({
            type: SENSCREEN,
            screenState: initalRepScreenState,
        })
    }




    const user = state.currentUser
    const userPosts = [...state.posts]
    const repArray = [...state.reps]
    const currentRep = repArray.reduce((acc, item) => item.repId === passedRepId ? item : acc)


    test = () => {
        //alert(userPosts[0].data)
        // user.posts.map(item => alert(item.data))
    }


    return (

        <BackgroundImage source={require('../assets/LightThemeBG.png')} >
            <BlurView tint='light' intensity={40} style={{ flex: 1, }}>
                <ScreenContainer>

                    <Text style={styles.text}> {user.name} </Text>
                    <Text style={styles.text}> {currentRep.rep} </Text>
                    <Text style={styles.text}> {currentRep.bio} </Text>
                    <TextInput style={styles.textInput}
                        placeholder='Tell them how you feel'
                        onChangeText={(text) => dispatch({
                            type: FIELD,
                            field: 'postInput',
                            value: text,
                        })}
                        value={state.screenState.postInput}
                    />
                    <Buttons
                        color='dark'
                        ButtonsTitle={'Follow Rep'}
                        onPress={() => dispatch({
                            type: 'ADD-REP',
                            payload: currentRep.repId,
                            payload2: currentRep.repType,
                        })}
                    />

                    <StaticList
                        listType={'posts'}
                        repId={currentRep.repId}
                    />

                    <Buttons
                        color='dark'
                        ButtonsTitle={'Post'}
                        onPress={() => dispatch({
                            type: 'ADDPOST',
                            payload: state.screenState.postInput,
                            idPayload: passedRepId,

                        })}
                    />

                    <Buttons
                        color='dark'
                        ButtonsTitle={'Back Home'}
                        onPress={() => props.navigation.goBack()}
                    />

                    {/* <Buttons
                    ButtonsTitle = {'Test'}
                    onPress = {() => test()}
                    /> */}
                </ScreenContainer>
            </BlurView>
        </BackgroundImage>
    )
}

const BackgroundImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

const ScreenContainer = styled.KeyboardAvoidingView`
    margin-top: 60px;
    background: rgba(0,0,0, 0);
    width: 100%;
    height: 100%;
    align-items: center;
    
`


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

})



