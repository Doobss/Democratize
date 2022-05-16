import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation';
import { DispatchContext, StateContext } from '../Store/AppContext';
import Buttons from './Buttons'
import uuidv4 from 'uuid/v4'
import Card from '../Components/Card'
import Posts from '../Components/Posts'
import styled from 'styled-components'


StaticList = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)
    //alert(JSON.stringify(props.data))

    const { listType, repId } = { ...props }
    const senators = state.reps.filter(item => (item.repState.abbrev === state.currentUser.userState.abbrev && item.repType === 'senator'))
    const congress = state.reps.filter(item => (item.repState.abbrev === state.currentUser.userState.abbrev && item.repType === 'congress'))
    const posts = state.posts.filter((item) => item.repId === repId)





    if (listType === 'senator') {
        const renderArray = ([...senators])
        return (
            renderArray.map((item) =>
                <SenatorContainer key={item.repId}>
                    <Card
                        repPic={item.repPic}
                        type='repCard'
                        repId={item.repId}
                        repName={item.rep}
                        repType={item.repType}
                        repState={item.repState.full}
                        onPress={() => dispatch({
                            type: 'SHOW-REP-MODAL',
                            payload: item.repId,
                            payload2: 'RepHomeModal'
                        })}
                    />
                </SenatorContainer>
            )
        )
    }
    else if (listType === 'discover') {
        //const renderArray = [...item]

        const i = props.index
        //alert([props.data].length)
        const renderArray = props.data
        const renderArray2 = props.data2
        return (
            (i < 1)
                //(props.index = 0) 
                ? (
                    renderArray.map((item) =>
                        <DiscoverContainer key={item.repId}>
                            <Card
                                repPic={item.repPic}
                                type='repCard'
                                repId={item.repId}
                                repName={item.rep}
                                repType={item.repType}
                                repState={item.repState.full}
                                onPress={() => dispatch({
                                    type: 'SHOW-REP-MODAL',
                                    payload: item.repId,
                                    payload2: 'RepDisModal'
                                })}
                            //onPress={() => props.navigation.navigate('CongressScreen', { repId: item.repId, congressArray: [...renderArray] })}
                            />
                        </DiscoverContainer>
                    )
                ) : (

                    renderArray2.map((item) =>
                        <DiscoverContainer key={item.repId}>
                            <Card
                                repPic={item.repPic}
                                type='repCard'
                                repId={item.repId}
                                repName={item.rep}
                                repType={item.repType}
                                repState={item.repState.full}
                                onPress={() => dispatch({
                                    type: 'SHOW-REP-MODAL',
                                    payload: item.repId,
                                    payload2: 'RepDisModal'
                                })}
                            //onPress={() => props.navigation.navigate('CongressScreen', { repId: item.repId, congressArray: [...renderArray] })}
                            />
                        </DiscoverContainer>

                    )
                )
        )
    }

    else if (listType === 'congress') {
        const renderArray = ([...congress])
        return (
            renderArray.map((item) =>
                <CongressContainer key={item.repId}>
                    <Card
                        repPic={item.repPic}
                        type='repCard'
                        repId={item.repId}
                        repName={item.rep}
                        repType={item.repType}
                        repState={item.repState.full}
                        onPress={() => dispatch({
                            type: 'SHOW-REP-MODAL',
                            payload: item.repId,
                            payload2: 'RepHomeModal'
                        })}
                    //onPress={() => props.navigation.navigate('CongressScreen', { repId: item.repId, congressArray: [...renderArray] })}
                    />
                </CongressContainer>
            )
        )
    }

    else if (listType === 'allSenators') {
        const renderArray = ([...state.reps.senatorData])
        return (
            renderArray.map((item) =>
                <Buttons
                    size='small'
                    ButtonsTitle={item.rep + '' + 'Senator of ' + item.state}
                    onPress={() => dispatch({
                        type: 'SHOW-REP-MODAL',
                        payload: item.repId,
                        payload2: 'RepHomeModal'
                    })}
                    //onPress = {() => props.navigation.navigate('CongressScreen', {repId: item.repId, congressArray: [...renderArray]}) }
                    key={item.repId}
                />
            )
        )
    }

    else if (listType === 'allCongress') {
        const renderArray = ([...state.reps.congressData])
        return (
            renderArray.map((item) =>
                <Buttons
                    size='small'
                    ButtonsTitle={item.rep + ' of the ' + item.dis + ' district from ' + item.state}
                    //onPress = {() => props.navigation.navigate('CongressScreen', {repId: item.repId, congressArray: [...renderArray]}) }
                    key={item.repId}
                />
            )
        )
    }

    //  props for the posts list
    //  listType = {'posts'}
    //  repId ={currentSenator.repId}
    else if (listType === 'posts') {
        const renderArray = (posts)
        return (
            renderArray.map((item) =>
                <Posts
                    props={item}
                    onPress={() => props.navigation.navigate('PostEditScreen', { body: item.body, repid: item.repId, uuid: item.uuid })}
                    key={item.uuid}
                />
            )
        )
    }
    else {
        return (
            // <Text style ={styles.text}> No list type deteced </Text>
            <Buttons
                size='small'
                ButtonsTitle={'test'}
                onPress={() => alert('does nothing')}
            />
        )
    }
}

export default withNavigation(StaticList)

const SenatorContainer = styled.View`
    height: 200px;
    width: 150px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin: 10px;
`
const CongressContainer = styled.View`
    height: 200px;
    width: 150px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin: 5px;
`
const DiscoverContainer = styled.View`
    height: 200px;
    width: 150px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin: 10px;
    /* margin-left: 10px;
    margin-right: 10px; */
`


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Buttons: {
        padding: 15,
        margin: 10,
        backgroundColor: '#353536',
        borderRadius: 15,
    },
    TextButtons: {
        color: 'white',
        fontSize: 20,
    },
    text: {
        color: 'white',
        fontSize: 17
    },
}
)
