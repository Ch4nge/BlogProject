import React, {Component} from 'react';
import Article from './Article';
import LimitedInfiniteScroll from 'react-limited-infinite-scroll';
import contains from 'string-contains';


export default class ArticleSearchWrapper extends Component {

    constructor(props){
        super(props);
        this.state = {
            search:"",
            activeArticles: [],
            articles: [],
            totalArticles: 8,
            searchTag: ""
        }
        this.componentWillMount = this.componentWillMount.bind(this);
        this.renderArticle = this.renderArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        fetch('http://127.0.0.1:8080/blogs/tags/'+this.props.match.params.tagName)
            .then(response => response.json())
            .then(response => this.setState({
                articles: response,
                activeArticles: response.slice(response.length-4)
            }));
    }

    renderArticle(article){
        if(this.state.activeArticles.length > 0){

            if(this.state.search.trim() === "") {
                return <Article key={article.id} article={article} />
            } else if(contains(article.title.toLowerCase(),this.state.search.toLocaleLowerCase())) {
                return <Article key={article.id} article={article} />
            } 

        }
        else {
            return <p>Loading..</p>
        }
    }

    loadMore(){
        let tempTotalArticles = this.state.totalArticles + 4;
        if(tempTotalArticles > this.state.articles.length){
            tempTotalArticles = this.state.articles.length;
        }
        let tempArray = this.state.articles.slice(this.state.articles.length-tempTotalArticles);
        this.setState({
            activeArticles: tempArray,
            totalArticles: tempTotalArticles
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        
        let articleList = 
            this.state.activeArticles.slice(0).reverse().map(  (article) => 
                this.renderArticle(article)
        );
        return(
            <div className = "tag-search">
            <input type="text" 
            name="search" 
            ref="search"
            className="searchBar"
            placeholder="&#xF002; Search.."
            onChange={this.handleChange}/>
            <h2>{"Searching for TAG: ["+this.props.match.params.tagName+"]"}</h2>
            <LimitedInfiniteScroll 
                limit={1} 
                hasMore={articleList.length < this.state.articles.length}
                spinLoader={<div className="loader">Loading...</div>}
                mannualLoader={<span style={{fontSize: 20, lineHeight: 1.5, marginTop: 20, marginBottom: 20, display: 'inline-block'}}>Load More</span>}
                noMore={<div className="loader">No More Items</div>} 
                loadNext={() => this.loadMore()}
                threshold={0}>
                    {articleList}
            </LimitedInfiniteScroll>
            </div>
        );
        
    }
} 


