import * as ActionTypes from './ActionTypes'
import axios from 'axios'

export const bookConfirm=(details)=>{
    return({
        type:ActionTypes.BOOK_CONFIRM,
        payload:details
    })
}

export const fetch_bookDetails=(values)=>dispatch=>{
    dispatch(bookConfirm(values))
}

// post firebase

export const post=()=>{
    return({
        type:'POST_BOOK'
        
    })
}

export const post_loading=(value)=>{
    return({
        type:ActionTypes.BOOK_LODING,
        payload:value
    })
}

export const getBookItem=(details)=>{
    return({
        type:ActionTypes.BOOK_DETAILS,
        payload:details
    })
}

export const postBook=(item)=>dispatch=>{
    axios.post('https://hotel-booking-dccda-default-rtdb.firebaseio.com/book.json',item)
    .then(response=>{
        if(response.status=== 200){
            dispatch(post_loading(false))
            dispatch(post())
            console.log('Data:',response.data)
        }
        else{
            console.log('Data:',response.data)
            dispatch(post_loading(false))
        }
    })
    .catch(err=>{
        dispatch(post_loading(false))
        console.log('Error:',err)
       
    })
    
}

export const getBook=()=>dispatch=>{
    axios.get('http://127.0.0.1:8000/api/book/')
    .then(response=>response.data)
    .then(data=>{
        dispatch(getBookItem(data))
    })
    
}