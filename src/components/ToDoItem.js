// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleMoveItemUp = (listItem) => {
        this.props.moveItemUpCallback(listItem);
    }

    handleMoveItemDown = (listItem) =>{
        this.props.moveItemDownCallback(listItem);
    }

    handleDeleteItem = (listItem) =>{
        this.props.deleteItemCallback(listItem);
    }

    handleTask= (listItem) =>{
        let listItemTask = document.getElementById('todo-list-item-task-' + listItem.id);
        this.props.changeTaskCallback(listItem,listItem.description,listItemTask.innerText);
    }

    handleChangeDueDate = (listItem) =>{
        let workspace = this;
        let listItemDueDate = document.getElementById('todo-list-item-due-date-' + listItem.id);
        let tempElement = listItemDueDate;
        let inputDueDate = document.createElement("input");
        inputDueDate.type = "date"
        listItemDueDate = inputDueDate;
        document.getElementById('todo-list-item-' + listItem.id).replaceChild(listItemDueDate,tempElement);
        listItemDueDate = document.getElementsByTagName("input")[0];           
        listItemDueDate.addEventListener('focusout',function(){
            let dateStr = listItemDueDate.value;
            if(dateStr.localeCompare("")===0){

            }else{
                listItem.due_date = dateStr;
                workspace.props.changeDueDateCallback(listItem,listItem.due_date,dateStr);
            }
            
            
        });
        listItemDueDate.focus();
    }

    handleStatus = (listItem) =>{
        let workspace = this;
        let listItemStatus = document.getElementById('todo-list-item-status-' + listItem.id);
        let tempElement = listItemStatus;
                let dropDown = document.createElement("div");
                dropDown.id = "status-select";
                dropDown.className = "status-col";
                let status = ["complete","incomplete"];
                let select = document.createElement("select");
                select.id = "selected-value"
                for(const val of status){
                    let option = document.createElement("option");
                    option.value=val;
                    option.text = val;
                    select.appendChild(option);
                }
                dropDown.appendChild(select);
                listItemStatus = dropDown;
                document.getElementById('todo-list-item-' + listItem.id).replaceChild(listItemStatus,tempElement);
                listItemStatus.addEventListener("focusout",function(){               
                    let test = document.getElementById("selected-value");
                    let option = test.value;
                    var compareStr = option.localeCompare(listItem.status);
                    if(compareStr != 0){
                        workspace.props.changeStatusCallback(listItem,option,listItem.status);   
                    }
                });
                listItemStatus.focus();
        this.props.changeStatusCallback(listItem);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";


        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                <div 
                 id ={'todo-list-item-task-' + listItem.id}
                 className='item-col task-col'
                 contentEditable='true'
                 onBlur={()=>this.handleTask(listItem)}>{listItem.description}</div>

                <div 
                    id ={'todo-list-item-due-date-' + listItem.id}
                    className='item-col due-date-col'
                   onClick={()=>this.handleChangeDueDate(listItem)} >{listItem.due_date}</div>
                <div
                    id ={'todo-list-item-status-' + listItem.id} 
                    className='item-col status-col' className={statusType}
                    onClick={()=>this.handleStatus(listItem)}>{listItem.status}</div>
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' 
                                    onClick={()=>this.handleMoveItemUp(listItem)}/>
                    <KeyboardArrowDown className='list-item-control todo-button' 
                                    onClick ={()=>this.handleMoveItemDown(listItem)}/>
                    <Close className='list-item-control todo-button' 
                                    onClick ={()=>this.handleDeleteItem(listItem)}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;