import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {newUser} from '../../actions/user_actions';

class NewUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.newUser = this.newUser.bind(this);
    }

    newUser(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        this.props.newUser(user)
        this.props.history.push('/admin')
    }
    render() {
        return(
            <div className="">
                <div>Create User</div>
                <form onSubmit={this.newUser}>
                    <label>Username:</label>
                    <input type="text" onChange={(e) => this.setState({username: e.target.value})}/>
                    <label>Password:</label>
                    <input type="text" onChange={(e) => this.setState({password: e.target.value})}/>
                    <label>Email</label>
                    <input type="text" onChange={(e) => this.setState({email: e.target.value})}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>

        );
    }
}


NewUser.propTypes = {
    newUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps, {newUser})(withRouter(NewUser));