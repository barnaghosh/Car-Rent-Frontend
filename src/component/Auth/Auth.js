import React, { Component } from 'react'
import { Formik } from 'formik';
import { connect } from 'react-redux'
import { auth } from '../../redux/AuthCreator'
import Spinner from '../Spinner/Spinner'
import { Alert } from 'reactstrap';


const mapDispatchToProps = dispatch => {
    return ({
        fetchAuth: (email, password, auth1) => dispatch(auth(email, password, auth1)),
        visibleHandle: (bool) => {
            dispatch({
                type: 'VISIBLE',
                payload: bool
            })
        }
    })
}

const mapStateToProps = state => {
    return ({
        
        authErr: state.authErr,
        alert: state.alert,
        authState:state.authState,
        isLoading:state.isLoading
    })
}



export class Auth extends Component {
    state = {
        mode: '',
        visible: true
    }
    render() {
        // console.log('AuthProps AuthErr:',this.props.authErr)

        let form = (
            <div style={{ width: '60%', margin: 'auto', border: '1px solid gray', padding: '15px', borderRadius: '7px' }} >
                <Formik
                    initialValues={{ email: '', password: '', passwordConfirm: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required'
                        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(values.password)) {
                            errors.password = '[Use a Uppercase letter,use one of this special chacter[@!#%^&*],use one Lowercase letter,eight characters is must]'
                        }
                        if (this.props.auth === 'Signup' || this.props.auth === 'CustomerSignup') {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required'
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'confirm Password must match to password'
                            }
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        // console.log('Auth:', values)
                        this.props.fetchAuth(values.email, values.password, this.props.auth)
                        this.setState({
                            mode: this.props.auth
                        })
                    }}
                >
                    {({
                        values,
                        errors,

                        handleChange,

                        handleSubmit

                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} style={{ width: '100%' }} >
                            <input
                                type="email"
                                name="email"
                                className='form-control'
                                onChange={handleChange}

                                value={values.email}
                                placeholder='enter your email'
                            />
                            <span style={{ color: 'red' }}>{errors.email}</span>
                            <br />
                            <input
                                type="password"
                                name="password"
                                className='form-control'
                                onChange={handleChange}

                                value={values.password}
                                placeholder='enter  password'
                            />
                            <span style={{ color: 'red' }}>{errors.password}</span>
                            <br />
                            {this.props.auth === 'Signup' || this.props.auth === 'CustomerSignup'  ?
                                <div>
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        className='form-control'
                                        onChange={handleChange}

                                        value={values.passwordConfirm}
                                        placeholder='Confirm Password'
                                    />
                                    <span style={{ color: 'red' }}>{errors.passwordConfirm}</span>
                                    <br />
                                </div> : null
                            }

                            <button type="submit" className='btn btn-primary' style={{ margin: 'auto' }} >
                                {this.props.auth}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        )

        let error = null

        if (this.props.authErr !== null && this.props.authState===this.props.auth) {

            setTimeout(() => {
                this.props.visibleHandle(false)
            }, 4000)
           
            error = <Alert isOpen={this.props.alert} style={{ width: '60%', margin: 'auto', marginTop: '10px', marginBottom: '10px' }} >{this.props.authErr} </Alert>
        }
        // let load = <Spinner />;

        //    console.log('Mode:',this.props.isLoading)
        //    console.log('Check conditions:',(this.props.authErr!==null && this.props.auth===this.state.mode ))
        return (
            <div >
               
                    {this.props.isLoading!==null &&this.props.isLoading.load && this.props.isLoading.state===this.props.auth?<Spinner />:<div>
                        <h1 style={{textAlign:'center'}}>
                            {this.props.auth==='Signup'?'Owner Signup':this.props.auth==='CustomerSignup'?'Customer Signup':'Login'}
                        </h1>
                    {error}
                    {form}</div>} 

            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
