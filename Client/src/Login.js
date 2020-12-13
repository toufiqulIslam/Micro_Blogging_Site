import React from 'react';
import axios from 'axios';
import './App.css';

class Login extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            email: "",
            password: ""
        };
    }

    loggedIn = (event) => {
        event.preventDefault();
      
        axios.post('/User/Login', this.state)
            .then(response => {
                if(response.data.length > 0)
                {
                    this.props.loginstat(response.data[0]);
                    this.props.history.push("/");
                }
                else
                {
                    alert("Incorrect Credentials. Please try again.");
                }
                })
            .catch(error =>{
                console.log(error);
            });

    }

    openRegistration = (event) => {
        event.preventDefault();

        this.props.history.push("/register");
    }

    handleInputChange = (event) =>{
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render(){

        if(this.props.Status == true)
        {
            this.props.history.push("/user");
        }

    return(
        
        <div>
        <form onSubmit={this.loggedIn}>
        <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="email" 
            onChange={this.handleInputChange} 
            value={this.state.email}
            className="form-control col-md-3" 
            id="email" placeholder="Email"/>
            </div>
        </div>
        <div className="form-group row">
            <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input 
            type="password" 
            onChange={this.handleInputChange} 
            value={this.state.password}
            className="form-control col-md-3" 
            id="password" placeholder="Password"/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-5 offset-1">
            <button type="submit" className="btn btn-primary">Sign in</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={this.openRegistration} className="btn btn-primary">Sign up</button>
            </div>
        </div>
        </form>
        </div>
    );
    }
}

export default Login;