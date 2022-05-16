import React, { useContext, useState, useEffect } from 'react'
import { TouchableOpacity, Dimensions, StyleSheet, Modal, ScrollView, SectionList } from 'react-native'
import { withNavigation } from 'react-navigation'
import Buttons from '../Components/Buttons'
import { DispatchContext, StateContext } from '../Store/AppContext';
import StaticList from '../Components/StaticList'
import FlatListItem from '../Components/FlatListItem'
import styled from 'styled-components'
import Card from '../Components/Card'
import RepModal from '../Components/RepModal'
import LargeRepCard from '../Components/LargeRepCard'
import { ScreenOrientation } from 'expo'
import { BlurView } from 'expo-blur'
import GetBillData from '../HardCodedData/GetBillData'


export default DiscoverScreen = (props) => {




    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    var initalScreenWidth = Dimensions.get('window').width
    const [screenWidth, setScreenWidth] = useState(initalScreenWidth)
    const [repSort, setRepSort] = useState(false)
    const [billSort, setBillSort] = useState(true)


    // useEffect(() => {



    //     return () => (console.log('unmounted discover'))
    // }, [])


    const abbrev = 'abbrev'
    const repState = 'repState'

    logout = () => {
        props.navigation.navigate('LoginScreen')
    }

    getScreenDimensions = () => {
        const updatedDim = Dimensions.get('window').width
        setScreenWidth(updatedDim)
    }


    const sectionedArray = [{ sectionTitle: 'Discover', data: [], renderMethod: true },]

    //Rep Sorting and rendering
    function sortStatesAlphabetically(a, b) {


        const A = a[abbrev].toUpperCase()
        const B = b[abbrev].toUpperCase()

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;

    }


    function sortRepsAlpabetically(a, b) {

        //console.log(a[repState][abbrev] === undefined ? a.repId : null)
        const A = a[repState][abbrev].toUpperCase()
        const B = b[repState][abbrev].toUpperCase()

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    }

    const sortedRepsArray = [...state.reps].sort(sortRepsAlpabetically)
    const sortedStateArray = [...state.stateArray].sort(sortStatesAlphabetically)

    const sortByState = (stateSection) => {

        //sorts the reps into their states
        const sorted = sortedRepsArray.filter(item => item.repState.full === stateSection ? item : '')
        //the current state we're sorting
        let currentRepState = stateSection

        const congressForState = sorted.filter(item => item.repType === 'congress')
        const senatorForState = sorted.filter(item => item.repType === 'senator')



        //pushes the data on to the sectionlist to be rendered
        sectionedArray.push({ sectionTitle: currentRepState, type: 'card', data: (senatorForState.length === 2 ? senatorForState : [state.reps[0], state.reps[1]]), data2: congressForState })
    }

    const repSortMethod = repSort === true ? sortedStateArray.forEach(item => sortByState(item.full)) : null
    //REP SORTING


    renderBills = () => {

        state.bills.map(item => {
            sectionedArray.push({ sectionTitle: item.billId, type: 'bill', data: [item] })
            // console.log(item)
        })
    }


    const billSortMethod = billSort === true ? renderBills() : null




    componentToRender = (item) => {

        switch (item.section.type) {

            case ('card'): {
                //alert(JSON.stringify(item))

                return (
                    <CardListContainer screenWidth={screenWidth}>
                        <RepTypeView >
                            <RepTypeText theme={state.currentUser.theme} >{item.index < 1 ? 'Senators' : 'Congress'} </RepTypeText>
                        </RepTypeView>
                        <StaticListBG screenWidth={screenWidth} theme={state.currentUser.theme} >
                            <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'} intensity={90} style={styles.rowContainer}>
                                <StaticList
                                    listType='discover'
                                    index={item.index}
                                    data={item.section.data}
                                    data2={item.section.data2}
                                />
                            </BlurView>
                        </StaticListBG>
                    </CardListContainer>
                )
            }
            case ('bill'): {
                console.log(item)
                return (
                    <BillListContainer screenWidth={screenWidth}>
                        <BillView
                        // onPress={() => dispatch({
                        //     type: 'SHOW-BILL-MODAL',
                        //     payload: item.billId,
                        //     payload2: 'BillModal',
                        // })} 
                        >
                            <BillSmallText>{item.item.billId}</BillSmallText>
                            <BillBodyText> {item.item.billTitle}</BillBodyText>
                            <MoreInfoImage source={require('../assets/Plus.png')} />
                        </BillView>
                    </BillListContainer>
                )
            }

            case ('dash'): {
                return (
                    <LargeRepCard item={item.section.data} />
                )
            }
        }
    }

    renderHeadlineText = () => {
        if (repSort === true) {
            return 'Representatives By State'
        }
        else if (billSort === true) {
            return 'Bills'
        }
    }

    Headline = (props) => {

        return (
            <TopContentView screenWidth={screenWidth} >
                <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'} intensity={90} style={styles.topContainer}>
                    <TopHeadLine theme={state.currentUser.theme} > {props.sectionTitle} </TopHeadLine>
                    <SubHeadLine theme={state.currentUser.theme}>{renderHeadlineText()}</SubHeadLine>
                </BlurView>
            </TopContentView>
        )
    }


    test = () => {
        alert(JSON.stringify(sectionedArray))
    }

    changeSort = () => {
        repSort === true ?
            // GetBillData(true, 10) + 
            setRepSort(false) + setBillSort(true)
            :
            setRepSort(true) + setBillSort(false)

    }

    return (
        <BackgroundImage source={state.currentUser.theme === 'light' ? require('../assets/LightBG3.png') : require('../assets/DarkBG2.png')} >
            <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'} intensity={15} style={{
                height: '100%',
                width: '100%',
            }}>
                <TopView screenWidth={screenWidth}>
                    <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'} intensity={100} style={{
                        height: '100%',
                        width: '100%',
                    }}>
                    </BlurView>
                </TopView>
                <ScreenContainer>
                    <SectionList
                        sections={sectionedArray}
                        keyExtractor={(item) => item.repId}
                        renderItem={(item) => { return (componentToRender(item)) }}
                        renderSectionHeader={({ section: { sectionTitle, renderMethod } }) => {
                            return (
                                renderMethod ? (
                                    <Headline sectionTitle={sectionTitle} />
                                ) : (
                                        <SectionView screenWidth={screenWidth} theme={state.currentUser.theme} >
                                            <BlurView tint={state.currentUser.theme === 'light' ? 'default' : 'dark'} intensity={100} style={styles.container}>
                                                <SectionHeadLine theme={state.currentUser.theme} > {sectionTitle} </SectionHeadLine>
                                                <TouchableOpacity onPress={() => changeSort()}>
                                                    <Elipses>•••</Elipses>
                                                </TouchableOpacity>
                                            </BlurView>
                                        </SectionView>
                                    )
                            )
                        }}
                    />

                    <GetBillData />
                    <Modal
                        visible={state.modalName === 'RepDisModal' ? true : false}
                        onRequestClose={() => dispatch({
                            type: 'CLOSE-MODAL'
                        })}
                        animationType={'fade'}
                        transparent={true}
                    >
                        <RepModal modalToRender={state.modalName} />

                    </Modal>
                </ScreenContainer>
            </BlurView>
        </BackgroundImage>
    )
}


