import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import './Details.css'
import { connect } from 'react-redux'
import Calendar from 'react-calendar';

const mapDispatchToProps = dispatch => {
    return ({
        Change: (date, roomName, roomType) => dispatch({
            type: 'DATE_CHANGE',
            payload: {
                date: date,
                roomName: roomName,
                roomType: roomType
            }
        })
    })
}

 const Check=({img,room,name,des,opp,roomNo,price,aval,book,token,key,signup,login,Change}) =>{


    // state = {
    //     startDate: new Date(),
    //     selectValue: 1,


    // }
    const [startDate,setStartDate]=useState(new Date())
    const [selectValue,setSelectValue]=useState(1)
    const handleDateChange=(data2)=>{
            setStartDate(data2)
            console.log('HandleDateChange:',data2)
            // Change(data2, name, room)    
    }
    
   const handleDate = (date) => {
        Change(date, name, room)
        // this.setState({
        //     startDate: date
        // })
        console.log('Under Date Function State Value:',startDate)
        console.log('Under Date function Date Value:',date)
        
        // this.handleDateChange(date)
        
    }
   const HandleChange = (e) => {
      
        setSelectValue(e.target.value)
        
    }

    // let opp = opp
    let mark = <i className="fa fa-check" style={{ color: 'green' }}></i>
    
    const submitValue = {
        date: startDate,
        roomNo: selectValue,
        price: selectValue * price,
        roomName: name,
        roomType: room,
        totalRoom: roomNo

    }
    let optionArr = null
    let price1 = null
    let option = null
    let disable = false
    
    // console.log('Date:',startDate)
    if (aval > 0) {

        optionArr = [...Array(aval).keys()];
        // console.log('option:',selectValue)
        price1 = price * selectValue
        option = optionArr.map((item, index) => {
            return <option style={{ width: '150px' }} className='form-control' value={index + 1} key={Math.random()} > {index + 1} </option>
        })
    }
    else {
        disable = true
    }
    // console.log('StartDate:',startDate)
   
    // Change(startDate,name,room)
    // if(startDate!==new Date()){
    //     Change(startDate,name,room)
    // }
    return (
        
        <div className='Details' >
               
                <div className='imgDiv'><img src={img} className='img' /> </div>
                <div style={{ borderLeft: '2px solid gray', width: '15%' }}>
                    <p className='name'>{name}</p>
                    <hr />
                    <p>Type:{opp.type} </p>
                    <p>{des} </p>

                </div>
                <div style={{ borderLeft: '2px solid gray', width: '25%' }} className='facilities'>
                    <ul>
                        <li>{mark} {opp.type} </li>
                        {opp.wifi.length !== 0 ? <li>{mark} {opp.wifi} </li> : null}
                        {opp.view.length !== 0 ? <li>{mark} {opp.view} </li> : null}
                        {opp.wifi.tv !== 0 ? <li>{mark} {opp.tv} </li> : null}
                    </ul>



                </div>
                <div style={{ borderLeft: '2px solid gray', width: '15%' }} className='date' >
                    
                    
                    
                <DatePicker selected={startDate} onChange={(date)=>{
                    setStartDate(date)
                    // Change(date,name, room)
                    
                }
                    }  className='form-control' dateFormat='dd/MM/yyyy' minDate={new Date()}
                    onSelect={handleDate}
                    />
                            
                 {/* <Calendar
                    onChange={setStartDate}
                    value={startDate}
                /> */}
                   

                </div>

                <div style={{ borderLeft: '2px solid gray', width: '10%', textAlign: 'center' }} className=''>
                    <p>{roomNo} </p>
                    <p style={{ color: 'red' }}>{aval > 0 ? aval : 'Sorry no'} room left </p>
                </div>
                <div style={{ borderLeft: '2px solid gray', width: '10%' }} className=''>
                    <select value={selectValue} onChange={HandleChange}>
                        {option}
                    </select>
                </div>
                <div style={{ borderLeft: '2px solid gray', width: '10%' }} className=''>
                    {price1} BDT
                 </div>
                <div style={{ borderLeft: '2px solid gray', width: '15%' }} className=''>
                    <div className='button'>
                        {token === null ? <><div>
                            <button className='btn btn-primary ' onClick={() => signup()} > Sign Up </button>
                        </div>
                            <div>
                                Or
                        </div>
                            <div>
                                <button className='btn btn-primary ' onClick={() => login()} > Login </button>
                            </div>
                        </> : <button className='btn btn-primary btn-lg' onClick={() => book(submitValue)} disabled={disable}  > Book </button>}

                    </div>
                </div>
            </div>
    )
}

export default connect(null,mapDispatchToProps)(Check)