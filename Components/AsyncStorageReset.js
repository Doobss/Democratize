import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import Buttons from '../Components/Buttons';
import { AsyncStorage } from 'react-native'
import { REPS } from '../HardCodedData/CongressData'

//const currentUser = {}
const users = [
    {
        theme: 'dark',
        autoLoginTime: 1000000,
        userName: 'Ian',
        name: 'Ian Bringe',
        district: '1',
        password: 'B',
        userState: { abbrev: 'WI', full: 'Wisconsin' },
        userReps: [{ repId: 'WISen1', repType: 'senator' }, { repId: 'WISen2', repType: 'senator' }, { repId: 'P000607', repType: 'congress' },],
        userBills: [{ billId: 'H.R. 95' },],
    },
    {
        theme: 'light',
        autoLoginTime: 100000,
        userName: 'Tom',
        name: 'Tom Tomerson',
        district: '2',
        password: 'T',
        userState: { abbrev: 'IL', full: 'Illinois' },
        userReps: [{ repId: 'ILSen1', repType: 'senator' }, { repId: 'ILSen2', repType: 'senator' }, { repId: 'K000385', repType: 'congress' },],
        userBills: [{ billId: 'H.R. 3298' },],
    }
]
const senReps =

    [
        {

            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator', repState: { abbrev: 'WI', full: 'Wisconsin' },
            rep: 'Ron Johnson',
            repId: 'WISen1',
            repBio: 'Ronald Harold Johnson (born April 8, 1955) is an American businessman and politician serving as the senior United States Senator from Wisconsin. Johnson was first elected to the Senate in 2010 and was re-elected in 2016. Before being elected to the Senate, Johnson was chief executive officer of PACUR, LLC, a polyester and plastics manufacturer. As of May 2019, he is the only Republican holding statewide elected office in Wisconsin.',
            repPic: require('../assets/WISen1.jpg'),
        },
        {

            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'WI', full: 'Wisconsin' },
            rep: 'Tammy Baldwin',
            repId: 'WISen2',
            repBio: 'Tammy Suzanne Green Baldwin (born February 11, 1962) is an American politician serving as the junior United States Senator from Wisconsin since 2013. A member of the Democratic Party, she served three terms in the Wisconsin State Assembly, representing the 78th district, and from 1999 to 2013 represented Wisconsins 2nd congressional district in the United States House of Representatives.',
            repPic: require('../assets/WISen2.jpg'),
        },
        {

            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'IL', full: 'Illinois' },
            rep: 'Tammy Duckworth',
            repId: 'ILSen1',
            repBio: " Tammy, a Senator and a Representative from Illinois; born in Bangkok, Thailand, March 12, 1968; graduated from President William McKinley High School, Honolulu, Hawaii, 1985; B.A., University of Hawaii, Manoa, Hawaii, 1989; M.A., The George Washington University, Washington, D.C., 1992; attended Northern Illinois University, DeKalb, Ill.; helicopter pilot, U.S. Army Reserve, 1992-1996; Illinois Army National Guard, 1996-2014, attaining the rank of lieutenant colonel; served in Operation Iraqi Freedom, and was awarded the Purple Heart; unsuccessful candidate for election to the United States House of Representatives in 2006; director, Ill. department of veterans' affairs, 2006-2009; assistant secretary, United States Department of Veterans' Affairs, 2009-2011; delegate to the Democratic National Convention, 2012; elected as a Democrat to the One Hundred Thirteenth Congress and to the succeeding Congress (January 3, 2013-January 3, 2017); was not a candidate for reelection to the House of Representatives but was elected as a Democrat to the United States Senate in 2016 for the term ending January 3, 2023.",
            repPic: require('../assets/ILSen1.jpg'),
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'IL', full: 'Illinois' },
            rep: 'Another One',
            repId: 'ILSen2',
            repBio: 'ILSEN2',
            repPic: null
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'CA', full: 'California' },
            rep: 'Terry J',
            repId: 'CASen1',
            repBio: 'ILSEN1',
            repPic: null
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'CA', full: 'California' },
            rep: 'Another One',
            repId: 'CASen2',
            repBio: 'ILSEN2',
            repPic: null
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'FL', full: 'Florida' },
            rep: 'Terry J',
            repId: 'FLSen1',
            repBio: 'ILSEN1',
            repPic: null
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'FL', full: 'Florida' },
            rep: 'Another One',
            repId: 'FLSen2',
            repBio: 'ILSEN2',
            repPic: null
        },
        {
            repName: 'Charles E. Schumer',
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'NY', full: 'New York' },
            rep: 'Charles E. Schumer',
            repId: 'NYSen1',
            repBio: 'Charles Ellis (Chuck), a Senator and a Representative from New York; born in Brooklyn, N.Y., November 23, 1950; attended the public schools; graduated from Madison High School, Brooklyn 1967; A.B., Harvard University 1971; J.D., Harvard Law School 1974; admitted to the New York bar in 1975; served in the New York State assembly 1975-1980; elected as a Democrat to the Ninety-seventh and to the eight succeeding Congresses (January 3, 1981-January 3, 1999); was not a candidate in 1998 for reelection to the U.S. House of Representatives, but was elected as a Democrat to the United States Senate in 1998; reelected in 2004, 2010, and again in 2016 for the term ending January 3, 2023; chair, Democratic Senatorial Campaign Committee (2005-2008); chair, Democratic Policy and Communications Committee (2011-2017); chair, Joint Economic Committee (One Hundred Tenth and One Hundred Eleventh Congresses), Committee on Rules and Administration (One Hundred Eleventh to One Hundred Thirteenth Congresses); minority leader and Democratic caucus chairman (2017-).',
            repPic: require('../assets/NYSen1.jpg')
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'NY', full: 'New York' },
            rep: 'Another One',
            repId: 'NYSen2',
            repBio: 'NYSEN2',
            repPic: null
        },
        {
            repName: 'Doug Jones',
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'AL', full: 'Alabama' },
            rep: 'Doug Jones',
            repId: 'ALSen1',
            repBio: 'Gordon Douglas (Doug), a Senator from Alabama; born in Fairfield, Ala., May 4, 1954; B.S., University of Alabama, 1976; J.D., Samford University, Cumberland School of Law, 1979; staff counsel to Alabama senator Howell Heflin on the U.S. Senate Committee on the Judiciary; assistant U.S. attorney for the Northern District of Alabama, 1980-1984; practiced law in Birmingham, Ala., U.S. attorney for the Northern District of Alabama, 1997-2001; elected as a Democrat to the United States Senate in a special election on December 12, 2017, to fill the vacancy caused by the resignation of Jefferson Sessions, a seat subsequently held by appointed senator Luther Strange, for the term ending January 3, 2021, and took the oath of office on January 3, 2018.',
            repPic: require('../assets/ALSen1.jpg')
        },
        {
            repStatus: 'In session',
            repTopics: ['Healtcare', 'farmers', 'people'],
            repType: 'senator',
            repState: { abbrev: 'AL', full: 'Alabama' },
            rep: 'Jan Bo',
            repId: 'ALSen2',
            repBio: 'ALSEN2',
            repPic: null
        },
    ]

