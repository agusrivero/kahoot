import React, {Component} from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import { loginUser } from '../actions/login_action';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
      isUser: false,
      errors: {}
    }
    this.login = this.login.bind(this)
  }

  componentDidMount(){
    if(this.props.login.authenticated){
        if(this.props.login.user.isAdmin){
            this.props.history.push('/admin')
        }else{
            this.props.history.push('/user')
        }
    }
    console.log(localStorage)
    // axios.get('/login')
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.login.authenticated){
        if(this.props.login.user.isAdmin){
            this.props.history.push('/admin')
        }else{
            this.props.history.push('/user')
        }
        
    }
    // if(nextProps.errors){
    //     this.setState({errors: nextProps.errors})
    // }
  }

  login(e){
    e.preventDefault()
    const user = {
        username: this.state.username,
        password: this.state.password
    };
    this.props.loginUser(user)
    console.log(this.props.login)
    // axios.post('http://localhost:5000/login', {username, password})
    // .then(res => {
    //     console.log(res.data)
    //     this.props.dispatch(login(res.data))
    //     console.log("My State", this.props.user.isAdmin)
    //     if(res.data !== false){
    //         if(res.data.isAdmin){
    //             this.setState({isAdmin: true});
    //         }else{
    //             this.setState({isUser: true})
    //         }
    //     }
    // })
  }
  

  render(){
    // if (this.props.logged){
    //     if(this.props.user.isAdmin){
    //         return <Redirect to="/admin"/>;
    //     }else{
    //         return <Redirect to="/user"/>;
    //     }
    // }
    // if (this.state.isAdmin){
    //     return <Redirect to="/admin"/>;
    // }
    // if (this.state.isUser){
    //     return <Redirect to="/user"/>;
    // }
    return (
      <div className="mainScreen">
      <form onSubmit={this.login}>
        <label>Username:</label>
        <input type="text" onChange={(e) => this.setState({username: e.target.value})}/>
        <label>Password:</label>
        <input type="text" onChange={(e) => this.setState({password: e.target.value})}/>
        {/* <button type="submit" onClick={this.login}>Login</button> */}
        <input type="submit" value="Login"/>
      </form>
        
      </div>
      
    )
  }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withRouter(Login));