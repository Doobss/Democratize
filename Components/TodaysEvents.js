import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { DispatchContext, StateContext } from '../Store/AppContext';
//import { DataDispatchContext } from '../Store/AppContext';

import styled from 'styled-components'
import Card from '../Components/Card'
import { BlurView } from 'expo-blur'
//import Buttons from '../Components/Buttons'


export default TodaysEvents = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    const [showBills, setShowBills] = useState(false)
    const [showMeetings, setShowMeetings] = useState(false)

    //const [todaysBills, setTodaysBills] = useState([])


    // useEffect(() => {
    //     getTodaysBills()
    // }, [])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

    const today = ((state.date.getMonth() + 1) + '/' + (state.date.getDate()) + '/' + (state.date.getFullYear()))
    const todayTitle = (months[state.date.getMonth()] + ' ' + (state.date.getDate()) + ' ' + (state.date.getFullYear())) + ':'
    const todaysEvents = state.calendar.reduce((acc, item) => item.date === today ? item : acc)
    findBills = (passedBillId) => {

        const matchedBills = state.bills.reduce((acc, item) => item.billId === passedBillId ? item : acc)
        todaysBills.push(matchedBills)
    }


    let todaysBills = []
    let todaysMeetings = []


    const data = todaysEvents.onFloor.bills === undefined ? null : todaysEvents.onFloor.bills.forEach(item => findBills(item.billId))

    checkTextLength = (text) => {
        const spreadText = text.split('')

        if (spreadText.length > 200) {
            let spreadTitle = text.split(' ')
            let shortTitle = spreadTitle.slice(0, 26)
            shortTitle.push('...')
            finalStr = shortTitle.reduce((acc, item) => acc + ' ' + item)
            return (finalStr)
        } else {
            return text
        }
    }


    // const data = todaysEvents.onFloor.bills.forEach(item => findBills(item.billId))
    BillList = () =>

        todaysBills.map((item) => {
            return (
                <LargerItemView key={item.billId} onPress={() => dispatch({
                    type: 'SHOW-BILL-MODAL',
                    payload: item.billId,
                    payload2: 'BillModal',
                })} >
                    <LargeItemBodyText>{item.billId}</LargeItemBodyText>
                    <BodyText> {checkTextLength(item.billTitle)}</BodyText>
                    <MoreInfoImage source={require('../assets/Plus.png')} />
                </LargerItemView>
            )
        })

    renderPlusForItem = (length) => length === 0 ? <Spacer /> : <MoreInfoImage source={require('../assets/Plus.png')} />


    billRenderer = () => {

        return (
            todaysBills.length !== 0 ?
                (

                    // todaysBills.map((item) =>
                    //     <ItemView key={item.billId} >
                    //         <ItemText>{item.billId}</ItemText>
                    //         <BodyText> {item.billTitle} </BodyText>
                    //         <MoreInfoImage source={require('../assets/Plus.png')} />
                    //     </ItemView>
                    // )
                    <ScrollContainer>
                        <ScrollView horizontal={true}
                            contentContainerStyle={{ alignContent: 'flex-start', height: 250 }}>

                            {BillList()}

                        </ScrollView>
                        {/* <CloseBillView onPress={() => setShowBills(false)} >
                    <LargeItemBodyText>Close</LargeItemBodyText>
                </CloseBillView> */}
                    </ScrollContainer>
                )
                :
                (
                    <ItemView onPress={todaysBills.length === 0 ? () => alert('Nothing to show') : () => setShowBills(true)} >
                        <ItemText>There are no bills on the floor today.</ItemText>
                        <Spacer />
                    </ItemView>
                )
            // )
        )
    }

    meetingRenderer = () => {

        return (
            <ItemView onPress={todaysMeetings.length === 0 ? () => alert('Nothing to show') : () => setShowMeetings(true)} >
                <ItemText> {todaysMeetings.length === 0 ? 'There are no meetings today.' : 'There are ' + todaysMeetings.length + ' today.'} </ItemText>
                {/* <ItemSubText> Have a look </ItemSubText> */}
                {renderPlusForItem(todaysMeetings.length)}
            </ItemView>
        )
    }


    return (
        <UserDashContainerBG >
            <BlurView tint='dark' intensity={95} style={{ flex: 1, }}>
                <ScheduleContainer>
                    <CardHeadLine> {todayTitle} </CardHeadLine>
                    <BodyText> {todaysEvents.schedule} </BodyText>
                </ScheduleContainer>
                <ItemContainer>
                    {showBills ? <CardHeadLine>Bills on the Floor</CardHeadLine> : null}
                    {billRenderer()}
                    {meetingRenderer()}
                    <ChangeDayContainer>

                        <ChangeDayButton onPress={() => dispatch({
                            type: 'SUBTRACT-DAY',
                        })} >
                            <ChangeDayText>Look Back</ChangeDayText>
                        </ChangeDayButton>
                        <ChangeDayButton onPress={() => dispatch({
                            type: 'ADD-DAY',
                        })} >
                            <ChangeDayText>Look Forward</ChangeDayText>
                        </ChangeDayButton>
                    </ChangeDayContainer>
                </ItemContainer>
            </BlurView>
        </UserDashContainerBG>
    )
}

