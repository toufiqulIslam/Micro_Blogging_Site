import React from 'react';
import './App.css';

class Home extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            username: this.props.User
        };
    }

    render(){

    if(this.state.username == "" || this.state.username == "Login")
    {
        this.state.username = "Blogging People..."
    }
    return(
        <div>
            <h1>Welcome: {this.state.username}</h1>
            <p>Keep sharing you thoughts and ideas across the globe. We are waiting for your next Blog!!</p>
        </div>
    );
    }
}

export default Home;