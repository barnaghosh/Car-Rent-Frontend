import React, { Component } from 'react'
import img1 from '../asset/triple/1.jpg'
import img2 from '../asset/triple/micro4.jpg'
import img3 from '../asset/triple/micro3.jpg'
import img4 from '../asset/triple/micro2.jpg'
import img5 from '../asset/triple/5.jpg'
import Room from '../Basic room/Room'
import {connect, coonect} from 'react-redux'
import {getBook, fetch_bookDetails} from '../../redux/ActionCreator'

const mapDispatchToProps=dispatch=>{
    return({
        bookDetails:(details)=>dispatch(fetch_bookDetails(details)),
        BookItem:()=>dispatch(getBook())
    })
}

const mapStateToProps=state=>{
    return({
        book:state.book
    })
}

export class Triple extends Component {
    Book=(e)=>{
        // console.log('Single Submit Values:',e)
        this.props.bookDetails(e)
        this.props.history.push('/book')
    }
    signup=()=>{
        this.props.history.push('/signup')
    }
    login=()=>{
        this.props.history.push('/login')
    }
    componentDidMount(){
        this.props.BookItem()
    }
    render() {
        const imgArr=[{src:img4,type:'Micro Bus 1',opp:{type:'Microbus',area: '60 m^2', view: 'mountain view & sea view', tv: 'Flat-screen TV', wifi: 'Free wifi',break:true,dinner:true},des:'1 extra-large double bed ',Total:1,price:8000},
        {src:img3,type:'Micro Bus 2',opp:{type:'Micro Bus',area: '40 m^2', view: 'mountain view', tv: 'Flat-screen TV', wifi: 'Free wifi' },des:'1 large  bed ',Total:1,price:6000},
        {src:img2,type:'Micro Bus 3',opp:{type:'Micro Bus',area: '37 m^2',view:'',tv:'',wifi:'Free wifi',break:false,dinner:false},des:'1 large  bed ',Total:1,price:5000}]
        return (
            <div className='container'  style={{padding:'20px 0px'}}>
              {/* <h1 style={{textAlign:'center'}}>Triple</h1>   */}
              <Room imgArr={imgArr} room='triple' bookButton={this.Book} signup={this.signup} login={this.login} book={this.props.book}/>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Triple)

