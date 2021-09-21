import React, { Component } from 'react'

export class Service extends Component {
    render() {
        return (
            <div style={{textAlign:'center',padding:'20px 10px'}} >
                <div>{this.props.icon} </div>
                <div style={{fontWeight:'bolder'}} >{this.props.type}</div>
                <div>
                    Kasd sea dolor et takimata labore dolor diam gubergren sea sed, amet sed kasd et sanctus sanctus. Invidunt ipsum no.
                </div>
            </div>
        )
    }
}

export default Service
