import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';
import axios from 'axios';

import '../css/checklist.css';

library.add(faTrash);
library.add(faEdit);

class CheckList extends React.Component {

    state = {
        _id: '',
        body: '',
        notes: []
    };

    componentDidMount = () => {
        this.getNotes();
    }

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ body: value });
    };

    //function used to get notes from mongo database
    getNotes = () => {
        axios.get('http://localhost:8080/api/notes')
            .then((response) => {
                const data = response.data;
                this.setState({ notes: data });
                console.log('Data received from database');
            })
            .catch(() => {
                console.log('Error receiving data...');
            });
    };

    editModal = () => {

    }

    //function used to display notes in checklist
    displayNotes = (notes) => {        
        if(!notes.length) return null;

        return notes.map((note) => {
            return(         
                       
                <div key={note._id} className="list">
                    <p>
                         <li id={note._id}>
                            {note.body}
                            <span>
                                <FontAwesomeIcon className="faicons" 
                                icon="trash"
                                onClick={ () => {this.removeNote(note._id)}}                           
                                />
                                {/* <FontAwesomeIcon className="faicons" 
                                icon="edit"
                                onClick={ () => {this.editModal(note._id)}}                     
                                /> */}
                            </span>
                        </li>
                    </p>
                </div>
            )
        });
    };

    //function used to remove a note from the list
    removeNote(id){
        // console.log("You clicked me...", id);
        if(window.confirm("Are you sure about deleting this item?")){
            axios.delete('http://localhost:8080/api/deleteNote/'+id)
            .then(response => {
                console.log('Note was deleted');
                this.getNotes();
            })
            .catch((error) => {
                console.log("Error deleting...", error);
            })
        }
    }    

    //function used to add notes to the checklist
    submit = (event) => {
        event.preventDefault();

        const payload = {
            body: this.state.body
        };

        axios({
            url: 'http://localhost:8080/api/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.resetUserInputs();
                this.getNotes();
            })
            .catch(() => {
                console.log('Internal server error');
            });
    };

    resetUserInputs = () => {
        this.setState({
            body: ''
        });
    };


    
    render(){
        
        return (
            <div className="CheckList">
                
                <header>
                    <form id="to-do-form" onSubmit={this.submit}>
                        <input 
                            type="text"
                            name="newNote"
                            placeholder="Enter item: "
                            value={this.state.body}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Add Item</button>
                    </form>
                    <div>
                        <FlipMove duration={300} easing="ease-in-out">
                            <div className="notes">
                                {this.displayNotes(this.state.notes)}
                            </div>
                        </FlipMove>            
                    </div>
                </header>
                
            </div>
        );
    }
}

export default CheckList;