const StaticListBG = styled.View`
    height: auto;
    width: ${props => props.screenWidth - 30}px;
    border-radius: 10px;
    margin-left: 15px;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0 2px 2px rgba(0,0,0, 0.15);
`

const CardListContainer = styled.View`
    height: auto;
    width: ${props => props.screenWidth}px;
    align-content: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
`
const RepTypeView = styled.View`
    height: 22px;
    width: auto;
    align-items: flex-start;
    margin-bottom: 5px;
    /* position: absolute; */
`
const RepTypeText = styled.Text`
    font-size: 25px;
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    margin-left: 20px;
    opacity: .75;
    position: absolute;
`

const SectionView = styled.SafeAreaView`
    height: 50px;
    width: ${props => props.screenWidth - 20}px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
    margin-bottom: 10px;
    margin-top: 0px;
    margin-left: 10px;
    box-shadow: 0 5px 5px rgba(0,0,0, 0.15);
`
const SectionHeadLine = styled.Text`
    font-size: 26px;
    font-weight: bold;
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    margin-left: 10px;
    opacity: .75;
`
const TopContentView = styled.View`
    height: 65px;
    width: ${props => props.screenWidth}px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0)
    justify-content: center;
    align-items: flex-end;
    /* overflow: hidden; */
    margin-bottom: 40px;
    margin-top: 0px;
    /* box-shadow: 0 5px 5px rgba(0,0,0, 0.15); */
`
const TopView = styled.View`
    height: 44px;
    width: ${props => props.screenWidth}px;
    background-color: rgba(255, 255, 255, 0);
    /* box-shadow: 0 5px 5px rgba(0,0,0, 0.15); */
`

const TopHeadLine = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    opacity: .75;
    margin-bottom: 5px;
    margin-top: 20px;
    /* padding-top: 20px; */
`
const SubHeadLine = styled.Text`
    font-size: 20px;
    /* font-weight: bold; */
    color: ${props => (props.theme === 'dark') ? 'white' : '#171A27'};
    opacity: .75;
    margin: 5px;
    /* padding-top: 20px; */
`


const BackgroundImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    /* background-color: rgba(255,255,255, .1); */
`

const ScreenContainer = styled.SafeAreaView`
   
    background: rgba(0,0,0, 0);
    flex: 1;
    align-items: center;
    
`

const Elipses = styled.Text`
    font-size: 20px;
    /* font-weight: bold; */
    /* color: #171A27; */
    color: white;
    margin-right: 20px;
    opacity: .9;

`
//BILL STYLES
const BillView = styled.TouchableOpacity`
    height: auto;
    width: 320px;
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
    overflow: scroll;
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .5);
    /* opacity: .75; */
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`
const BillSmallText = styled.Text`
    font-size: 20px;
    /* color: #171A27; */
    color: white;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
    overflow: scroll;
`
const BillBodyText = styled.Text`
    font-size: 24px;
    /* color: #171A27; */
    color: white;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
`
const MoreInfoImage = styled.Image`
    height: 35px;
    width: 35px;
    align-content: center;
    justify-content:center;
    margin: 5px;
`
const BillListContainer = styled.View`
    height: auto;
    width: ${props => props.screenWidth}px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`



const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderRadius: 5,
        flexDirection: 'row',
    },
    topContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    text: {
        color: 'white',
        fontSize: 17
    },

})



{/* <StaticList
                listType = {'allSenators'}
                />

                 <StaticList
                listType = {'allCongress'}
                /> */}