//CONGRESS


//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personWis ',
//         dis: '1',
//         repBio: 'Blah 1 WI',
//         repId: 'WICon1',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: require('../assets/WICon1.jpg'),
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personWI ',
//         dis: '2',
//         repBio: 'Blah 2 WI',
//         repId: 'WICon2',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'WI person',
//         dis: '3',
//         repBio: 'Blah 3 WI',
//         repId: 'WICon3',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'WI person',
//         dis: '4',
//         repBio: 'Blah 3 WI',
//         repId: 'WICon4',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'WI person',
//         dis: '5',
//         repBio: 'Blah 3 WI',
//         repId: 'WICon5',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'WI person',
//         dis: '6',
//         repBio: 'Blah 3 WI',
//         repId: 'WICon6',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'WI person',
//         dis: '7',
//         repBio: 'Blah 3 WI',
//         repId: 'WICon7',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'WI person',
//         dis: '8',
//         repBio: 'Blah 3 WI',
//         repId: 'WICon8',
//         repState: { abbrev: 'WI', full: 'Wisconsin' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personIL ',
//         dis: '1',
//         repBio: 'Blah 1 IL',
//         repId: 'ILCon1',
//         repState: { abbrev: 'IL', full: 'Illinois' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILL ',
//         dis: '2',
//         repBio: 'Blah 2 IL',
//         repId: 'ILCon2',
//         repState: { abbrev: 'IL', full: 'Illinois' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILIL ',
//         dis: '3',
//         repBio: 'Blah 3 IL',
//         repId: 'ILCon3',
//         repState: { abbrev: 'IL', full: 'Illinois' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILCA ',
//         dis: '1',
//         repBio: 'Blah 1 CA',
//         repId: 'CACon1',
//         repState: { abbrev: 'CA', full: 'California' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILCA ',
//         dis: '2',
//         repBio: 'Blah 2 CA',
//         repId: 'CACon2',
//         repState: { abbrev: 'CA', full: 'California' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'CpersonILA ',
//         dis: '3',
//         repBio: 'Blah 3 CA',
//         repId: 'CACon3',
//         repState: { abbrev: 'CA', full: 'California' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personFL ',
//         dis: '1',
//         repBio: 'Blah 1 FL',
//         repId: 'FLCon1',
//         repState: { abbrev: 'FL', full: 'Florida' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personFL ',
//         dis: '2',
//         repBio: 'Blah 2 FL',
//         repId: 'FLCon2',
//         repState: { abbrev: 'FL', full: 'Florida' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personFL ',
//         dis: '3',
//         repBio: 'Blah 3 FL',
//         repId: 'FLCon3',
//         repState: { abbrev: 'FL', full: 'Florida' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILNY ',
//         dis: '1',
//         repBio: 'Blah 1 CNY',
//         repId: 'NYCon1',
//         repState: { abbrev: 'NY', full: 'New York' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILNY ',
//         dis: '2',
//         repBio: 'Blah 2 NY',
//         repId: 'NYCon2',
//         repState: { abbrev: 'NY', full: 'New York' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personILNY ',
//         dis: '3',
//         repBio: 'Blah 3 NY',
//         repId: 'NYCon3',
//         repState: { abbrev: 'NY', full: 'New York' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personAL ',
//         dis: '1',
//         repBio: 'Blah 2 AL',
//         repId: 'ALCon1',
//         repState: { abbrev: 'AL', full: 'Alabama' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personAL ',
//         dis: '2',
//         repBio: 'Blah 3 AL',
//         repId: 'ALCon2',
//         repState: { abbrev: 'AL', full: 'Alabama' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personAL ',
//         dis: '3',
//         repBio: 'Blah 2 AL',
//         repId: 'ALCon3',
//         repState: { abbrev: 'AL', full: 'Alabama' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },
//     {
//         repStatus: 'In session',
//         repType: 'congress',
//         rep: 'personAL ',
//         dis: '4',
//         repBio: 'Blah 4 AL',
//         repId: 'ALCon4',
//         repState: { abbrev: 'AL', full: 'Alabama' },
//         repPic: null,
//         repTopics: ['Healtcare', 'farmers', 'people']
//     },

