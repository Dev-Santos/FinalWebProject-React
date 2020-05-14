import React from 'react';
import axios from 'axios';

import '../css/addrecipe.css';


class AddRecipe extends React.Component {

    submit = (event) => {
        event.preventDefault();

        console.log("Eveent name: ", event.target.elements.name.value);
        console.log("Eveent recipe: ", event.target.elements.recipe.value);
        console.log("Eveent calories: ", event.target.elements.calories.value);
        console.log("Eveent weight: ", event.target.elements.weight.value);
        console.log("Eveent url: ", event.target.elements.image_url.value);

        const payload = {
            name: event.target.elements.name.value,
            recipe: event.target.elements.recipe.value,
            calories: event.target.elements.calories.value,
            image_url: event.target.elements.weight.value,
            totalWeight: event.target.elements.image_url.value
        };

        console.log("Payload: ", payload);

        axios({
            url: 'http://localhost:8080/api/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                // this.resetUserInputs();
                // this.getNotes();
            })
            .catch(() => {
                console.log('Internal server error');
            });
    };

    render(){
        return (
            <div>
                <h1 className="header">Add Recipe To Collection</h1>
                <div className="container">                
                    <form className="formPosition" onSubmit={this.submit}>
                        <h3>Add Recipe: </h3>
                        <p>Recipe Name: </p>
                        <input type='text' name='name' placeholder='Enter your recipe name: '></input><br />
                        <p>Recipe Instructions: </p>
                        <textarea type='text' name='recipe' placeholder='Enter your recipe: '></textarea><br />
                        <p>Recipe Calories: </p>
                        <input type='text' name='calories' placeholder="Enter your recipe's total calories: "></input><br />
                        <p>Recipe Weight: </p>
                        <input type='text' name='weight' placeholder="Enter your recipe's total weight: "></input><br />
                        <p>Recipe Image URL: </p>
                        <input type='text' name='image_url' placeholder="Enter your recipe's image url: "></input>
                        <div className="btn-holder">
                            <button type="submit">Add Recipe</button>
                            <button type="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
}

export default AddRecipe;