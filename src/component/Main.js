import { Button } from 'reactstrap'
import React, { Component } from 'react'
import Header from './Header.js/Header'
import Single from './Rooms/Single'
import {Switch,Redirect,Route} from 'react-router-dom'
import Home from './Home/Home'
import About from './About/About'
import Double from './Rooms/Double'
import Triple from './Rooms/Triple'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import CustomerSignup from './Auth/CustomerSignup'
import {AuthCheck, Logout} from '../redux/AuthCreator'
import {connect} from 'react-redux'
import LogOut from './Auth/LogOut'
import Book from './Book/Book'
import {postBook,getBook} from '../redux/ActionCreator'
import Form from './Book/Form'
import Order from './Book/Order/Order'

const mapDispatchToProps=dispatch=>{
    return({
        authCheck:()=>dispatch(AuthCheck()),
        getItem:()=>dispatch(getBook())
    })
}

const mapStateToProps=state=>{
    return({
        token:state.token,
        bookDetails:state.bookDetails
    })
}

export class Main extends Component {
    componentDidMount(){
        this.props.authCheck()
        this.props.getItem()
    }
    render() {
        // console.log('BookDeatils:',this.props.bookDetails)
        let before_auth=(
                    <Switch>
                        {/* <Route path='/room/single' component={Single} />
                        <Route path='/' exact component={Home} /> */}
                        {/* <Route path='/about' component={About} /> */}
                        {/* <Route path='/room/double' component={Double}/>
                        <Route path='/room/triple' component={Triple} /> */}
                        <Route path='/login' component={Login} />
                        <Route path='/ownersignup' component={Signup} />
                        <Route path='/customersignup' component={CustomerSignup} />
                        {/* {this.props.bookDetails!==null?<Route path='/book' component={Book}/>:null} */}
                         {/* {this.props.bookDetails!==null?<Route path='/form'component={Form}/>:null} */}
                         {/* <Route path='/form'component={Form}/> */}
                        <Redirect to='/login' />
                    </Switch>
        )
        let after_auth=(
                    <Switch>
                        <Route path='/car/tata' component={Single} />
                        <Route path='/' exact component={Home} />
                        {/* <Route path='/about' component={About} /> */}
                        <Route path='/car/noah' component={Double}/>
                        <Route path='/car/micro' component={Triple} />
                        {this.props.bookDetails!==null?<Route path='/book' component={Book} />:null}
                        {this.props.bookDetails!==null?<Route path='/form'component={Form}/>:null}
                        <Route path='/logout' component={LogOut}/>
                        <Route path='/history' component={Order}/>
                        <Redirect to='/' />
                    </Switch>
        )
        return (
            <div>
                <Header />
                <div >
                    {this.props.token===null?before_auth:after_auth}
                </div>
                
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Main)
