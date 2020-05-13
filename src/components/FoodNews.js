import React from 'react';
import axios from 'axios';

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
        axios.get(`http://newsapi.org/v2/everything?q=gourmet&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`)
            .then((response) => {
                const data = response.data;
                this.setState({ articles: data });
                console.log('Data received from News API: ',  this.state.articles);
                this.displayArticles(data);
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
                    <h1>HELLELLOOOOO</h1>
                    <p>Author: {article.articles.author}</p>
                </div>
            )
        });

    }

    render(){
        return (
            
                <div className="NewsSection">
                    <h1> HHEHDHKLNIOSKCOIK</h1>
                    {this.displayArticles(this.state.articles)}
                </div>
            
            // <h1>Food News Page</h1>
        )
    }
}

export default FoodNews;