// ]


const stateArray = [{ abbrev: 'AL', full: 'Alabama' }, { abbrev: 'AK', full: 'Alaska' }, { abbrev: 'AS', full: 'American Samoa' }, { abbrev: 'AZ', full: 'Arizona' }, { abbrev: 'AR', full: 'Arkansas' }, { abbrev: 'CA', full: 'California' }, { abbrev: 'CO', full: 'Colorado' }, { abbrev: 'CT', full: 'Connecticut' }, { abbrev: 'DE', full: 'Delaware' }, { abbrev: 'DC', full: 'District of Columbia' }, { abbrev: 'FL', full: 'Florida' }, { abbrev: 'GA', full: 'Georgia' }, { abbrev: 'GU', full: 'Guam' }, { abbrev: 'HI', full: 'Hawaii' }, { abbrev: 'ID', full: 'Idaho' }, { abbrev: 'IL', full: 'Illinois' }, { abbrev: 'IN', full: 'Indiana' }, { abbrev: 'IA', full: 'Iowa' }, { abbrev: 'KS', full: 'Kansas' }, { abbrev: 'KY', full: 'Kentucky' }, { abbrev: 'LA', full: 'Louisiana' }, { abbrev: 'ME', full: 'Maine' }, { abbrev: 'MD', full: 'Maryland' }, { abbrev: 'MA', full: 'Massachusetts' }, { abbrev: 'MI', full: 'Michigan' }, { abbrev: 'MN', full: 'Minnesota' }, { abbrev: 'MS', full: 'Mississippi' }, { abbrev: 'MO', full: 'Missouri' }, { abbrev: 'MT', full: 'Montana' }, { abbrev: 'NE', full: 'Nebraska' }, { abbrev: 'NV', full: 'Nevada' }, { abbrev: 'NH', full: 'New Hampshire' }, { abbrev: 'NJ', full: 'New Jersey' }, { abbrev: 'NM', full: 'New Mexico' }, { abbrev: 'NY', full: 'New York' }, { abbrev: 'NC', full: 'North Carolina' }, { abbrev: 'ND', full: 'North Dakota' }, { abbrev: 'MP', full: 'Northern Marina Islands' }, { abbrev: 'OH', full: 'Ohio' }, { abbrev: 'OK', full: 'Oklahoma' }, { abbrev: 'OR', full: 'Oregon' }, { abbrev: 'PA', full: 'Pennsylvania' }, { abbrev: 'RI', full: 'Rhode Island' }, { abbrev: 'SC', full: 'South Carolina' }, { abbrev: 'SD', full: 'South Dakota' }, { abbrev: 'TN', full: 'Tennessee' }, { abbrev: 'TX', full: 'Texas' }, { abbrev: 'UT', full: 'Utah' }, { abbrev: 'VT', full: 'Vermont' }, { abbrev: 'VA', full: 'Virginia' }, { abbrev: 'VI', full: 'Virgin Islands' }, { abbrev: 'WA', full: 'Washington' }, { abbrev: 'WV', full: 'West Virginia' }, { abbrev: 'WI', full: 'Wisconsin' }, { abbrev: 'WY', full: 'Wyoming' }]
const posts = [{ repId: 'WICon1', userName: 'Ian', body: 'This is a post', uuid: '101' },
{ repId: 'WISen1', userName: 'Ian', body: 'This is a post', uuid: '102' }]

