import React from 'react';
import axios from 'axios';

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

    render(){
        return (
            <div>
                {/* {(this.state.recipes).map(recipe) => ( */}
                    <div>
                        <h1>My Recipes Page</h1>
                        {/* <p>{this.state.recipes}</p> */}
                    </div>
                {/* // )} */}
            </div>
        )
    }
}

export default MyRecipes;