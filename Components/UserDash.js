import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { DispatchContext, StateContext } from '../Store/AppContext';
//import { DataDispatchContext } from '../Store/AppContext';

import styled from 'styled-components'
import Card from '../Components/Card'
import { BlurView } from 'expo-blur'
//import Buttons from '../Components/Buttons'


export default UserDash = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)



    const followedReps = []


    const getRepData = (rep) => {
        const repData = state.reps.reduce((acc, item) => (item.repId === rep.repId ? item : acc))
        followedReps.push(repData)
    }

    let numberOfReps = state.currentUser.userReps.length
    let dashHeight = (numberOfReps * 350)

    const getFollowedData = state.currentUser.userReps.forEach(item => getRepData(item))



    const userCongress = state.currentUser.userReps.filter(item => item.repType === 'congress')
    const userSenate = state.currentUser.userReps.filter(item => item.repType === 'senator')


    const TopicsBoard = (props) => {
        return (
            // props.repTopics ? (
            //     <TopicsBoardContainer>
            //         <CardHeadLine> Topics: </CardHeadLine>
            //         <BodyText > {props.repTopics[0]}</BodyText>
            //         <BodyText > {props.repTopics[1]}</BodyText>
            //         <BodyText > {props.repTopics[2]}</BodyText>
            //     </TopicsBoardContainer>
            // ) : (
            <TopicsBoardContainer>
                <CardHeadLine> No Topics: </CardHeadLine>
            </TopicsBoardContainer>
            // )
        )
    }

    test = () => {
        alert('hey')
    }

    const RepDash = (props) => {
        const [expanded, setExpanded] = useState('')
        return (
            // !expanded ? (
            renderArray = followedReps.map((item) =>

                expanded !== item.repId ? (
                    <UserDashContainerBG
                        key={item.repId + 'dash'}>
                        <BlurView tint='dark' intensity={95} style={{ flex: 1, }}>
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
                                        {/* <BodyText > {item.repStatus}</BodyText> */}
                                        <BodyText > In session</BodyText>
                                    </StatusBoard>
                                </ColoumsView>
                                <ColoumsView>
                                    <TopicsBoard repTopics={item.repTopics} />

                                </ColoumsView>
                            </RowView>
                            <TouchableOpacity
                                // onPress={() => dispatch({
                                //     type: 'SHOW-REP-MODAL',
                                //     payload: item.repId,
                                //     payload2: 'RepHomeModal'
                                // })
                                onPress={() => setExpanded(item.repId)}
                            >
                                {/* <MoreInfoButtonBorder source={require('../assets/LoginBG.png')}> */}
                                <MoreInfoButton>
                                    <MoreInfoImage source={require('../assets/Plus.png')} />
                                </MoreInfoButton>
                                {/* </MoreInfoButtonBorder> */}
                            </TouchableOpacity>
                        </BlurView>
                    </UserDashContainerBG>
                    /* </BorderImage> */


                ) : (
                        <UserDashContainerBG
                            key={item.repId + 'dash'}>
                            <BlurView tint='dark' intensity={95} style={{ flex: 1, }}>
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
                                <BioContainer>
                                    <CardHeadLine> Biography: </CardHeadLine>
                                    <BodyText > {item.repBio}</BodyText>
                                </BioContainer>
                                <TouchableOpacity
                                    // onPress={() => dispatch({
                                    //     type: 'SHOW-REP-MODAL',
                                    //     payload: item.repId,
                                    //     payload2: 'RepHomeModal'
                                    // })
                                    onPress={() => setExpanded('')}
                                >
                                    {/* <MoreInfoButtonBorder source={require('../assets/LoginBG.png')}> */}
                                    <MoreInfoButton>
                                        <MoreInfoImage source={require('../assets/Plus.png')} />
                                    </MoreInfoButton>
                                    {/* </MoreInfoButtonBorder> */}
                                </TouchableOpacity>
                            </BlurView>
                        </UserDashContainerBG>
                    )
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

const BioContainer = styled.View`
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: rgba(25, 25, 25, .25);
    width: 320px;
    height: auto;
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
    height: auto;
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
    background-color: rgba(255, 255, 255, 0);
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
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .25);
    /* opacity: .75; */
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
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .25);
    /* opacity: .75; */
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`

const MoreInfoButton = styled.View`
    height: 44px;
    width: 314px;
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .25);
    border-radius: 5px;
    z-index: 5;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 5px rgba(0,0,0, 0.5);
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
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
    /* color: #171A27; */
    color: white;
    margin-top: 10px;
    margin-left: 20px;

`

const BodyText = styled.Text`
    font-size: 20px;
    /* color: #171A27; */
    color: white;
    margin-top: 5px;
    margin-left: 20px;
` 