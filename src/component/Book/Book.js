import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, CardBody, Row } from 'reactstrap'
import './Book.css'
import FormBook from './Form'

import {post_loading} from '../../redux/ActionCreator'

const mapStateToProps = state => {
    return ({
        details: state.bookDetails,
        token: state.token
    })
}

const mapDispatchToProps=dispatch=>{
    return({
        postLoading:(val)=>dispatch(post_loading(val))
    })
}

export class Book extends Component {
    Book = () => {
        this.props.history.push('/form')
    }
    Cancel=()=>{
        this.props.history.goBack('/')
    }
    render() {
        // console.log('Book Props:',this.props.details)
        let details = (
            <div>
                <h1 style={{ textAlign: 'center' }}>Book</h1>
                <div style={{ margin: 'auto', width: '100%' }} >

                    {/* className='d-flex flex-md-row flex-column' */}



                    {/* <FormBook item={this.props.details} />  */}

                    <div className='table'>
                       
                        <table>
                            <thead>
                                <tr style={{ backgroundColor: 'green', color: 'white', textAlign: 'center' }} className='t'>
                                    <th>Car Type</th>
                                    <th>Car Name</th>
                                    <th>Booking cars</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr style={{}} className='tbody'>
                                    <td>{this.props.details.roomType}</td>
                                    <td>{this.props.details.roomName}</td>
                                    <td>{this.props.details.roomNo}</td>
                                    <td>{this.props.details.date}</td>
                                    <td> {this.props.details.price} BDT</td>
                                </tr>
                            </tbody>
                           
                            <tfoot >
                                <tr>
                                    <td className='buttonLeft btn-primary' colSpan='3' onClick={this.Book} >Book</td>
                                    <td className='buttonRight btn-danger' colSpan='2' onClick={this.Cancel} >Cancel</td>
                                </tr>
                                  
                                       </tfoot> 
                                       

                            
                        </table>
                       
                        {/* <div>
                            <Button className='btn btn-success' size='lg' block >Book</Button>
                            <Button>Cancel</Button>
                        </div> */}
                       
                        
                    </div>

                </div>

            </div>
        )

        return (
            <div className='container'>
                {this.props.details !== null ? details : null}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Book)