const bills = [
    {
        billId: 'H.R. 3298',
        roll: null,
        billInfo: '',
        billTitle: 'Hong Kong Human Rights and Democracy Act of 2019, as amended (Rep. Smith (NJ) – Foreign Affairs)',
        actions: [{ action: 'introduced', actionBy: 'House of Represantatives', date: '9/15/2019' }],
        result: { for: null, against: null, noShow: null, passed: null, failed: null, agreedTo: null }, billInfo: ''
    },

    {
        billId: 'H.R. 4270',
        roll: null,
        billInfo: '',
        billTitle: 'PROTECT Hong Kong Act, as amended (Rep. McGovern – Foreign Affairs)',
        actions: [{ action: 'introduced', actionBy: 'House of Represantatives', date: '9/15/2019' }],
        result: { for: null, against: null, noShow: null, passed: null, failed: null, agreedTo: null },
    },

    {
        billId: 'H.Res 521',
        billInfo: '',
        billTitle: 'H.Res. 543 – Recognizing Hong Kong’s bilateral relationship with the United States, condemning the interference of the People’s Republic of China in Hong Kong’s affairs, and supporting the people of Hong Kong’s right to protest, as amended (Rep. Sherman – Foreign Affairs)',
        actions: [{ action: 'introduced', actionBy: 'House of Represantatives', date: '9/15/2019' }],
        result: { for: null, against: null, noShow: null, passed: null, failed: null, agreedTo: null },
    },

    {
        billId: 'H.R. 95',
        roll: '557',
        billInfo: " This bill updates the Department of Veterans Affairs per diem payment calculation for entities furnishing services to homeless veterans to include funding for a minor dependent. The rate for per diem payments is the daily cost of care as estimated by the grant recipient or eligible entity. This bill would expand the per diem payment amount for a homeless veteran who has care of a minor dependent to the daily cost of care plus, for each minor dependent, an amount that equals 50% of such daily cost of care.",
        billTitle: 'Homeless Veteran Families Act',
        actions: [{ actionBy: 'House of Represantatives', action: 'introduced', date: '01/03/2019' }, { action: 'Motion to reconsider laid on the table Agreed to without objection.', actionBy: 'House of Represantatives', date: '10/15/2019' }, { action: 'DEBATE - The House proceeded with forty minutes of debate on H.R. 95.', actionBy: 'House of Represantatives', date: '10/15/2019' }, { action: 'Referred to the Subcommittee on Economic Opportunity.', actionBy: 'House of Represantatives', date: '01/16/2019' }, { action: 'Subcommittee Hearings Held.', actionBy: 'House of Represantatives', date: '04/09/2019' }, { action: 'Referred to the House Committee on Veterans Affairs.', actionBy: 'House of Represantatives', date: '01/03/2019' }, { action: 'introduced', actionBy: 'House of Represantatives', date: '01/03/2019' },],
        result: { for: null, against: null, noShow: null, passed: true, failed: null, agreedTo: null }, billInfo: ''
    },


]
const calander = [
    {
        date: '10/14/2019',
        schedule: 'On Monday, the House is not in session.',
        onFloor: {
            bills: [],
            meetings: [],
        }
    },
    {
        date: '10/15/2019',
        schedule: 'On Tuesday, the House will meet at 2:00 p.m. for legislative business, with votes postponed until 6:30 p.m.',
        onFloor: {
            bills: [{ billId: 'H.R. 3298' }, { billId: 'H.R. 95', }, { billId: 'H.Res 521', }, { billId: 'H.R. 4270', }],
            meetings: [],
        },
    },
    {
        date: '10/16/2019',
        schedule: 'On Wednesday and Thursday, the House will meet at 10:00 a.m. for Morning Hour debate and 12:00 p.m. for legislative business. On Friday, the House will meet at 9:00 a.m. for legislative business, with last votes of the week expected no later than 3:00 p.m.',
        onFloor: {
            bills: [{ billId: 'H.R. 3298' }, { billId: 'H.R. 95', }, { billId: 'H.Res 521', }, { billId: 'H.R. 4270', }],
            meetings: [],
        },
    },
    {
        date: '10/17/2019',
        schedule: 'On Wednesday and Thursday, the House will meet at 10:00 a.m. for Morning Hour debate and 12:00 p.m. for legislative business. On Friday, the House will meet at 9:00 a.m. for legislative business, with last votes of the week expected no later than 3:00 p.m.',
        onFloor: {
            bills: [{ billId: 'H.R. 3298' }, { billId: 'H.R. 95', }, { billId: 'H.Res 521', }, { billId: 'H.R. 4270', }],
            meetings: [],
        },
    },
    {
        date: '10/18/2019',
        schedule: 'On Wednesday and Thursday, the House will meet at 10:00 a.m. for Morning Hour debate and 12:00 p.m. for legislative business. On Friday, the House will meet at 9:00 a.m. for legislative business, with last votes of the week expected no later than 3:00 p.m.',
        onFloor: {
            bills: [{ billId: 'H.R. 3298' }, { billId: 'H.R. 95', }, { billId: 'H.Res 521', }, { billId: 'H.R. 4270', }],
            meetings: [],
        },
    },
]