const MoreInfoButton = styled.View`
    height: 44px;
    width: 90%;
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .5);
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
const Spacer = styled.View`
    height: 10px;
    width: 100%;
`
const MoreInfoImage = styled.Image`
    height: 30px;
    width: 30px;
    align-content: center;
    justify-content:center;
    margin: 5px;
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

const CardHeadLine = styled.Text`
    font-size: 24px;
    font-weight: bold;
    /* color: #171A27; */
    color: white;
    margin-top: 15px;
    margin-left: 10px;

`

const ItemText = styled.Text`
    font-size: 20px;
    /* font-weight: bold; */
    /* color: #171A27; */
    color: white;
    margin-top: 15px;
    margin-left: 5px;
    margin-bottom: 5px;
`

const BodyText = styled.Text`
    font-size: 20px;
    /* color: #171A27; */
    color: white;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
`

const ItemSubText = styled.Text`
    font-size: 16px;
    /* color: #171A27; */
    color: white;
    margin: 5px;
    margin-left: 20px;
    margin-right: 20px;
`

const ItemCount = styled.Text`
    font-size: 26px;
    /* color: #171A27; */
    color: white;
    margin: 5px;
`

const ScheduleContainer = styled.View`
    height: auto;
    width: 100%;
    justify-content:center;
    align-content: center;

`

const ItemContainer = styled.View`
    height: auto;
    width: 100%;
    justify-content: space-between;
    align-content: space-between;
    /* flex-direction: row; */
    margin: 5px;
`


const ItemView = styled.TouchableOpacity`
    flex: 1;
    border-radius: 5px;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .5);
    /* opacity: .75; */
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`
const ChangeDayButton = styled.TouchableOpacity`
    height: 90%;
    width: 45%;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin: 5px;
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .5);
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`

const ChangeDayText = styled.Text`
    font-size: 20px;
    /* font-weight: bold; */
    /* color: #171A27; */
    color: white;
   
`

const ChangeDayContainer = styled.View`
    height: 45px;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 5px;
    flex-direction: row;
`

const CloseBillView = styled.TouchableOpacity`
    height: 15%;
    width: 90%;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px; */
    margin: 5px;
    /* background-color: rgba(255, 255, 255, .5); */
    background-color: rgba(25, 25, 25, .5);
    /* opacity: .75; */
    position: relative;
    z-index: 5;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
`

const LargerItemView = styled.TouchableOpacity`
    height: auto;
    width: 275px;
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
const LargeItemBodyText = styled.Text`
    font-size: 16px;
    /* color: #171A27; */
    color: white;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
    overflow: scroll;
`

const ScrollContainer = styled.View`
    height: auto;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`