import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


function Holiday() {
    //import the HOLIDAY_API_KEY from .en
    let api_key = process.env.REACT_APP_HOLIDAY_KEY
    let [holidays, setHolidays] = useState([]);
    
    useEffect(()=>{
        getHolidays();
    },[])

    // async function getHolidays(){
    //     let date = new Date();
    //     let holidays = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=IN&year=2024`)
    //     let newHolidays = holidays.data.response.holidays.filter((holiday)=>{
    //         //use only those holidays that are yet to come and only those that are considered as official holidays
    //         return (holiday.date.iso >= date.toISOString()) && (holiday.type[1]!=='Optional holiday') && (holiday.primary_type!=="Restricted Holiday")
    //     })
    //     setHolidays(newHolidays)
    // }
    function getHolidays(){
        let arr = [{name:"diwali"}, {name:"gandhi jayanti"}, {name:"christmas"}, {name:"new year"}, {name:"independence day"}]
        setHolidays(arr)
    }


  return (
    <div className='container mt-5'>
        <h3>Holidays</h3>
        <div className='mt-5'>
        <Box sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper', border:1 , borderRadius: 2, overflow: 'hidden'}}>
        <List>
        {holidays.length===0 ? <h3>No holidays in the next 10 days</h3>:
            <>
            {holidays.map((holiday, index)=>{
                //return only the latest 5 holidays
                if(index>=5) return;
                return(
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={holiday.name} />
                        </ListItemButton>
                        <Divider className='bg-dark' />
                    </ListItem>
                )})}
            </>}
        </List>
 
      </Box>
        </div>        
    </div>
  )
}

export default Holiday