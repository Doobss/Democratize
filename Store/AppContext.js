import React, { useState } from 'react'
import { useImmerReducer } from 'use-immer'
import { loginReducer } from '../Reducers/LoginReducers'
import { DataReducer } from '../Reducers/DataReducer'


// export const AppContext = React.createContext([{}, () => { }]);
// export const AppConsumer = AppContext.Consumer;

export const DispatchContext = React.createContext([, () => { }])
// export const DataDispatchContext = React.createContext([{}, () => { }])
export const StateContext = React.createContext([{},])

const initalState = {
    date: new Date(),
    loginSuccses: '',
    currentUser: '',
    showModal: true,
    modalName: 'Auth',
    loading: true,
    focusedRepId: '',
    screenState: {
        userName: '',
        password: '',
        confirmPassword: '',
        passwordMatch: false,
        checkingPasswords: false,
        district: '',
        name: '',
        userState: '',
        registerSuccses: false,
    }
}

export const DispatchContextProvider = (props) => {
    const [state, dispatch] = useImmerReducer(loginReducer, initalState)
    //const [state, ] 
    // const [data, dataDispatch] = useImmerReducer(DataReducer, {})

    return (

        <DispatchContext.Provider value={[, dispatch]}>
            <StateContext.Provider value={[state,]}>
                {props.children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}



// export const AppProvider = (props) => {

//     const [state, setState] = useState({
//         currentUser: '',
//         // users: [
//         //     {userName:'Ian', name: 'Ian Bringe',district: '1',password: 'B', userState: {abbrev: 'WI', full: 'Wisconsin'}, posts: [ ],},
//         //     {userName:'Tom', name: 'Tom Tomerson',district: '2',password: 'T',userState: {abbrev: 'IL', full: 'Illinois'}, posts: [ ],},
//         //     ],
//         // reps : {
//         //     senatorData: [{state:'WI', rep:'Ron Johnson',repId:'WISen1',bio:'Ronald Harold Johnson (born April 8, 1955) is an American businessman and politician serving as the senior United States Senator from Wisconsin. Johnson was first elected to the Senate in 2010 and was re-elected in 2016. Before being elected to the Senate, Johnson was chief executive officer of PACUR, LLC, a polyester and plastics manufacturer. As of May 2019, he is the only Republican holding statewide elected office in Wisconsin.',},
//         //                   {state:'WI', rep:'Tammy Baldwin',repId:'WISen2',bio:'Tammy Suzanne Green Baldwin (born February 11, 1962) is an American politician serving as the junior United States Senator from Wisconsin since 2013. A member of the Democratic Party, she served three terms in the Wisconsin State Assembly, representing the 78th district, and from 1999 to 2013 represented Wisconsins 2nd congressional district in the United States House of Representatives.',}, 
//         //                   {state:'IL', rep:'Terry J',repId:'ILSen1',bio:'ILSEN1'}, 
//         //                   {state:'IL', rep:'Another One',repId:'ILSen2',bio:'ILSEN2'},
//         //                   {state:'CA', rep:'Terry J',repId:'CASen1',bio:'ILSEN1'}, 
//         //                   {state:'CA', rep:'Another One',repId:'CASen2',bio:'ILSEN2'},
//         //                   {state:'FL', rep:'Terry J',repId:'FLSen1',bio:'ILSEN1'}, 
//         //                   {state:'FL', rep:'Another One',repId:'ILSen2',bio:'ILSEN2'},
//         //                   {state:'NY', rep:'Terry J',repId:'NYSen1',bio:'NYSEN1'}, 
//         //                   {state:'NY', rep:'Another One',repId:'NYSen2',bio:'NYSEN2'},
//         //                 ],

//         //     congressData: [
//         //             {state: 'WI', districts:[
//         //                 {rep: 'Wis ', dis: '1 ', bio:'Blah 1 WI',},
//         //                 {rep: 'WI ', dis:'2 ',  bio:'Blah 2 WI',},
//         //                 {rep: 'WI ', dis: '3 ',  bio:'Blah 3 WI',},
//         //                 ]
//         //             },
//         //              {state:'IL', districts:[
//         //                 {rep: 'IL ', dis: '1 ', bio:'Blah 1 IL',},
//         //                 {rep: 'IL ', dis:'2 ', bio:'Blah 2 IL',},
//         //                 {rep: 'IL ', dis: '3 ', bio:'Blah 3 IL',},
//         //                 ]
//         //             },
//         //             {state: 'CA', districts:[
//         //                 {rep: 'CA ', dis: '1 ', bio:'Blah 1 CA',},
//         //                 {rep: 'CA ', dis:'2 ',  bio:'Blah 2 CA',},
//         //                 {rep: 'CA ', dis: '3 ',  bio:'Blah 3 CA',},
//         //                 ]
//         //             },{state: 'FL', districts:[
//         //                 {rep: 'FL ', dis: '1 ', bio:'Blah 1 CA',},
//         //                 {rep: 'FL ', dis:'2 ',  bio:'Blah 2 CA',},
//         //                 {rep: 'FL ', dis: '3 ',  bio:'Blah 3 CA',},
//         //             ]
//         //             },{state: 'NY', districts:[
//         //                 {rep: 'NY ', dis: '1 ', bio:'Blah 1 CA',},
//         //                 {rep: 'NY ', dis:'2 ',  bio:'Blah 2 CA',},
//         //                 {rep: 'NY ', dis: '3 ',  bio:'Blah 3 CA',},
//         //                 ]
//         //             }, ]
//         //         },
//         // stateArray: [{abbrev: 'CA', full: 'California'},{abbrev: 'FL', full: 'Florida'}, {abbrev: 'IL', full: 'Illinois'}, {abbrev: 'NY', full: 'New York'}, {abbrev: 'WI', full: 'Wisconsin'},],
//         showModal: false,
//         loginState:{
//             userName: '',
//             password: '',
//             confirmPassword: '',
//             passwordMatch: false,
//             checkingPasswords: false,
//             district: '',
//             guestForm: false,
//             name: '',
//             userState: '',
//             mounted: true,
//             loginSucssesful: false,
//         },

//             }
//     )
//         return(
//             <AppContext.Provider value ={[state, setState]}>

//                 {props.children}

//             </AppContext.Provider>

//         )
//     }

    // loginState:{
    //     userName: '',
    //     password: '',
    //     confirmPassword: '',
    //     passwordMatch: false,
    //     checkingPasswords: false,
    //     district: '',
    //     guestForm: false,
    //     name: '',
    //     userState: '',
    //     mounted: true,
    // },

