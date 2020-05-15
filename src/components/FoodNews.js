import React from 'react';
import axios from 'axios';

import '../css/foodnews.css';

class FoodNews extends React.Component {

    state = {
        articles: []
    }

    componentDidMount = () => {
        this.getArticles(this.state.articles);
    }

    // componentWillReceiveProps = () => {
    //     this.getArticles(this.state.articles);
    // }

    getArticles = async () => {
        const API_KEY = "8b1c3d56453d44368f69eeff24d5bf4d";
        axios.get(`http://newsapi.org/v2/everything?q=cooking&language=en&sortBy=relevancy&pageSize=10&apiKey=${API_KEY}`)
            .then((response) => {
                const data = response.data;
                this.setState({ articles: data.articles });
                // console.log('Data received from News API: ',  this.state.articles, data.articles);
                // this.displayArticles(data);
            })
            .catch(() => {
                console.log('Error receiving data...');
            });
    }

    displayArticles = (articles) => {
        // console.log("Function data: ", articles);
        if(!articles.length) return null;
        
        return articles.map((article, index) => {
            // console.log("Function12345t data2: ", article);
            return(                       
                <div key={index} className="articleSection">
                    {/* <h1>HELLELLOOOOO</h1> */}
                    <h3 className="title">{article.title}</h3>
                    <p><b>Written by:</b> {article.author}</p>
                    <p><b>Content: </b> {article.content}</p>
                    <p><b>Description: </b> {article.description}</p>
                    <p><b>Link to Full Article: </b><a href="/foodnews"> {article.url}</a></p>
                    <img className="imagePos center" src={article.urlToImage} alt="N/A"></img>
                </div>
            )
        });

    }

    render(){
        return (
            <div>
                <div className="NewsSection">
                    <h3 className="pageHeader">Food News Articles</h3>
                    {this.displayArticles(this.state.articles)}
                </div>
            </div>
        )
    }
}

export default FoodNews;
