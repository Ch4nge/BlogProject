import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
export default class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            description: "",
            content: ""
        });
        this.postArticle = this.postArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    postArticle(event) {

        fetch("http://localhost:8080/blogs", {
            body: JSON.stringify({
                title: this.state.title, 
                description: this.state.description, 
                content: this.state.content
            }),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          })
          .then((res) => console.log(res))
          .then((res) => console.log(res));
        //event.preventDefault();
        /*this.refs.title.value="";
        this.refs.description.value="";
        this.refs.content.value="";*/
        
    }
    
    render() {
        console.log(this.state.title);
        return(
            <form>
            Title: <input type="text" 
                    name="title" 
                    ref="title" 
                    onChange={this.handleChange}/> <br/>
            Description: <input type="text" 
                        name="description" 
                        ref = "description"
                        onChange={this.handleChange}/><br/>
            Content:<br/>
            <textarea rows="5" cols="60" 
            name="content"
            ref="content" 
            onChange={this.handleChange}/><br/>
            <Link to="/">
            <button onClick={this.postArticle}>Add</button><br/>
            </Link>
            
            </form>
        )
    }
}