import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Card, Modal } from 'reactstrap';
import { connect } from 'react-redux'
import {postBook,getBook,post_loading} from '../../redux/ActionCreator'
import Spinner from '../Spinner/Spinner'
import dateFormat from 'dateformat'



const mapDispatchToProps = dispatch => {
    return ({
       submitItem:(value)=>dispatch(postBook(value)),
       postLoading:(val)=>dispatch(post_loading(val))

    })
}


const mapStateToProps = state => {
    return ({
        item: state.bookDetails,
        userId:state.userId,
        bookToken:state.bookToken,
        bookLoading:state.bookLoading
    })
}

export class FormBook extends Component {
    state = {
        name: '',
        phone: '',
        disable: true,
        isLoading:false,
        modalOpen:false,
        modalMsg:''
    }
    
    handleInput = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
        

    }
    HandleSubmit = (e) => {
        e.preventDefault()
        // this.props.postLoading(true)
        this.setState({
            isLoading:true
        })
        // #808080
           // username:this.state.name,
        //    , "ddd mmm d yyyy, h:MM:ss TT"
        const submitValue={
            username:this.state.name,
            phone:this.state.phone,
            roomname:this.props.item.roomName,
            roomtype:this.props.item.roomType,
            roomno:this.props.item.roomNo,
            date:this.props.item.date,
            price:this.props.item.price,
            bookTime:dateFormat(new Date(), "ddd mmm d yyyy, h:MM:ss TT"),
            user:this.props.userId
        }
        const header={
            headers:{
                "Content-Type":"application/json"
            }
        }
        console.log('Submited Value:',submitValue)
        // this.props.submitItem(submitValue)
    axios.post('http://127.0.0.1:8000/api/book/',submitValue,header)
    .then(response=>{
        if(response.status=== 201){
            this.setState({
                isLoading:false,
                modalOpen:true,
                modalMsg:'Your booking is confirmed'
            })
            // console.log('Data:',response.data)
        }
        else{
            this.setState({
                isLoading:false,
                modalOpen:true,
                modalMsg:'Error'
            })
            // console.log('Data:',response.data)
            
        }
    })
    .catch(err=>{
        this.setState({
            isLoading:false,
            modalOpen:true,
            modalMsg:err.message
        })
        console.log('Error:',err.data)
       
    })

    }

    goBack=()=>{
        this.props.history.push('/')
    }

    render() {
        
        let disable = true;
        if (this.state.name.length === 0 || this.state.phone.length === 0) {
            disable = true
        }
        else {
            disable = false
        }
        let errName = null
        let errPhone = null
        if (
            !/^[a-zA-Z]{4,18}$/.test(this.state.name) && this.state.name.length !== 0
        ) {
            errName = 'Invalid name';
            disable=true
        }
        if (
            !/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(this.state.phone) && this.state.phone.length !== 0
        ) {
            errPhone = 'Phone number is not correct';
            disable=true
        }
        
        let success=null
        if(this.props.bookToken){
            success=<Alert>Your Booking Token is confirmed</Alert>
        }
        let form=(<div  className='ml-md-5 container' style={{margin:'10px'}}>
                
        {success}
        <h3 style={{ textAlign: 'left',border:'1px solid gray',boxShadow:'1px 1px #888888', borderRadius:'8px',padding:'20px' }} >Payment:{this.props.item.price} BDT </h3>
        <Form style={{ textAlign: 'left',border:'1px solid gray',boxShadow:'1px 1px #888888', borderRadius:'8px',padding:'20px' }} onSubmit={this.HandleSubmit} >
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" placeholder="Enter your name" onChange={this.handleInput} value={this.state.name} />
                <span style={{ color: 'red' }} >{errName} </span>
            </FormGroup>
            <br />
            <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input type="text" name="phone" placeholder="Enter your phone number" onChange={this.handleInput} value={this.state.phone} />
                <span style={{ color: 'red' }} >{errPhone} </span>
            </FormGroup>
            <br />
            <Button className='btn' color='primary' size='lg' type='submit' disabled={disable} >Confirm</Button>
        </Form>

    </div>)

        return (
            <div className='container' style={{width:'60%',margin:'auto'}}>
                {this.state.isLoading?<Spinner/>:form}
                <Modal isOpen={this.state.modalOpen} onClick={this.goBack}>
                    <p style={{textAlign:'center',padding:'10px'}}>{this.state.modalMsg}</p>
                     </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBook)

