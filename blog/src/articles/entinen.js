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