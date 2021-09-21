import React, { Component } from 'react'
import DatePicker from "react-datepicker";

export class Picker extends Component {
    state={
        startDate:new Date()
    }
    Date=(date)=>{
        this.setState({
            startDate:date
        })
    }
    render() {
        return (
            <div>
                <label>Starting Date</label>
                 <DatePicker selected={this.state.startDate} onChange={this.Date} className='form-control' type='date' />
                 <label>Ending Date</label>
                 <DatePicker selected={this.state.startDate} onChange={this.Date} className='form-control' />
            </div>
        )
    }
}

export default Picker
