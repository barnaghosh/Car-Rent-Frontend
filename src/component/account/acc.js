import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps=state=>{
    return({
        
        usertype:state.usertype,
    })
}

export class Acc extends Component {
   
    render() {

       
        console.log('Check Tyepe:',this.props.usertype)
        return (
            <div className='container' style={{margin:'100px auto',width:'40%',border:'2px solid green'}}>
               <div >
                   <p style={{textAlign:'center'}}>This is
                    {this.props.usertype ==='owner'?' Owner Account':' Client Account'}</p>
               </div>
            </div>
        )
    }
}

export default connect(mapStateToProps) (Acc)
