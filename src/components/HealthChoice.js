import React, { useEffect, useState } from 'react';

// import Recipe from './Recipe';
// import FoodSection from './FoodSection';
import '../css/healthchoice.css';


const DietPage = () => {
    const APP_ID = "e625b8c1";
    const APP_KEY = "1debc070ab2e7f1a889ec5f8979f4f86";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('red');
    // const [nutrients, displayNutrients] = useState([]);

    useEffect( () => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/food-database/parser?nutrition-type=Health&ingr=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        console.log("Data pulled from new API: ", data.hints);
        setRecipes(data.hints);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
      };
    
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };

    // const setNutrients = e = => {
    //     displayNutrients(e);
    // };

    const displayNutrients = (nutrients) => {        
        if(!nutrients.length) return null;

        console.log("Nutrients data: ", nutrients);
        
        return recipes.map((nutrient, index) => {
            return(         
                       
                <div key={index} className="nutrientSection">
                    <p>{nutrient}</p>
                    {/* <p className="recipe">Recipe: <br />{recipe.recipe}</p> */}
                    {/* <p className="calories">Calories: {recipe.calories} | Weight: {recipe.totalWeight}</p> */}
                    {/* <p>Nutrients:  </p>                     */}
                    {/* <img className="image" src={recipe.image_url} alt="..."></img>                             */}
                </div>
            )
        });
    };

    return (
        <div className="HealthChoice">
            <div className="container">   
                <div className="row">
                    <form onSubmit={getSearch} className="search-form2">
                        <input placeholder="Search for any food item to analyze its data..." className="search-bar" type="text" value={search} onChange={updateSearch} />
                        <button className="search-button" type="submit">Search</button>
                    </form>
                    <div className="foodSection">
                        {recipes.map((recipe, index) => (
                            // <FoodSection 
                            
                            <div className="Item" key={index}>
                                {/* <p>key = {recipe.food.foodId}</p> */}
                                <h3 className="header">{recipe.food.label}</h3>
                                {/* <p>id = {recipe.food.foodId}</p> */}
                                {/* <p>brand = {recipe.food.brand}</p> */}
                                <p>Category: {recipe.food.category}</p>
                                <p>CategoryLabel: {recipe.food.categoryLabel}</p>
                                <p>Nutrients:  </p>
                                {/* {recipe.food.nutrients.map((recipe, index) => {
                                    return <li key={index}>{recipe.nutrients}</li>
                                })} */}
                                <div>
                                    {displayNutrients(recipe.food.nutrients)}
                                </div>
                                
                                <img className="image" src={recipe.food.image} alt="..."></img>                                
                                {/* <p>nutrients = {recipe.food.nutrients}</p> */}
                            </div>
                            // />
                        ))}
                    </div>
                    {/* {recipes.map((recipe, index) => (
                        <Recipe 
                        key={index}
                        title={recipe.recipe.label} 
                        calories={recipe.recipe.calories} 
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

// class FoodTrends extends React.Component {
//     render(){
//         return (
//             <h1>FoodTrends Page</h1>
//         )
//     }
// }

export default DietPage;