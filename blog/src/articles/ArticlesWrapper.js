import React, {Component} from 'react';
import Article from './Article';
import LimitedInfiniteScroll from 'react-limited-infinite-scroll'


export default class ArticlesWrapper extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeArticles: [],
            articles: [],
            totalArticles: 8
        }
        this.componentWillMount = this.componentWillMount.bind(this);
        this.renderArticle = this.renderArticle.bind(this);
    }

    componentWillMount(){
        fetch('http://127.0.0.1:8080/blogs')
            .then(response => response.json())
            .then(response => this.setState({
                articles: response,
                activeArticles: response.slice(response.length-4)
            }));
    }

    renderArticle(article){
        if(this.state.activeArticles.length > 0){
            return <Article key={article.id} article={article} />
        }
        else {
            return <p>Loading..</p>
        }
    }

    loadMore(){
        let tempArray = this.state.articles.slice(this.state.articles.length-this.state.totalArticles);
        let tempTotalArticles = this.state.totalArticles + 4;
        if(tempTotalArticles > this.state.articles.length){
            tempTotalArticles = this.state.articles.length;
        }
        this.setState({
            activeArticles: tempArray,
            totalArticles: tempTotalArticles
        });
    }

    render(){
        
        let articleList = 
            this.state.activeArticles.slice(0).reverse().map(  (article) => 
                this.renderArticle(article)
        );
        return(
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
        );
        
    }
} 


