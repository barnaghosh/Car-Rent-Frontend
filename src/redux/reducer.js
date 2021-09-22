import * as ActionTypes from './ActionTypes'


const INTIALIZE_STATE={
    token:null,
    userId:null,
    usertype:null,
    authErr:null,
    alert:false,
    authState:null,
    bookDetails:null,
    book:[],
    date:null,
    bookToken:false,
    bookLoading:false,
    isLoading:null
    
}

export const reducer =(state=INTIALIZE_STATE,action)=>{
    // console.log('Reducer Action:',action)

    
   if(action.type===ActionTypes.BOOK_DETAILS){
       let bookItem=[]
       for(let key in action.payload){
           bookItem.push({...action.payload[key],
        id:key})
       }
    //    console.log('BookItem:',bookItem)
       return({
            ...state,
            book:[...bookItem]
       })
   }
   if(action.type===ActionTypes.BOOK_CONFIRM){
       return({
           ...state,
           bookDetails:action.payload
       })
   }
    
   if(action.type==='POST_BOOK'){
        return({
            ...state,
            bookToken:true
        })
   }
   if(action.type===ActionTypes.BOOK_LODING){
       return({
           ...state,
            bookLoading:action.payload
       })
   }
    if(action.type===ActionTypes.AUTH_SUCCESS){
        console.log('Data Reducer:',action.payload.usertype)
        return({
            ...state,
            token:action.payload.token,
            userId:action.payload.userId,
            usertype:action.payload.usertype
        })
    }
    if(action.type===ActionTypes.AUTH_LOGOUT){
        return({
            ...state,
            token:null,
            userId:null,
            usertype:null
        })
    }
    if(action.type===ActionTypes.AUTH_LOADING){
        return({
            ...state,
            isLoading:action.payload
        })
    }
    
    if(action.type==='AUTH_FAILED'){
        return({
            ...state,
            authErr:action.payload.errMsg,
            authState:action.payload.authState,
            alert:true
        })
    }
    if(action.type==='VISIBLE'){
        return({
            ...state,
            authErr:null,
            alert:action.payload
        })
    }
    
    return state;
}
console.log('Check reducer usertype:',INTIALIZE_STATE.usertype)