import React, {Component} from 'react';
import { Link } from 'react-router-dom';
export default class ArticleFilter extends Component {
    constructor(props) {
        super(props);
        
        this.state = ({
            search:""
        });
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    render() {
        console.log(this.state)
        return(
            <input type="text" 
            name="search" 
            ref="search"
            placeholder="Search"
            onChange={this.handleChange}/>

        )
    }
}