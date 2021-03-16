// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleCloseList = () =>{
        this.props.closeToDoListCallback();
    }

    handleAddNewItem = () => {
        this.props.addNewItemCallback();
    }

    handleDeleteCurrentList = () =>{
        this.props.deleteCurrentListCallback();
    }

    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" 
                                onClick = {this.handleAddNewItem}/>
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" 
                                onClick = {this.handleDeleteCurrentList}/>
                            <div id="delete-list-modal" class="modal">
                                <div class="delete-list-modal-content">
                                <span class="close">&times;</span>
                                <h3>Delete Current List?</h3>
                                <div class="delete-list-modal-button-yes">Confrim</div>
                                <div class="delete-list-modal-button-no">Cancel</div>
                                </div>
                            </div>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" 
                                onClick = {this.handleCloseList}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            moveItemUpCallback ={this.props.moveItemUpCallback} // PASS THE ITEM TO THE CHILDREN
                            moveItemDownCallback={this.props.moveItemDownCallback}
                            deleteItemCallback={this.props.deleteItemCallback}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;