import React, { Component } from 'react'
import {Alert, Button, Card, Row} from 'reactstrap'
import Img from './Img'
import './Room.css'
import ClickImg from './ClickImg'
import Details from './Details'
import Check from './Check'
import DatePicker from "react-datepicker";
import {connect} from 'react-redux'

const mapStateToProps=state=>{
    return({
        
        token:state.token
    })
}

export class Room extends Component {
    state={
        clickImg:null,
        index:1,
        baseURI:'',
        startDate:new Date()
        
    }

    changeDate=(date)=>{
        this.setState({
            startDate:date
        })
    }
    selectImg=(e)=>{
        // console.log('BaseURI:',e.view.origin)
        // console.log('SelectImgStyle:',e.target.style)
       
        this.setState({
            clickImg:e.target.src,
            index:0,
            baseURI:e.view.origin
        })
        
    }
    render() {

        let clickImg=null;
        let check=0;
        let ActiveImg;
        let name=null;
        let description=null;
        let selectImgId=0;
      
        // console.log('State:',this.state)
        // Room pics   
        const img=this.props.imgArr.map((item,index)=>{
           if(this.state.baseURI.length!==0){
            //    .slice(0,this.state.baseURI.length-1)
            let ImgSrc = this.state.baseURI + item.src
            if (this.state.clickImg === ImgSrc ) {
                   ActiveImg=item.src
           }
           }
            
            if(index===0){
                // console.log('IndexImage',item.src)
                clickImg=item.src
                ActiveImg=item.src
                check=1
                return <Img src={item.src} selectImg={this.selectImg} key={Math.random()} selectImgSrc={this.state.clickImg} index={this.state.index} check={check} type={item.type} baseURI={this.state.baseURI} />
            }
            else{
                // console.log('IndexImage',item.src)
                check=0
                return <Img src={item.src} selectImg={this.selectImg} key={Math.random()} selectImgSrc={this.state.clickImg} index={this.state.index} check={check} type={item.type}  baseURI={this.state.baseURI} />
            }
            return <Img src={item.src} key={Math.random()} type={item.type} />
            
        })
        // Active section
         if(this.state.clickImg!== null){
            ActiveImg=<ClickImg clickImg={ActiveImg} key={Math.random()} />
        }
        else{
            ActiveImg=<ClickImg clickImg={ActiveImg} key={Math.random()} />
        }
        // details section
        let details=''
        const detailsRow=this.props.imgArr.map((item)=>{
            return <Details img={item.src} room={this.props.room} name={item.type} des={item.des} opp={item.opp} roomNo={item.Total} price={item.price} aval={item.aval} bookButton={this.props.bookButton} token={this.props.token} key={Math.random()} signup={this.props.signup} login={this.props.login} book={this.props.book} />
        })
        let detailsTitle=(
            <div className='DetailsTitle' style={{display:'flex'}}>
            <div className='' style={{width:'20%'}}>Car Img</div>
            <div style={{width:'15%'}}>
               Car Name
                
             </div>
             {/* <div style={{width:'25%'}} >
               
                Facilities
                
             </div> */}
             <div style={{width:'15%'}}>
                Booking Date
             </div>
             <div style={{width:'10%'}}>
                From
             </div>
             <div style={{width:'10%'}}>
                To
             </div>
             <div style={{width:'10%'}} className=''>
               Total Car
             </div>
             {/* <div style={{width:'10%'}} className=''>
               Select Room 
             </div> */}
             <div style={{width:'15%'}} className=''>
               Price 
             </div>
             <div style={{width:'15%'}} className=''>
                Purchase
             </div>
        </div>
        )
        return (
            <div>
                {/* Active img */}
                {/* Row of img */}
                
                <div className='Active' >
                    {ActiveImg}
                </div>
                <div  className='Row'>
                    {img}
                </div>
                {/* Auth */}
                <div>
                    {/* <Card>
                        <DatePicker selected={this.state.startDate} onChange={this.changeDate} className='form-control' dateFormat='dd/MM/yyyy' minDate={new Date()} />
                        <Button>Search</Button>

                    </Card> */}
                </div>

                {/* Details */}
                <div className='detailsBox'>
                    {detailsTitle}
                     {detailsRow}
                </div>
                
            </div>
        )
    }
}

export default connect(mapStateToProps) (Room)
