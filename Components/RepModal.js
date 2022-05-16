import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, Modal, ScrollView, TouchableHighlight } from 'react-native'
import Buttons from '../Components/Buttons';
import { DispatchContext, StateContext } from '../Store/AppContext'
import styled from 'styled-components'
import { LOGIN, FIELD } from '../Reducers/LoginReducers'
import { BlurView } from 'expo-blur'
import CloseButton from '../Components/CloseButton'
import WatchButton from '../Components/WatchButton'
import FollowedTag from '../Components/FollowedTag';

export default RepModal = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    const [followedRep, setFollowedRep] = useState(false)


    useEffect(() => {
        newRep()
        setFollowedRep(false)
    }, [])



    useEffect(() => {
        checkFollowed()
    }, [, state.focusedRepId, state.currentUser.userReps])

    checkFollowed = () => {
        const checked = state.currentUser.userReps.reduce((acc, item) => item.repId === state.focusedRepId ? item : acc)
        checked.repId === state.focusedRepId ? setFollowedRep(true) : setFollowedRep(false)
    }


    newRep = () => {

        const grabbedRep = state.reps.reduce((acc, item) => item.repId === state.focusedRepId ? item : acc)
        return grabbedRep
    }

    test = () => {
        alert(JSON.stringify(followedRep))
    }


    const focusedRep = newRep()
    const repType = focusedRep.repType === 'senator' ? 'Senator' : 'Congress person'

    shoudlRenderTag = () => {
        return (
            followedRep ? (

                <FollowedTag followedRep={true} />
            ) : (
                    null
                )
        )
    }
    // <FollowedTag followedRep={followedRep ? true : false} />
    return (
        <BlurView tint='dark' intensity={65} style={{
            height: '100%',
            width: '100%',
        }}>
            <Container>
                <RepContainer theme={state.currentUser.theme}>
                    <ScrollView
                        style={{
                            width: '100%',
                            alignContent: 'flex-start',
                        }}
                    //onScroll={() => Keyboard.dismiss()}
                    >

                        <RepImage source={focusedRep.repPic ? focusedRep.repPic : require('../assets/AppIcon.png')}>
                            <ButtonsRowView>
                                <ColoumsView>
                                    <RepName theme={state.currentUser.theme}> {focusedRep.rep} </RepName>
                                </ColoumsView>
                                <ColoumsView>
                                    {shoudlRenderTag()}
                                </ColoumsView>
                            </ButtonsRowView>
                        </RepImage>
                        <SectionName theme={state.currentUser.theme}> Basic Information </SectionName>
                        <RepBasicInfo theme={state.currentUser.theme}>
                            <BasicInfoText theme={state.currentUser.theme}>{repType} {focusedRep.rep}.
                            State of {focusedRep.repState.full}</BasicInfoText>
                        </RepBasicInfo>
                        <SectionName theme={state.currentUser.theme}>Career</SectionName>
                        <RepBio theme={state.currentUser.theme}>
                            <BioText theme={state.currentUser.theme}> {focusedRep.repBio} </BioText>
                        </RepBio>
                        <WatchButton onPress={() => dispatch({
                            type: 'ADD-REP',
                            payload: focusedRep.repId,
                            payload2: focusedRep.repType,
                        })} />
                        <Buttons

                            color='dark'
                            ButtonsTitle='Test'
                            onPress={() => test()}
                        />

                    </ScrollView>
                </RepContainer>
                <CloseButtonView>
                    <ButtonsRowView>
                        <ColoumsView>

                        </ColoumsView>
                        <ColoumsView>
                            <CloseButton
                                onPress={() => dispatch({
                                    type: 'CLOSE-REP-MODAL',
                                })}
                            />
                        </ColoumsView>
                        <ColoumsView>

                        </ColoumsView>
                    </ButtonsRowView>
                </CloseButtonView>
            </Container>
        </BlurView>

    )
}


const Container = styled.View`
    background: rgba(0,0,0, 0);
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index:   1;
    box-shadow: 0 5px 5px rgba(0,0,0, .25);
`
const CloseButtonView = styled.View`
    
    width: 80%;
    height: 40px;
    z-index: 11;
    margin-top: 185%;

`
const ButtonsRowView = styled.View`
    width: 100%;
    height: 20%;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    background-color:rgba(1,1,1, .25); 
`
const ColoumsView = styled.View`
    flex: 1;
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

const RepContainer = styled.View`

    border-radius: 5px;
    width: 90%;
    height: 85%;
    align-items: flex-start;
    justify-content: flex-start;
    position: absolute;
    background: ${props => (props.theme === 'dark') ? 'rgba(25, 25, 25, .75)' : 'rgba(255, 255, 255, .75)'}
    z-index: 2;
    overflow: hidden;
`

const BGImage = styled.ImageBackground`
    width: 90%;
    height: 85%;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const RepBasicInfo = styled.View`

    border-radius: 2px;
    width: 100%;
    align-items: flex-start;
    background: ${props => (props.theme === 'dark') ? 'rgba(25, 25, 25, .75)' : 'rgba(255, 255, 255, .75)'};
    
`
const RepBio = styled.View`

    border-radius: 2px;
    width: 100%;
    align-items: flex-start;
    background: ${props => (props.theme === 'dark') ? 'rgba(25, 25, 25, .75)' : 'rgba(255, 255, 255, .75)'};
    
`

const RepImage = styled.ImageBackground`
    width: 100%;
    height: 400px;
    border-radius: 5px;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
`

const RepName = styled.Text`
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin: 15px;
    margin-left: 15px;
`

const BasicInfoText = styled.Text`
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    font-size: 18px;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
`

const BioText = styled.Text`
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    font-size: 16px;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
`

const SectionName = styled.Text`
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    font-size: 24px;
    font-weight: bold;
    margin: 5px;
    margin-left: 15px;
`