import React from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Modal from "react-bootstrap/Modal";
// import ReactDOM from "react-dom";

import '../css/myrecipes.css';

library.add(faTrash);
library.add(faEdit);

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

    removeRecipe = (id) => {
        console.log("Id: ", id);
        if(window.confirm("Are you sure about deleting this recipe?")){
            axios.delete('http://localhost:8080/api/deleteRecipe/'+id)
            .then(response => {
                console.log('Recipe was deleted');
                this.getRecipes();
            })
            .catch((error) => {
                console.log("Error deleting...", error);
            })
        }
    }

    // editModal = (id) => {
    //     handleShow;
    //     const [show, setShow] = useState(false);

    //     const handleClose = () => setShow(false);
    //     const handleShow = () => setShow(true);
    //     return (
    //         <div>
    //         <>
    //             <button variant="primary" onClick={handleShow}>
    //             Launch demo modal
    //             </button>
            
    //             <Modal show={show} onHide={handleClose}>
    //                 <Modal.Header closeButton>
    //                     <Modal.Title>Modal heading</Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //                 <Modal.Footer>
    //                     <button variant="secondary" onClick={handleClose}>
    //                     Close
    //                     </button>
    //                     <button variant="primary" onClick={handleClose}>
    //                     Save Changes
    //                     </button>
    //                 </Modal.Footer>
    //             </Modal>
    //         </>
    //         </div>
    //     );
    // }

    displayRecipies = (recipes) => {        
        if(!recipes.length) return null;

        return recipes.map((recipe, index) => {
            return(         
                       
                <div key={index} className="section">
                    <div className="recipeSection">
                        <h3 className="name">{recipe.name}</h3>
                        <p className="recipe">Recipe: <br />{recipe.recipe}</p>
                        <p className="calories">Calories: {recipe.calories} | Weight: {recipe.totalWeight}</p>
                        
                        <img className="image" src={recipe.image_url} alt="..."></img>
                        <span className="buttons">
                            <FontAwesomeIcon className="faicons" 
                            icon="trash"
                            onClick={ () => {this.removeRecipe(recipe._id)}}                           
                            />
                            <FontAwesomeIcon className="faicons" 
                            icon="edit"
                            // onClick={ () => {this.editModal(recipe._id)}}                         
                            />
                        </span>
                    </div>
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