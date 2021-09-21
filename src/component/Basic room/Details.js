import React, { Component } from 'react'
import './Details.css'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import {getBook, fetch_bookDetails} from '../../redux/ActionCreator'


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



export class Details extends Component {
    state = {
        startDate: new Date(),
        selectValue: 1,


    }
    handleDateChange=(data2)=>{
        this.setState({
            startDate: data2
        })
            // console.log('HandleDateChange:',data2)
            // this.props.Change(data2, this.props.name, this.props.room)    
    }
    
   
    HandleChange = (e) => {
        this.setState({
            selectValue: e.target.value
        })
        
    }
    
    


    render() {
        let opp = this.props.opp
        let mark = <i className="fa fa-check" style={{ color: 'green' }}></i>
        
        const submitValue = {
            date: this.state.startDate.toDateString(),
            roomNo: this.state.selectValue,
            price: this.state.selectValue * this.props.price,
            roomName: this.props.name,
            roomType: this.props.room,
            totalRoom: this.props.roomNo,
            from:'Kishoregonj',
            To:'Dhaka'
        }
        let optionArr = null
        let price = null
        let option = null
        let disable = false
        
        // console.log('Details:',this.props.book)
      
        let avalible=this.props.roomNo
        
        this.props.book.map((item)=>{
            // console.log('I am in map:',item.date===this.state.startDate.toDateString())
            if(item.date===this.state.startDate.toDateString()){
                // console.log('I am in if outer loop:',item.date)
                // console.log('Props roomName:',this.props.room)
                // console.log('Item roomName:',item.roomname)
                // console.log('Props roomType:',this.props.name)
                // console.log('Item roomType:',item.roomtype)
                if(item.roomname===this.props.name && item.roomtype===this.props.room){
                    avalible=avalible-item.roomno
                    // console.log('I am in if inner loop:',avalible)
                }
            }
        })

        if (avalible > 0) {

            optionArr = [...Array(avalible).keys()];
            // console.log('option:',this.state.selectValue)
            price = this.props.price * this.state.selectValue
            option = optionArr.map((item, index) => {
                return <option style={{ width: '150px' }} className='form-control' value={index + 1} key={Math.random()} > {index + 1} </option>
            })
        }
        else {
            disable = true
        }
        
        return (
            <div className='Details' >
               
                <div className='imgDiv' style={{width:'20%'}}><img src={this.props.img} className='img' /> </div>
                <div style={{ borderLeft: '2px solid gray', width: '15%' }}>
                    <p className='name'>{this.props.name}</p>
                    <hr />
                    <p>Type:{this.props.opp.type} </p>
                    {/* <p>{this.props.des} </p> */}

                </div>
                {/* <div style={{ borderLeft: '2px solid gray', width: '25%' }} className='facilities'>
                    <ul>
                        <li>{mark} {this.props.opp.type} </li>
                        {opp.wifi.length !== 0 ? <li>{mark} {this.props.opp.wifi} </li> : null}
                        {opp.view.length !== 0 ? <li>{mark} {this.props.opp.view} </li> : null}
                        {opp.tv.length !== 0 ? <li>{mark} {this.props.opp.tv} </li> : null}
                        {opp.break ? <li>{mark} Free Breakfast </li> : <li>{mark} Free Breakfast Coffee </li>}
                        {opp.dinner ? <li>{mark} Free Dinner </li> : null}
                    </ul>
                </div> */}
                <div style={{ borderLeft: '2px solid gray', width: '15%' }} className='date' >
                    
                    
                    
                <DatePicker selected={this.state.startDate} onChange={(e)=>{
                    this.handleDateChange(e) }}  className='form-control' dateFormat='dd/MM/yyyy' minDate={new Date()} />
                </div>
                <div style={{ borderLeft: '2px solid gray', width: '10%', textAlign: 'center' }} className=''>
                    <p>Dhaka</p>
                    
                </div>
                <div style={{ borderLeft: '2px solid gray', width: '10%', textAlign: 'center' }} className=''>
                    <p>Cumilla </p>
                    
                </div>    
                <div style={{ borderLeft: '2px solid gray', width: '10%', textAlign: 'center' }} className=''>
                    <p>{this.props.roomNo} </p>
                    <p style={{ color: 'red' }}>{avalible> 0 ? avalible : 'Sorry no'} car left </p>
                </div>
                {/* <div style={{ borderLeft: '2px solid gray', width: '10%' ,textAlign:'center'}} className=''>
                    {avalible>0?<select value={this.state.selectValue} onChange={this.HandleChange} >
                        {option}
                    </select>:null}
                </div> */}
                <div style={{ borderLeft: '2px solid gray', width: '15%' }} className=''>
                {avalible>0?<>{price} BDT </>:null}
                 </div>
                <div style={{ borderLeft: '2px solid gray', width: '15%' }} className=''>
                    <div className='button'>
                        {this.props.token === null ? <><div>
                            <Button className='btn' color='primary' onClick={() => this.props.signup()} > Sign Up </Button>
                        </div>
                            <div>
                                Or
                        </div>
                            <div>
                                <Button className='btn ' color='primary' onClick={() => this.props.login()} > Login </Button>
                            </div>
                        </>: <Button className='btn' color='primary'  onClick={() => this.props.bookButton(submitValue)} disabled={disable}  > Book </Button>}

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,mapDispatchToProps) (Details)
