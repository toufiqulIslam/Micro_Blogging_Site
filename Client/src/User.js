import React from 'react';
import axios from 'axios';
import './App.css';

class User extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            username: this.props.User.username,
            email: this.props.User.email,
            password: this.props.User.password
        };
    }

    updateInfo = (event) => {
        event.preventDefault();
      
        axios.post('/User/Update', this.state)
            .then(response => {
                if(response.data.length > 0)
                {
                    this.props.loginstat(response.data[0]);
                    this.props.history.push("/");
                }
                else
                {
                    alert("Invalid Username. Enter an Unique Username.");
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

    logOut = (event) => {
        event.preventDefault();
        this.props.loginstat({}, 1);

        this.props.history.push("/");
    }

    render(){
    return(
        
        <form onSubmit={this.updateInfo}>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
            <input type="text" 
             onChange={this.handleInputChange} 
             value={this.state.username} class="form-control col-md-3" id="username" placeholder="Enter Username"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input type="email"  
            onChange={this.handleInputChange} 
            value={this.state.email} disabled class="form-control col-md-3" id="email" placeholder="Enter Email"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
            <input type="password" 
             onChange={this.handleInputChange} 
             value={this.state.password} class="form-control col-md-3" id="password" placeholder="Enetr Password"/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-5 offset-1">
            <button type="submit" className="btn btn-primary">Update</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={this.logOut} className="btn btn-primary">Logout</button>
            </div>
        </div>
        </form>
    );
    }
}

export default User;