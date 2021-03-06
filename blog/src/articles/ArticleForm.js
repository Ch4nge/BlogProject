import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
export default class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      title: "",
      description: "",
      content: "",
      imgUrl: "",
      tags: [],
      tagText: "",
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
                    content: this.state.content,
                    image_url: this.state.imgUrl
                },
                tags: this.state.tags,
                userdata: this.props.userdata,
            }),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          })
          .then((res) => this.props.setRedirect())
          .then((res) => console.log(res));
        
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
    const {title, description, content} = this.state;
    const enabled =
          title.length > 0 &&
          description.length > 0 &&
          content.length > 0;
    return(
      <div className="modal fade" id="postNotificationModal" style={{width:'100%', margin:'auto'}}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Article</h5>
              
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title:</label>
                  <div className="col-sm-10">
                    <input className="form-control" input type="text" 
                          name="title" 
                          ref="title" 
                          onChange={this.handleChange} 
                          value={this.state.title} 
                          placeholder="Title of Article" required/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Description:</label>
                  <div className="col-sm-10">
                    <input className="form-control"
                            input type="text" 
                            name="description" 
                            ref = "description"
                            onChange={this.handleChange} 
                            value={this.state.description} 
                            placeholder="Description"required/>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="Url image" class="col-sm-2 col-form-label">Images url:</label>
                  <div className="col-sm-10">
                    <input className="form-control"
                            input type="text" 
                            name="imgUrl" 
                            ref = "imgUrl"
                            onChange={this.handleChange} 
                            value={this.state.imgUrl} 
                            placeholder="Url for image"required/>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="content" class="col-sm-2 col-form-label">Content:</label>
                  <div className="col-sm-10">
                    <textarea class="form-control" 
                      rows="20" cols="40" 
                      name="content"
                      ref="content" 
                      onChange={this.handleChange} 
                      value={this.state.content} 
                      placeholder="Your article..." required/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Add Tags: </label>
                  <div className="col-sm-5">
                  <input className="form-control"
                                    type="text"
                                    name="tagText"
                                    ref="tagText"
                                    onChange={this.handleChange}/>
                  </div>
                  <button type="button"className="btn btn-default" onClick={(event) => this.addTag(event, this.state.tagText) }>Add</button>

                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-5">
                    <div className="formTags">
                        {this.state.tags.map((tag) =>{
                            return <span className="tag">{tag.title}</span>
                        })}
                    </div>
                    </div>
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" 
                      data-dismiss="modal">Cancel</button>
              <button className="btn btn-primary" 
                      disabled={!enabled} 
                      className="btn btn-primary" 
                      onClick={this.postArticle} 
                      data-dismiss="modal">Post</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}