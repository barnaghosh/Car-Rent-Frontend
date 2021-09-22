import { AUTH_SUCCESS, AUTH_FAILED, AUTH_LOADING, AUTH_LOGOUT } from './ActionTypes'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const auth_success = (token, userId,usertype) => {
    return ({
        type: AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            usertype:usertype

        }
    })
}

export const auth_loading = (isLoading,state) => {
    return ({
        type: AUTH_LOADING,
        payload: {
            load:isLoading,
            state:state
        }
    })
}

export const Logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('usertype')
    localStorage.removeItem('expireTime')
    return ({
        type: AUTH_LOGOUT
    })
}

export const authErr = (errMsg,authPara) => {
    const payLoadItem={
        errMsg:errMsg,
        authState:authPara
    }
    return ({
        type: AUTH_FAILED,
        payload: payLoadItem
    })
}



export const auth = (email, password, auth) => dispatch => {
    dispatch(auth_loading(true,auth))
    const authData = {
      user:{
        email: email,
        password: password,
       }
    }
    const LoginauthData = {
          email: email,
          password: password,
      }
    const header={
        headers:{
            "Content-Type":"application/json"
        }
    }
    console.log('Authdata',authData)
    // dispatch(auth_loading(true))
    // console.log('AuthCreator:',authData)

    let authUrl = null
    if (auth === 'Signup') {
        authUrl = 'http://127.0.0.1:8000/api/owner/'
        axios.post(authUrl, authData,header)
        .then(response => {
            // dispatch(auth_loading(false,auth))
            console.log('Auth Response:',response)
            
            return axios.post('http://127.0.0.1:8000/api/token/', LoginauthData,header)
            .then(response => {
                dispatch(auth_loading(false,auth))
                console.log('Auth Response:',response)
                return response.data
            })
            .then(data => {
                console.log('Decode :',jwtDecode(data.access))
                console.log('Response Data:',data)
                const token=data.access
                const decoded=jwtDecode(token)
                const user_id=decoded.user_id
                const exp=decoded.exp
                localStorage.setItem('token', token)
                localStorage.setItem('userId', user_id)
                localStorage.setItem('usertype', 'owner')
                let expireTime = new Date(exp*1000);
                localStorage.setItem('expireTime', expireTime)
                
                setTimeout(()=>{
    
                    dispatch(
                        auth_success(token, user_id,'owner')
                    )
                    dispatch(auth_loading(false,auth))
                },3000)
                
                dispatch(
                    auth_success(token, user_id,'owner')
                )
    
            })
            .catch(err => {
                dispatch(auth_loading(false,auth))
                console.log('AuthErr:',err.response)
                const key=Object.keys(err.response.data)[0]
                const key2=Object.keys(key)[0]
                // console.log('err:',key2)
             
                setTimeout(()=>{
                    dispatch(authErr(`Error occured`,auth))
                    dispatch(auth_loading(false,auth))
                },3000)
                
                dispatch(authErr(`Error Occured`,auth))
            })
        })
        
    
        .catch(err => {
            dispatch(auth_loading(false,auth))
            console.log('AuthErr:',err.response)
            const key=Object.keys(err.response.data)[0]
            const key2=Object.keys(key)[0]
            // console.log('err:',key2)
         
            setTimeout(()=>{
                dispatch(authErr(`Error Occured`,auth))
                dispatch(auth_loading(false,auth))
            },3000)
            
            dispatch(authErr(`Error Occured`,auth))
        })
    }
    if(auth=='CustomerSignup') {
        authUrl = 'http://127.0.0.1:8000/api/customer/'
        axios.post(authUrl, authData,header)
        .then(response => {
            // dispatch(auth_loading(false,auth))
            console.log('Auth Response:',response)
            
            return axios.post('http://127.0.0.1:8000/api/token/', LoginauthData,header)
            .then(response => {
                dispatch(auth_loading(false,auth))
                console.log('Auth Response:',response)
                return response.data
            })
            .then(data => {
                console.log('Decode :',jwtDecode(data.access))
                console.log('Response Data:',data)
                const token=data.access
                const decoded=jwtDecode(token)
                const user_id=decoded.user_id
                const exp=decoded.exp
                localStorage.setItem('token', token)
                localStorage.setItem('userId', user_id)
                localStorage.setItem('usertype', 'customer')
                let expireTime = new Date(exp*1000);
                localStorage.setItem('expireTime', expireTime)
                
                setTimeout(()=>{
    
                    dispatch(
                        auth_success(token, user_id,'customer')
                    )
                    dispatch(auth_loading(false,auth))
                },3000)
                
                dispatch(
                    auth_success(token, user_id,'customer')
                )
    
            })
            .catch(err => {
                dispatch(auth_loading(false,auth))
                console.log('AuthErr:',err.response)
                const key=Object.keys(err.response.data)[0]
                const key2=Object.keys(key)[0]
                // console.log('err:',key2)
             
                setTimeout(()=>{
                    dispatch(authErr(`Error occured`,auth))
                    dispatch(auth_loading(false,auth))
                },3000)
                
                dispatch(authErr(`Error Occured`,auth))
            })
        })
        
    
        .catch(err => {
            dispatch(auth_loading(false,auth))
            console.log('AuthErr:',err.response)
            const key=Object.keys(err.response.data)[0]
            const key2=Object.keys(key)[0]
            // console.log('err:',key2)
         
            setTimeout(()=>{
                dispatch(authErr(`Error Occured`,auth))
                dispatch(auth_loading(false,auth))
            },3000)
            
            dispatch(authErr(`Error Occured`,auth))
        })
    }
    if(auth === 'Login') {
        authUrl = 'http://127.0.0.1:8000/api/token/'
        axios.post(authUrl, LoginauthData,header)
        .then(response => {
            // dispatch(auth_loading(false,auth))
            console.log('Auth Response:',response)
            return response.data
        })
        .then(data => {
            console.log('Decode :',jwtDecode(data.access))
            console.log('Response Data:',data)
            const token=data.access
            const decoded=jwtDecode(token)
            const user_id=decoded.user_id
            
            const exp=decoded.exp
            
            console.log('UserId:',)
            return axios.get('http://127.0.0.1:8000/api/user/'+`${user_id}/`)
            .then(response=>{
                
                const is_owner=response.data.is_owner
                const is_customer=response.data.is_customer
                let usertype=null
                if(is_owner){
                    usertype='owner'
                    localStorage.setItem('token', token)
                    localStorage.setItem('userId', user_id)
                    let expireTime = new Date(exp*1000);
                    localStorage.setItem('expireTime', expireTime)
                    localStorage.setItem('usertype', usertype)
                }
                else{
                    usertype='customer'
                    localStorage.setItem('token', token)
                    localStorage.setItem('userId', user_id)
                    let expireTime = new Date(exp*1000);
                    localStorage.setItem('expireTime', expireTime)
                    localStorage.setItem('usertype', usertype)
                }
              
                console.log('Data Login:',is_owner)
                console.log('Data Login:',is_customer)
                setTimeout(()=>{
                    if(is_owner){
                        console.log('Hello1');
                        dispatch(
                            auth_success(token, user_id,'owner')
                        )
                    }
                    else{
                        console.log('Hello2')
                        dispatch(
                            auth_success(token, user_id,'customer')
                        )
                    }
                    
                    dispatch(auth_loading(false,auth))
                },3000)
                
                // if(is_owner){
                //     dispatch(
                //         auth_success(token, user_id,'owner')
                //     )
                // }
                // else{
                //     dispatch(
                //         auth_success(token, user_id,'customer')
                //     )
                // }
    
            })
            .catch(err=>{
                console.log('Error:',err)
            })
            
        })
        .catch(err => {
            dispatch(auth_loading(false,auth))
            console.log('AuthErr:',err.response)
            const key=Object.keys(err.response.data)[0]
            const key2=Object.keys(key)[0]
            // console.log('err:',key2)
         
            setTimeout(()=>{
                dispatch(authErr(`Error Occured`,auth))
                dispatch(auth_loading(false,auth))
            },3000)
            
            dispatch(authErr(`Error Occured`,auth))
        })
    }
    
    
}

export const AuthCheck = () => dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
        // logout
        dispatch(Logout())
    }
    else {
        const expireTime = localStorage.getItem('expireTime')
        
        if (new Date() > expireTime) {
            // logOut
            dispatch(Logout())
        }
        else {
            const userId = localStorage.getItem('userId')
            const usertype = localStorage.getItem('usertype')
            dispatch(auth_success(token, userId,usertype))
        }
    }
}