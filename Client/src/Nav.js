import React,{Component} from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Nav extends Component{

    constructor(props) {
        super(props);

        
    }

    render(){
    return(
        <nav>
            <h1>Let's Blog</h1>
            <ul className="nav-links">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/post">
                    <li>Post</li>
                </Link>
                
                <Link to="/login">
                    <li>{this.props.User}</li>
                </Link>
            </ul>
        </nav>
    );
    }
}

export default Nav;