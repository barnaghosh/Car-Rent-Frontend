import React, { Component } from 'react'
import img1 from '../asset/double/1.jpg'
import img2 from '../asset/double/2.jpg'
import img3 from '../asset/double/noah2.jpg'
import img4 from '../asset/double/noah4.jpg'
import img5 from '../asset/double/noah5.jpg'
import Room from '../Basic room/Room'
import { connect } from 'react-redux'
import { getBook, book_details, fetch_bookDetails } from '../../redux/ActionCreator'

const mapDispatchToProps = dispatch => {
    return ({
        bookDetails: (details) => dispatch(fetch_bookDetails(details)),
        BookItem: () => dispatch(getBook())
    })
}


const mapStateToProps = state => {
    return ({
        book: state.book
    })
}

export class Double extends Component {
    Book = (e) => {
        // console.log('Single Submit Values:', e)
        this.props.bookDetails(e)
        this.props.history.push('/book')
    }
    signup = () => {
        this.props.history.push('/signup')
    }
    login = () => {
        this.props.history.push('/login')
    }
    componentDidMount() {
        this.props.BookItem()
    }
    render() {
        const imgArr = [
        { src: img5, type: 'Blue Noah Car', opp: { type: 'Naoh Car', area: '60 m^2', view: 'mountain view', tv: 'Flat-screen TV', wifi: 'Free wifi',break:true,dinner:true }, des: '2 extra-large  bed ', Total: 1, price: 7000, aval: 4 },

        { src: img4, type: 'Black Noah Car', opp: { type: 'Noah Car', area: '50 m^2', view:'sea view',tv:'',wifi:'Free wifi',break:true,dinner:false}, des: '2 large double bed ', Total: 1, price: 6000, aval: 3 },
       
        { src: img3, type: 'White Noah Car', opp: { type: 'Noach Car', area: '40 m^2', view: '', tv: 'Flat-screen TV', wifi: 'Free wifi' }, des: '2 large double  bed ', Total: 1, price: 5000, aval: 4 },
        ]
        return (
            <div className='container'  style={{padding:'20px 0px'}}>
                {/* <h1 style={{ textAlign: 'center' }}>Double</h1> */}
                <Room imgArr={imgArr} room='double' bookButton={this.Book} signup={this.signup} login={this.login} book={this.props.book} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Double)

