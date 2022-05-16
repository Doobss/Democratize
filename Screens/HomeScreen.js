import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Keyboard, Modal } from 'react-native'
import Maps from '../Components/MapView';
import { DispatchContext, StateContext } from '../Store/AppContext';
import StaticList from '../Components/StaticList'
import { AsyncStorage } from 'react-native'
import Buttons from '../Components/Buttons';
import Loading from '../Components/Loading'
import styled from 'styled-components'
import UserDash from '../Components/UserDash'
import RepModal from '../Components/RepModal'
import BillModal from '../Components/BillModal'
import { BlurView } from 'expo-blur'
import TodaysEvents from '../Components/TodaysEvents';





const setCurrentUser = async (currentUser) => {
    try {
        const currentUserStr = JSON.stringify(currentUser)
        await AsyncStorage.setItem('currentUser', currentUserStr)
    }
    catch (error) {
        alert(error)
    }
}



//just used for seeing whats stored in the state
testStateData = async (state) => {

    try {
        alert(JSON.stringify(state))
    }
    catch (error) {
        alert('error')
    }
}

testPersited = async () => {

    try {
        const response = await AsyncStorage.getItem('persistedUsers')
        //data = JSON.parse(response)
        alert(response)
    }
    catch (error) {
        alert('errorpersist')
    }
}

testConsole = () => {
    console.log('logged')
}





HomeScreen = (props) => {




    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    var initalScreenWidth = Dimensions.get('window').width
    var initalScreenHeight = Dimensions.get('window').height
    const [screenWidth, setScreenWidth] = useState(initalScreenWidth)


    const BGImage = require('../assets/DarkBG2.png')

    //runs the data fetch function
    useEffect(() => {
        console.log('called')

        return () => console.log('unmounted')
    }, [])

    useEffect(() => {
        console.log('rerendered because state')
        confirmLoad()
    }, [state])


    useEffect(() => {
        console.log('rerendered because currentuser')
        persistUser(state.currentUser)
        setCurrentUser(state.currentUser)
    }, [state.currentUser])





    persistUser = async (user) => {

        try {
            const response = await AsyncStorage.getItem('persistedUsers')
            const persistedUsers = JSON.parse(response)
            dispatch({
                type: 'PERSIST',
                user: user,
                payload: persistedUsers,
            })
        }
        catch (error) {
            alert(error)
        }
    }

    confirmLoad = () => {
        if (state.stateArray && state.reps && state.posts && state.congressCal !== '') {
            dispatch({ type: 'SCREEN-LOADED' })
        }
        else {
        }
    }


    return (
        state.loading ? (
            <BackgroundImage source={BGImage} screenHeight={initalScreenHeight}>
                <LoadingScreenContainer >

                </LoadingScreenContainer>
            </BackgroundImage>
        ) : (
                <BackgroundImage source={state.currentUser.theme === 'light' ? require('../assets/LightBG3.png') : require('../assets/DarkBG2.png')} >

                    <ScrollView
                        contentContainerStyle={{ width: '100%', alignContent: 'flex-start', }}
                    //onScroll={() => Keyboard.dismiss()}
                    >
                        <TopBluContainer>
                            <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'} intensity={80} style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 1)' }} />
                        </TopBluContainer>
                        <ScreenContainer>

                            <SectionView>
                                <SectionHeadLine>Home </SectionHeadLine>
                                <Elipses>•••</Elipses>
                            </SectionView>
                            <UserProfileContainer>
                                <UserProfImage source={require('../assets/ColorBG90.png')}>
                                    <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'}
                                        intensity={80} style={{ flex: 1, }}>
                                        <CardHeadLine> Hello {state.currentUser.name} </CardHeadLine>
                                        <BodyText> From the State of {state.currentUser.userState.full}</BodyText>
                                        <BodyText> Lives in District {state.currentUser.district} </BodyText>
                                    </BlurView>
                                </UserProfImage>
                            </UserProfileContainer>
                            <SectionView>
                                <SectionHeadLine>Today's events</SectionHeadLine>
                                <Elipses>•••</Elipses>
                            </SectionView>
                            <TodaysEvents />
                            <SectionView>
                                <SectionHeadLine>Following</SectionHeadLine>
                                <Elipses>•••</Elipses>
                            </SectionView>
                            <UserDash />
                            <SectionView>
                                <SectionHeadLine>Senators</SectionHeadLine>
                                <Elipses>•••</Elipses>
                            </SectionView>
                            <SenatorWrapper>
                                <StaticList
                                    listType={'senator'}
                                />
                            </SenatorWrapper>
                            <SectionView>
                                <SectionHeadLine>Congress </SectionHeadLine>
                                <Elipses>•••</Elipses>
                            </SectionView>
                            <ScrollView
                                horizontal={true}
                                contentContainerStyle={{ alignContent: 'flex-start', marginLeft: '3%' }}>
                                <StaticList
                                    listType={'congress'}
                                />
                            </ScrollView>
                            <Buttons
                                ButtonsTitle='test current state'
                                onPress={() => testStateData(state)}
                            />
                            <Buttons
                                ButtonsTitle='test current persisted'
                                // onPress={() => testPersited()}
                                onPress={() => console.log(((state.date.getMonth() + 1) + '/' + (state.date.getDate()) + '/' + (state.date.getFullYear())))}

                            />
                            <Buttons
                                ButtonsTitle='test console'
                                onPress={() => testConsole()}
                            />
                            {/* <Buttons
                                    ButtonsTitle='loaded'
                                    onPress={dispatch({
                                        type: 'SCREEN-LOADED'
                                    })}
                                /> */}

                        </ScreenContainer>
                    </ScrollView>

                    <Modal
                        visible={state.modalName === 'RepHomeModal' ? true : false}
                        onRequestClose={() => dispatch({
                            type: 'CLOSE-MODAL'
                        })}
                        animationType={'fade'}
                        transparent={true}
                    >
                        <RepModal

                        />

                    </Modal>
                    <Modal
                        visible={state.modalName === 'BillModal' ? true : false}
                        onRequestClose={() => dispatch({
                            type: 'CLOSE-MODAL'
                        })}
                        animationType={'fade'}
                        transparent={true}
                    >
                        <BillModal

                        />

                    </Modal>
                </BackgroundImage >

            )
    )
}

