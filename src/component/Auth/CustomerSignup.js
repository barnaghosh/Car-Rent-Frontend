import React, { Component } from 'react'
import Auth from './Auth'


export class CustomerSignup extends Component {
    componentDidMount(){
        // console.log('SignUp Props:',this.props)
    }
    render() {
        return (
            <div className='container'>
                {/* <h1 style={{textAlign:'center'}}>Customer Signup</h1> */}
                <Auth auth='CustomerSignup' />
            </div>
        )
    }
}

export default CustomerSignup
