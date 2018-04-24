import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
export default class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            description: "",
            content: "",
            tags: [],
            tagText: ""
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
                post:{
                    title: this.state.title, 
                    description: this.state.description, 
                    content: this.state.content
                },
                tags: this.state.tags
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

    addTag(event, text){
        event.preventDefault();
        let array = this.state.tags
        array.push({title: text})
        this.setState({
            tags: array
        })
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
            <textarea rows="30" cols="65" 
                name="content"
                ref="content" 
                onChange={this.handleChange}/><br/>
            Add Tags: <input type="text"
                    name="tagText"
                    ref="tagText"
                    onChange={this.handleChange}
                    /><button onClick={(event) => this.addTag(event, this.state.tagText) }>Add</button><br/>
                <div className="formTags">
                    {this.state.tags.map((tag) =>{
                        return <span className="tag">{tag.title}</span>
                    })}
                </div>
            <Link to="/">
                <button onClick={this.postArticle}>Add</button><br/>
            </Link>
            
            </form>
        )
    }
}