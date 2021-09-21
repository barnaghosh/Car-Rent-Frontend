import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardImg, CardImgOverlay,CardBody ,Button} from 'reactstrap';
import "../Basic room/Room.css"

export class MenuItem extends Component {
    render() {
        return (
           
            <div className='up'   >
                
                
                <div className='ImgDiv'>
                     <img src={this.props.img} onClick={this.props.go}  className='Img'/>
                </div>
                <Button className='btn'  onClick={this.props.go} style={{width:'100%',backgroundColor:'grey'}}>{this.props.text} </Button>
                
            </div>
        )
    }
}

export default MenuItem