//Calendar data structure
// {
//     date: '10/14/2019',
//     schedule: 'On Monday, the House is not in session.',
//     onFloor: {
//         bills: [],
//         meetings: [],
//     }
// },

const terms = [
    {
        termId: 'Suspension',
        title: 'Suspension of the rules in the United States Congress',
        shortDiscirption: 'Suspension of the rules is a procedure generally used to quickly pass non-controversial bills in the United States House of Representatives.',
        longDiscription: 'A motion to suspend the rules is in order on Mondays and Tuesdays and towards the end of a session of Congress and may only be made by the Speaker of the House or their designee, though it is customary for committee chairs to write the Speaker requesting a suspension. Once a member makes a motion to "suspend the rules" and take some action, debate is limited to 40 minutes, no amendments can be offered to the motion or the underlying matter, and a 2/3 majority of Members present and voting is required to agree to the motion.A suspension motion sets aside all procedural and other rules that otherwise prohibit the House from considering the measure—but the motion never mentions the specific rules that are suspended. Typically, a suspension motion is phrased as a motion to "...suspend the rules and pass the bill," and, if the motion is agreed to, the bill is considered passed by the House. A Member can also move to suspend the rules and take another action, such as to "suspend the rules and consider the bill," and the House shall take the proposed action if two-thirds of those voting are in favor of the motion.Most often, bills "on suspension" are non-controversial legislation—such as naming Post Offices of the United States Postal Service or federal buildings—and nearly all bills that are considered under suspension rules have bipartisan support.',
    },
    {
        termId: 'Bills',
        title: 'Bills',
        shortDiscirption: 'A bill is a legislative proposal before Congress.',
        longDiscription: 'Bills from each house are assigned a number in the order in which they are introduced, starting at the beginning of each Congress (first and second sessions). Public bills pertain to matters that affect the general public or classes of citizens, while private bills pertain to individual matters that affect individuals and organizations.',
    },
    {
        termId: 'Bills',
        title: 'Bills',
        shortDiscirption: 'A bill is a legislative proposal before Congress.',
        longDiscription: 'Bills from each house are assigned a number in the order in which they are introduced, starting at the beginning of each Congress (first and second sessions). Public bills pertain to matters that affect the general public or classes of citizens, while private bills pertain to individual matters that affect individuals and organizations.',
    },
    {
        termId: 'Concurrent',
        title: 'Concurrent Resolutions',
        shortDiscirption: 'A concurrent resolution is a legislative proposal that requires the approval of both houses but does not require the signature of the President and does not have the force of law.',
        longDiscription: 'Concurrent resolutions generally are used to make or amend rules that apply to both houses. They are also used to express the sentiments of both of the houses. For example, a concurrent resolution is used to set the time of Congress adjournment. It may also be used by Congress to convey congratulations to another country on the anniversary of its independence.',
    },
    {
        termId: 'Joint',
        title: 'Joint Resolutions',
        shortDiscirption: 'Like a bill, a joint resolution is a legislative proposal that requires the approval of both houses and the signature of the President. It has the force of law, if approved.',
        longDiscription: 'Resolutions from each house are assigned a number in the order in which they are introduced, starting at the beginning of each Congress (first and second sessions). Joint resolutions generally are used for limited matters, such as a single appropriation for a specific purpose. They are also used to propose amendments to the Constitution. These types of joint resolutions do not require the Presidents signature if three-quarters of the states have ratified them.',
    },
    {
        termId: 'Simple',
        title: 'Simple Resolutions',
        shortDiscirption: 'A simple resolution is a legislative proposal that addresses matters entirely within the prerogative of one house or the other. It requires neither the approval of the other house nor the signature of the President, and it does not have the force of law.',
        longDiscription: 'Most simple resolutions concern the rules of one house. They are also used to express the sentiments of a single house. For example, a simple resolution may offer condolences to the family of a deceased member of Congress, or it may express the sense of the Senate or House on foreign policy or other executive business.',
    },
    {
        termId: 'Engrossed',
        title: 'Engrossed Bill',
        shortDiscirption: 'A legislative proposal that has been prepared in a final form for its submission to a vote of the lawmaking body after it has undergone discussion and been approved by the appropriate committees.',
        longDiscription: '',
    },

]
//Term data structure
// {
//     termId: '',
//     title: '',
//     shortDiscirption: '',
//     longDiscription: '',
// },






