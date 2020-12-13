import React from 'react';
import './App.css';
import Nav from './Nav';
import Post from './Post';
import CreatePost from './CreatePost';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import User from './User';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import './Component/FontAwesome';

class App extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          loggedInStatus: false,
          username:"Login",
          user: {}
        };
    }

    handleLogin = (user_data, log_out) => {
        if(log_out == 1)
        {
            this.setState({
                user: {},
                username: "Login",
                loggedInStatus: false
            })
        }
        else
        {
            this.setState({
                user: user_data,
                username: user_data.username,
                loggedInStatus: true
            });
        }
    }

    componentWillMount() {
        document.title = 'Micro Blogging Site'
      };

    render(){
    return(
        <Router >
        <div className="App">
            <switch>
                <Nav User={this.state.username}/>
                <Route
                    exact
                    path={"/"}
                    render={props => (
                        <Home
                        {...props} User={this.state.username}
                        />
                    )}
                    />
                <Route
                    exact
                    path={"/post"}
                    render={props => (
                        <Post
                        {...props} User={this.state.user} Status={this.state.loggedInStatus}
                        />
                    )}
                    />
                <Route
                    exact
                    path={"/post/create"}
                    render={props => (
                        <CreatePost
                        {...props} User={this.state.user} Status={this.state.loggedInStatus}
                        />
                    )}
                    />
                <Route
                    exact
                    path={"/login"}
                    render={props => (
                        <Login
                        {...props} loginstat={this.handleLogin} User={this.state.user} 
                        Status={this.state.loggedInStatus}
                        />
                    )}
                    />
                <Route
                    exact
                    path={"/register"}
                    render={props => (
                        <Register
                        {...props} loginstat={this.handleLogin} User={this.state.user}
                        Status={this.state.loggedInStatus}
                        />
                    )}
                    />
                <Route
                    exact
                    path={"/user"}
                    render={props => (
                        <User
                        {...props} loginstat={this.handleLogin} User={this.state.user}
                        Status={this.state.loggedInStatus}
                        />
                    )}
                    />
            </switch>
        </div>
        </Router> 
    );
    }
}

export default App;