import React, { Component } from 'react'


export class ClickImg extends Component {
    render() {
        return (
            <div className='clickImg-div'  >
                <img className='clickImg' src={this.props.clickImg} style={{ borderRadius: '20px' }} alt='active' />
            </div>
        )
    }
}

export default ClickImg

