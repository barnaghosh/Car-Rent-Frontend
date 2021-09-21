import React, { Component } from 'react'
import {Card, CardImg, CardText } from 'reactstrap';
import './Room.css'

export class Img extends Component {
    render() {
        let active = {};
        let ImgSrc = this.props.baseURI + this.props.src
        if (this.props.selectImgSrc === ImgSrc || (this.props.index === 1 && this.props.check === 1)) {
            active = {
                
                boxShadow:'0px 0px 20px gray',

                borderRadius: '10px',
                border:'3px solid black'
            }
        }
        // console.log('condition:', this.props.selectImgSrc == this.props.baseURI + this.props.src)
        // console.log('selectImgSrc:', this.props.selectImgSrc)
        // console.log('ImgSrc:', ImgSrc)

        return (
            <div className='up' style={active} onClick={this.props.selectImg} >
                
                
                <div className='ImgDiv'>
                     <img src={this.props.src}  className='Img'/>
                </div>
                <p className='ImgType'>{this.props.type} </p>
                
            </div>
        )
    }
}

export default Img
