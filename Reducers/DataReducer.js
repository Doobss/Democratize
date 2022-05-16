import React, { useReducer, useContext } from 'react'
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

export const FIELD = 'FIELD'
export const LOGIN = 'LOGIN'
export const FETCHLOGIN = 'FETCH-LOGIN'
export const FETCHHOME = 'FETCH-HOME'
export const SENSCREEN = 'SEN-SCREEN'

//used in the Login Fetch
// persistUsers = async (user) => {
//     await AsyncStorage.setItem('currentUsers', JSON.stringify(user))

// }

//function for checking data stored in Async
// checkStoredData = async (dataType) => {
//     const response = await AsyncStorage.getItem(dataType)
//     alert(response)

// }

// addPost = async (state, id) => {
//     const newPost = {
//         userName: state.currentUser.userName,
//         repId: id,
//         body: state.screenState.postInput,
//         uuid: uuidv4()
//     }
//     const oldPostsStr = JSON.stringify([...state.posts, newPost])
//     await AsyncStorage.setItem('posts', oldPostsStr)
// }

// addRep = async (state, action) => {
//     const updatedUser = { ...state.currentUser, userReps: [...state.currentUser.userReps] }
//     //alert(JSON.stringify(updatedUser))
//     const oldUsers = state.users.filter(item => item.userName !== state.currentUser.userName)

//     const updated = JSON.stringify([...oldUsers, updatedUser])

//     await AsyncStorage.setItem('users', updated)

//     //alert(JSON.stringify(updatedUser))
//     //return updatedUser
// }

// addUser = async (state, users) => {
//     const newUser = {
//         userName: state.userName,
//         name: state.name,
//         district: state.district,
//         password: state.password,
//         userState: state.userState,
//         userReps: [{ repId: (state.userState.abbrev + 'Sen1'), repType: 'senator', },
//         { repId: (state.userState.abbrev + 'Sen2'), repType: 'senator' },
//         { repId: (state.userState.abbrev + 'Con' + state.district), repType: 'congress', }]
//     }
//     // const newUserStr = JSON.stringify(newUser)
//     const oldUsersStr = JSON.stringify([...users, newUser])
//     alert(oldUsersStr)
//     await AsyncStorage.setItem('users', oldUsersStr)
// }

// checkForDuplicateReps = (state, repId) => {
//     const rep = state.currentUser.userReps.filter((item) => item.repId === repId)
//     return (rep)
// }





// export default DataReducer = (dataDraft, action) => {


//     switch (action.type) {



//     }

// }