const reps = [...senReps, ...REPS]



//const showModal = false
// const loginState:{
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
//     loginSucssesful: false,
// },

export default AsyncStorageReset = () => {

    const postsStr = JSON.stringify(posts)
    const usersStr = JSON.stringify(users)
    const repsStr = JSON.stringify(reps)
    const stateArrayStr = JSON.stringify(stateArray)
    const billsStr = JSON.stringify(bills)
    const calanderStr = JSON.stringify(calander)
    const termsStr = JSON.stringify(terms)


    ResetStore = async () => {
        try {
            await AsyncStorage.removeItem('currentUsers')
            await AsyncStorage.setItem('users', usersStr)
            await AsyncStorage.setItem('reps', repsStr)
            await AsyncStorage.setItem('stateArray', stateArrayStr)
            await AsyncStorage.setItem('posts', postsStr)
            await AsyncStorage.setItem('bills', billsStr)
            await AsyncStorage.setItem('calendar', calanderStr)
            await AsyncStorage.setItem('persistedUsers', '[]')
            await AsyncStorage.setItem('terms', termsStr)
            alert('Store Reset with persisted users deleted')
        } catch (error) {
            alert('something went wrong')
        }
    }

    resetDataStorePersisted = async () => {
        try {
            await AsyncStorage.removeItem('currentUsers')
            await AsyncStorage.setItem('users', usersStr)
            await AsyncStorage.setItem('reps', repsStr)
            await AsyncStorage.setItem('stateArray', stateArrayStr)
            await AsyncStorage.setItem('posts', postsStr)
            await AsyncStorage.setItem('bills', billsStr)
            await AsyncStorage.setItem('calendar', calanderStr)
            await AsyncStorage.setItem('terms', termsStr)
            alert('uploaded. persisted users unchanged')
        } catch (error) {
            alert('something went wrong')
        }
    }



    return (
        <View style={flex = 1 / 2}>
            <Buttons
                ButtonsTitle='Complete Store Reset'
                onPress={() => ResetStore()}
            />

            <Buttons
                ButtonsTitle='Hydrate Storage'
                onPress={() => resetDataStorePersisted()}
            />
        </View>
    )
}
