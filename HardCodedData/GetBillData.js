
import React, { useContext, useState, useEffect } from 'react'
import { DispatchContext, StateContext } from '../Store/AppContext';
import Buttons from '../Components/Buttons';
import { REPS } from './CongressData'



export default GetBillData = () => {
    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    const [loadIndex, setLoadIndex] = useState(0)
    const [data, setData] = useState(0)

    // loadInit = async () => {
    //     try {
    //         let response = await fetch(
    //             'https://api.govinfo.gov/collections/BILLS/2019-10-15T20%3A18%3A10Z?offset=0&pageSize=50&congress=116&api_key=8dIVGdJy1kkPI9SEy0nwfzgNy10StSQiFS1hPdqE'
    //             //'https://api.govinfo.gov/packages/BILLS-116hr4661ih/summary?api_key=8dIVGdJy1kkPI9SEy0nwfzgNy10StSQiFS1hPdqE'
    //         )
    //         let billData = await response.json()
    //         setData(billData)
    //         //console.log(updatedBills)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        //loadInit()
    }, [])

    // let newBillArray = []
    // grabData = async (item) => {
    //     let response = await fetch('https://api.govinfo.gov/packages/' + item.packageId + '/summary?api_key=8dIVGdJy1kkPI9SEy0nwfzgNy10StSQiFS1hPdqE')
    //     let parsedData = await response.json()
    //     newBillArray.push(parsedData)
    // }


    loadBills = () => {
        const updatedBills = data.packages.forEach(item => grabData(item))
        console.log(newBillArray)
    }


    test = async (item) => {
        // let response = await fetch('https://api.govinfo.gov/packages/BILLS-116hr4405rh/summary?api_key=8dIVGdJy1kkPI9SEy0nwfzgNy10StSQiFS1hPdqE')
        // let parsedData = await response.json()
        // console.log(parsedData)
        // fs.readFileSync('CongressData.json', function (err, data) {
        //     const congress = JSON.parse(data)
        //     console.log(congress)
        // })
        console.log(REPS)
    }



    return (
        <Buttons
            onPress={() => test()}
            ButtonsTitle='Test congress'
        />


    )
}