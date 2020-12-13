import React,{Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            comment_text: ""
        };

        this.LoadData();
    }

    LoadData = (event) => {
      
        let apiUrl = '/Post/Get?current_user='+this.props.User.user_id;

        if(this.props.Status == false)
        {
            apiUrl = '/Post/Get?current_user=0';
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                  (result) => {
                      if(result.length > 0)
                      {
                        this.setState({posts: result});
                        this.forceUpdate();

                        {result.map((item, key) => 
                            this.changeReactions(item, key)
                            )};
                      }
                      //console.log(result);
                  },
                  (error) => {
                      this.setState({error})
                  }
                  )
        }

    LoadSpechificData = (event) => {
    
        if(this.props.Status == true)
        {
        const apiUrl = '/Post/GetByUser?user_id='+this.props.User.user_id;

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                    (result) => {
                        if(result.length > 0)
                        {
                            this.state.posts = result;
                            {result.map((item, key) => 
                                this.changeReactions(item, key)
                                )};
                        }
                        else
                        {
                            this.setState({posts: []});
                        }
                        //console.log(result);
                    },
                    (error) => {
                        this.setState({error})
                    }
                    )
            }
            else
            {
                alert("Please Login First to View Post");
                this.props.history.push("/login");
            }
        }

        reaction = (event) => {
            event.preventDefault();
            
            var rowIndex = event.currentTarget.getAttribute("data-index");
            if(this.props.Status == true)
            {
                if(this.state.posts[rowIndex].user_id != this.props.User.user_id)
                {
                    if(event.currentTarget.getAttribute("data-likebtn") == "true")
                    {
                        this.state.posts[rowIndex].liked = "yes";
                        this.state.posts[rowIndex].disliked = "no";
                    }
                    else if(event.currentTarget.getAttribute("data-likebtn") == "false")
                    {
                        this.state.posts[rowIndex].liked = "no";
                        this.state.posts[rowIndex].disliked = "yes";
                    }
                    
                    this.state.posts[rowIndex].current_user = this.props.User.user_id;
                    //console.log(this.props.User.user_id);

                    axios.post('/Post/Reaction', this.state.posts[rowIndex])
                        .then(response => {
                            if(response.data.length > 0)
                            {
                                this.changeReactions(response.data[0], rowIndex);
                            }
                            })
                        .catch(error =>{
                            console.log(error);
                        });
                }
                else
                {
                    alert("You Can't Vote/Comment on your own post");
                    
                    this.state.posts[rowIndex].comment = "";
                    this.forceUpdate();
                }
            }
            else
            {
                alert("You must login first to Vote/Comment on a post.");
                this.props.history.push("/login");
            }
        }

        deleteComment = (event) => {
            event.preventDefault();

            var rowIndex = event.currentTarget.getAttribute("data-index");
            //console.log(event.currentTarget.getAttribute("data-index"));
            
            this.state.posts[rowIndex].current_user = this.props.User.user_id;

            axios.post('/Post/DeleteComment', this.state.posts[rowIndex])
                .then(response => {
                    if(response.data.length > 0)
                    {
                        this.changeReactions(response.data[0], rowIndex);
                    }
                    })
                .catch(error =>{
                    console.log(error);
                });
    
        }

    openCreatePost = (event) => {
        event.preventDefault();
        if(this.props.Status == true)
        {
            this.props.history.push("/post/create");
        }
        else
        {
            alert("Please Login First to Create a New Post");
            this.props.history.push("/login");
        }
    }

    changeReactions = (response, rowIndex) => {
        if(response.liked_by_user == "yes")
        {
            response.like_color = "blue";
            response.dislike_color = "";
        }
        else if(response.disliked_by_user == "yes")
        {
            response.like_color = "";
            response.dislike_color = "red";
        }
        else
        {
            response.like_color = "";
            response.dislike_color = "";
        }

        this.state.posts[rowIndex] = response;
        this.state.posts[rowIndex].comment = "";
        this.forceUpdate();
    }
    
    
    handleInputChange = (event) =>{
        event.preventDefault();

        var rowIndex = event.currentTarget.getAttribute("data-index");

        this.state.posts[rowIndex].comment = event.target.value;
        this.forceUpdate();
    }

    render() {

        // if(this.props.Status == false)
        // {
        //     return (
        //         <div>
        //             <h3>Please Login First to Create/View Blogs...</h3>
        //         </div>
        //     )
        // }
        // else
        // {
            const{error, likeCount} = this.state;

            return (
                <div>
                
                <div classNameName="postHeader" style={{"margin-bottom":"20px"}}>
                        <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.openCreatePost}
                    ><span>Create Post</span></button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.LoadData}
                    ><span>All Post</span></button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.LoadSpechificData}
                    ><span>My Post</span></button>
                </div>
                {this.state.posts.map((item, key) => 
                
                    <div className="column centered blurb">
                    <h3 className="col-md-4 offset-1" style={{"text-align":"left"}}>{item.title}</h3>
                    <p className="col-md-8 offset-1" style={{"text-align":"left"}}>{item.description}</p>
                    
                    <h4 className="col-md-4 offset-1" style={{"text-align":"left"}}>Comments:</h4>
                    {this.state.posts[key].comment_list.map((commentItem, commentKey) => 
                        <div className="col-md-10 offset-1 comments" style={{"text-align":"left"}}>
                            <p><b>{commentItem.username}: </b>{commentItem.comment} &nbsp;&nbsp;</p>
                        </div>
                    )}

                    <form  
                    data-index={key}
                    data-post_id={item.post_id} 
                    class="form-inline col-md-8 offset-1" onSubmit={this.reaction}>
                        <input type="text"
                            data-index={key}
                            data-post_id={item.post_id}
                            onChange={this.handleInputChange} 
                            value={item.comment}
                            class=" form-control" id="comment" placeholder="Type Comment Here"/>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary">Add Comment</button>                  
                    </form>

                    <div className="reacttions col-md-8 offset-1" style={{"text-align":"left"}}>
                            <button
                            type="button"
                            className="btn"
                            ><span
                            ><FontAwesomeIcon 
                            
                            onClick={this.reaction}
                            data-likebtn="true"
                            data-index={key}
                            data-post_id={item.post_id}
                            icon="thumbs-up" style={{color: item.like_color}}/>&nbsp;{item.like_count}</span></button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                            type="button"
                            className="btn"
                            ><span
                            
                            ><FontAwesomeIcon 
                            onClick={this.reaction}
                            data-likebtn="false"
                            data-index={key}
                            data-post_id={item.post_id}
                            icon="thumbs-down" style={{color: item.dislike_color}}/>&nbsp;{item.dislike_count}</span></button>
                        
                    </div>
                </div>

                )}
                
            </div>
    );
    }
    //}
}

export default Post;
