import React from 'react';
import axios from 'axios';
import './App.css';

class Register extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            username: "",
            email: "",
            password: ""
        };
    }

    registerUser = (event) => {
        event.preventDefault();
      
        axios.post('/User/Create', this.state)
            .then(response => {
                if(response.data.length > 0)
                {
                    this.props.loginstat(response.data[0]);
                    this.props.history.push("/");
                }
                })
            .catch(error =>{
                console.log(error);
            });

    }

    handleInputChange = (event) =>{
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render(){
    return(
        
        <form onSubmit={this.registerUser}>
        <div class="form-group row">
            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
            <input type="text" 
            onChange={this.handleInputChange} 
            value={this.state.usrname}
            class="form-control col-md-3" id="username" placeholder="Enter Username"/>
            </div>
        </div>
        <div class="form-group row">
            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input type="email"
            onChange={this.handleInputChange} 
            value={this.state.email}
             class="form-control col-md-3" id="email" placeholder="Enter Email"/>
            </div>
        </div>
        <div class="form-group row">
            <label htmlFor="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
            <input type="password"
            onChange={this.handleInputChange} 
            value={this.state.password}
             class="form-control col-md-3" id="password" placeholder="Enetr Password"/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-5 offset-1">
            <button type="submit" className="btn btn-primary">Register</button>
            </div>
        </div>
        </form>
    );
    }
}

export default Register;