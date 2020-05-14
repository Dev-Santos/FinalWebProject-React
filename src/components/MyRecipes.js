import React from 'react';
import axios from 'axios';

import '../css/myrecipes.css';

class MyRecipes extends React.Component {

    state = {
        recipes: []
    }


    componentDidMount = () => {
        this.getRecipes();
    }

    getRecipes = () => {
        axios.get('http://localhost:8080/api/myrecipes')
            .then((response) => {
                const data = response.data;
                this.setState({ recipes: data });
                console.log('Data received from database', data, this.state.recipes);
            })
            .catch(() => {
                console.log('Error receiving data...');
            });
    };

    displayRecipies = (recipes) => {        
        if(!recipes.length) return null;

        return recipes.map((recipe, index) => {
            return(         
                       
                <div key={index} className="section">
                    <h3 className="name">{recipe.name}</h3>
                    <p className="recipe">Recipe: <br />{recipe.recipe}</p>
                    <p className="calories">Calories: {recipe.calories} | Weight: {recipe.totalWeight}</p>
                    
                    <img className="image" src={recipe.image_url} alt="..."></img>                            
                </div>
            )
        });
    };

    render(){
        return (
            <div>
                {/* {(this.state.recipes).map(recipe) => ( */}
                    <h1 className="pageTitle">Personal Recipe Collection</h1>
                    <div>                        
                        {this.displayRecipies(this.state.recipes)}
                    </div>
                {/* // )} */}
            </div>
        )
    }
}

export default MyRecipes;