const BackgroundImage = styled.ImageBackground`
    width: 100%;
    /* height: ${ props => props.screenHeight}px; */
    height: 100%;
    /* opacity: .5; */
    
`
const ScreenContainer = styled.KeyboardAvoidingView`
    background: rgba(0,0,0, 0);
    width: 100%;
    height: 100%;
    align-items: center;
    
`
const LoadingScreenContainer = styled.View`
    background: rgba(0,0,0, .75);
    width: 100%;
    height: 100%;
    align-items: center;
    
`

const UserProfileContainer = styled.View`
    height: 120px;
    width: 340px;
    margin-top: 30px;
    margin: 20px;
    border-radius: 5px;
    
    box-shadow: 0 5px 5px rgba(0,0,0, .5);
`

const UserProfImage = styled.ImageBackground`
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 5px;
`

const TopBluContainer = styled.View`
    height: 60px;
    width: 100%;
    margin-bottom: 30px;
    /* background-color: rgba(255, 255, 255, 0.1); */
`
const SectionView = styled.View`
    height: 30px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const Elipses = styled.Text`
    font-size: 20px;
    /* font-weight: bold; */
    /* color: #171A27; */
    color: white;
    margin-right: 20px;
    opacity: .9;

`

const SectionHeadLine = styled.Text`
    font-size: 30px;
    font-weight: bold;
    /* color: #171A27; */
    color: white;
    margin-left: 20px;
    opacity: .9;
`

const CardHeadLine = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    margin-left: 20px;

`
const BodyText = styled.Text`
    font-size: 20px;
    
    color: white;
    margin-top: 10px;
    margin-left: 20px;

`
const SenatorWrapper = styled.View`
    flex-direction: row;
    height: 210px;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

const CongressWrapper = styled.ScrollView`
    
    height: 210px;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    margin-top: 10px;
    margin-bottom: 10px;
`


const styles = StyleSheet.create({
    map: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontalScroll: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameLine: {

        marginTop: 30,
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',

    },
    content: {
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 17
    },
    header: {
        fontSize: 32,
        color: 'white',
    },
    list: {
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
    }

})

{/* <MapView>
                            <Maps />
                        </MapView> */}

export default HomeScreen