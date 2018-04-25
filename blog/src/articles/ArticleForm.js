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
                tags: this.state.tags,
                userdata: this.props.userdata
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
    const {title, description, content} = this.state;
    const enabled =
          title.length > 0 &&
          description.length > 0 &&
          content.length > 0;
    return(
      <div class="modal fade" id="postNotificationModal" style={{width:'100%', margin:'auto'}}>
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Article</h5>
              
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group row">
                  <label for="title" class="col-sm-2 col-form-label">Title:</label>
                  <div class="col-sm-10">
                    <input class="form-control" input type="text" 
                          name="title" 
                          ref="title" 
                          onChange={this.handleChange} 
                          value={this.state.title} 
                          placeholder="Title of Article" required/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">Description:</label>
                  <div class="col-sm-10">
                    <input class="form-control"
                            input type="text" 
                            name="description" 
                            ref = "description"
                            onChange={this.handleChange} 
                            value={this.state.description} 
                            placeholder="Description"required/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="content" class="col-sm-2 col-form-label">Content:</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" 
                      rows="20" cols="40" 
                      name="content"
                      ref="content" 
                      onChange={this.handleChange} 
                      value={this.state.content} 
                      placeholder="Your article..." required/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="addTags" class="col-sm-2 col-form-label">Add Tags: </label>
                  <div class="col-sm-5">
                  <input class="form-control"
                                    type="text"
                                    name="tagText"
                                    ref="tagText"
                                    onChange={this.handleChange}/>
                  </div>
                  <button type="button"class="btn btn-default" onClick={(event) => this.addTag(event, this.state.tagText) }>Add</button>

                </div>
                <div class="form-group row">
                    <label for="addedTags" class="col-sm-2 col-form-label"></label>
                    <div class="col-sm-5">
                    <div className="formTags">
                        {this.state.tags.map((tag) =>{
                            return <span className="tag">{tag.title}</span>
                        })}
                    </div>
                    </div>
                  </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" 
                      data-dismiss="modal">Cancel</button>
              <button class="btn btn-primary" 
                      disabled={!enabled} 
                      class="btn btn-primary" 
                      onClick={this.postArticle} 
                      data-dismiss="modal">Post</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}