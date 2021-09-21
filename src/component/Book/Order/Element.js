import React, { Component } from 'react'
import './Element.css'

export class Element extends Component {
//     bookTime: "2021-06-10T13:26:25.047Z"
// date: "Thu Jun 10 2021"
// id: "-Mbq5ZZ5LpJkY-E7dX3H"
// phone: "01783352592"
// price: 6000
// roomname: "Family"
// roomno: "3"
// roomtype: "single"
// userid: "G4MER2zd6zYbhDkXZyTwCisVBRH3"
// username: "barna"
    render() {
        let item=this.props.item
        // console.log('Element:',item)
        
        return (
            <div className='main'>
                <div className='Etable'>
                    <div className='header'>Booking item</div>
                    <div className='body'>
                    <div className='item'>
                            <span className='left'>Booking Id:</span>
                            <span className='right'>{item.id} </span>
                        </div>
                        <div className='item'>
                            <span className='left'>User Name:</span>
                            <span className='right'>{item.username} </span>
                        </div>
                        <div className='item'>
                            <span className='left'>Phone Number:</span>
                            <span className='right'>{item.phone} </span>
                        </div>
                        <div className='item'>
                            <span className='left'>Car Type:</span>
                            <span className='right'>
                            {item.roomtype==='single'?'TATA Car':item.roomtype==='double'?'NOAH Car':'MICRO Bus'}
                                 </span>
                        </div>
                        <div className='item'>
                            <span className='left'>Car Name:</span>
                            <span className='right'>{item.roomname} </span>
                        </div>
                        <div className='item'>
                            <span className='left'>Booking Rooms:</span>
                            <span className='right'>{item.roomno} </span>
                        </div>
                        <div className='item'>
                            <span className='left'>Booking Date:</span>
                            <span className='right'>{item.date} </span>
                        </div>
                        <div className='item'>
                            <span className='left'>Issue Date:</span>
                            <span className='right'>{item.bookTime} </span>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Element
