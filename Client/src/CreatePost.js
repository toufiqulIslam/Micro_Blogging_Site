import React from 'react';
import axios from 'axios';
import './App.css';

class CreatePost extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            user_id: this.props.User.user_id,
            title: "",
            description: ""
        };
    }

    createPost = (event) => {
        event.preventDefault();
      
        axios.post('/Post/Create', this.state)
            .then(response => {
                if(response.data.length > 0)
                {
                    console.log(response.data);
                    this.props.history.push("/post");
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
        
        <form onSubmit={this.createPost}>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
            <input 
            onChange={this.handleInputChange} 
            value={this.state.title}
            type="text" class="form-control col-md-8" id="title" placeholder="Enter Title"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
            <textarea 
             onChange={this.handleInputChange} 
             value={this.state.description}
            type="text" class="form-control col-md-8" id="description" placeholder="Enter Description"/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-5 offset-1">
            <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
        </form>
    );
    }
}

export default CreatePost;