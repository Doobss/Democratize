import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { DispatchContext, StateContext } from '../Store/AppContext';
//import { DataDispatchContext } from '../Store/AppContext';

import styled from 'styled-components'
import Card from '../Components/Card'
//import Buttons from '../Components/Buttons'


export default LargeRepCard = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    props.item = renderArray

    const TopicsBoard = (props) => {
        return (
            <TopicsBoardContainer>
                <CardHeadLine> Topics: </CardHeadLine>
                <BodyText > {props.repTopics[0]}</BodyText>
                <BodyText > {props.repTopics[1]}</BodyText>
                <BodyText > {props.repTopics[2]}</BodyText>
            </TopicsBoardContainer>
        )
    }

    test = () => {
        alert(data)
    }

    const RepDash = (props) => {
        return (
            renderArray = followedReps.map((item) =>

                <UserDashContainerBG
                    key={item.repId + 'dash'}>
                    <RowView >
                        <ColoumsView>
                            <DashBoardCard>
                                <Card
                                    repPic={item.repPic}
                                    repName={item.rep}
                                    repId={item.repId}
                                    repState={item.repState.full}
                                // onPress={() => dispatch({
                                //     type: 'SHOW-REP-MODAL',
                                //     payload: item.repId,
                                //     payload2: 'RepModal'
                                // })}
                                />
                            </DashBoardCard>
                            <StatusBoard onPress={() => test()}>
                                <CardHeadLine> Status: </CardHeadLine>
                                <BodyText > {item.repStatus}</BodyText>
                            </StatusBoard>
                        </ColoumsView>
                        <ColoumsView>
                            <TopicsBoard repTopics={item.repTopics} />

                        </ColoumsView>
                    </RowView>
                    <TouchableOpacity onPress={() => dispatch({
                        type: 'SHOW-REP-MODAL',
                        payload: item.repId,
                        payload2: 'RepModal'
                    })}>
                        <MoreInfoButtonBorder source={require('../assets/LoginBG.png')}>
                            <MoreInfoButton>
                                <MoreInfoImage source={require('../assets/Plus.png')} />
                            </MoreInfoButton>
                        </MoreInfoButtonBorder>
                    </TouchableOpacity>
                </UserDashContainerBG>
            )
        )
    }


    return (

        <UserDashContainer
            dashHeight={dashHeight}
        >
            <RepDash />
        </UserDashContainer>

    )
}

//height: ${props => props.dashHeight}px;
const DashBoardCard = styled.View`
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    background: black;
    width: 150px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
    
`

const UserDashContainer = styled.View`
    height: auto;
    width: 340px;
    border-radius: 5px;
    overflow: hidden;
    opacity: 1;
    position: relative;
    z-index: 3;
    overflow: hidden;
`

const UserDashContainerBG = styled.View`
    height: 380px;
    width: 340px;
    border-radius: 5px;
    overflow: hidden;
    justify-content:center;
    align-content: center;
    opacity: 1;
    position: relative;
    z-index: -1;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, .75);
`

const BorderImage = styled.ImageBackground`
    height: 390px;
    width: 340px;
    border-radius: 5px;
    overflow: hidden;
    justify-content:center;
    align-content: center;
    position: relative;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
`

const TopicsBoardContainer = styled.View`
    height: 300px;
    width: 150px;
    margin-top: 10px
    margin-left: 10px;
    border-radius: 5px;
    background-color: rgba(235, 235, 235, 1);
    opacity: .75;
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, .25);
`
const StatusBoard = styled.TouchableOpacity`
    height: 90px;
    width: 150px;
    margin-left: 10px;
    margin-right: 5px;
    border-radius: 5px;
    background-color: rgba(235, 235, 235, .75);
    opacity: .75;
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.25);
`

const MoreInfoButton = styled.View`
    height: 44px;
    width: 314px;
    background-color: rgba(255, 255, 255, 1);
    opacity: 1;
    z-index: 5;
    justify-content: center;
    align-items: center;
`
const MoreInfoImage = styled.Image`
    height: 35px;
    width: 35px;
`
const MoreInfoButtonBorder = styled.ImageBackground`
    height: 50px;
    width: 320px;
    border-radius: 2px;
    overflow: hidden;
    justify-content:center;
    align-content: center;
    position: relative;
    padding: 3px;
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 1);
    opacity: .95;
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`

const ColoumsView = styled.View`
    flex: 1;
    align-content: center;
    justify-content: space-around;
`
const RowView = styled.View`
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: center;
`
const CardHeadLine = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #171A27;
    margin-top: 10px;
    margin-left: 20px;

`

const BodyText = styled.Text`
    font-size: 20px;
    color: #171A27;
    margin-top: 5px;
    margin-left: 20px;
` 