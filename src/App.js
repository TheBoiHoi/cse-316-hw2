// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction';
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction';
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction';
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction';
import ChangeTask_Transaction from './transactions/ChangeTask_Transaction';
import ChangeDueDate_Transaction from './transactions/ChangeDueDate_Transaction';
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction';

import transitions from '@material-ui/core/styles/transitions';
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    
    // ALWAYS DO THIS FIRST
    super(props);
    // DISPLAY WHERE WE ARE
    console.log("App constructor");
    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    

    // SETUP OUR APP STATE
    this.state = {

      isListOpen: false,
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);
    this.tps.clearAllTransactions();
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id,
    );
    nextLists.unshift(toDoList);

    if(this.state.isListOpen){
      let test = document.getElementsByClassName("todo_button-active");
      test[0].classList.remove("todo_button-active");
    }
    let activeList = document.getElementById(toDoList.id);
    activeList.classList.add("todo_button-active");

    document.getElementById("add-list-button").classList.add("button-black");

    document.getElementById("undo-button").classList.remove("button-close");
    document.getElementById("redo-button").classList.remove("button-close");
    document.getElementById("add-item-button").classList.remove("button-close");
    document.getElementById("delete-list-button").classList.remove("button-close");
    document.getElementById("close-list-button").classList.remove("button-close");

  

    this.setState({
      isListOpen: true,
      toDoLists: nextLists,
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
  }

  addNewList = () => {
    if(this.state.isListOpen==false){
      let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
    } 
  }

  addItemToCurrentList = (item) => {
    if(this.state.isListOpen){
      let newCurrentList = [item,...this.state.currentList.items];
      this.state.currentList.items = newCurrentList;
      this.setState({
        nextListItemId: this.state.nextListItemId+1,
      },this.afterToDoListsChangeComplete);
    }
  }
  

  makeNewToDoList = () => {
    let nextId = this.state.nextListId;
    let newToDoList = {
      id: nextId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let nextId = this.state.nextListItemId;
    let newToDoListItem = {
      id: nextId,
      description: "No Description",
      dueDate: 'none',
      status: "incomplete"
    };
    return newToDoListItem;
  }

  
  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  getItemIndexFromCurrentList = (listItem) =>{
    let itemIndex;
    for(let i = 0; i < this.state.currentList.items.length;i++){
      if(listItem.id == this.state.currentList.items[i].id){
        itemIndex = i;
      }
    }
    return itemIndex;
  }


  moveItemUp = (listItem) => {
   let itemIndex = this.getItemIndexFromCurrentList(listItem);
   if(itemIndex > 0){
      let tempItem = this.state.currentList.items[itemIndex-1];
      this.state.currentList.items[itemIndex-1] = this.state.currentList.items[itemIndex];
      this.state.currentList.items[itemIndex] = tempItem;
      this.setState({
      }, this.afterToDoListsChangeComplete)
   }
  };

  moveItemDown = (listItem) => {
  let itemIndex = this.getItemIndexFromCurrentList(listItem);
   if(itemIndex < this.state.currentList.items.length-1){
      let tempItem = this.state.currentList.items[itemIndex+1];
      this.state.currentList.items[itemIndex+1] = this.state.currentList.items[itemIndex];
      this.state.currentList.items[itemIndex] = tempItem;
      this.setState({
        
      }, this.afterToDoListsChangeComplete)
   }
  };

  deleteItem = (listItem) => {
   let itemIndex = this.getItemIndexFromCurrentList(listItem);
   this.state.currentList.items.splice(itemIndex,1);
   this.setState({
        
  }, this.afterToDoListsChangeComplete)
  };
  
  closeToDoList = () =>{

    if(this.state.isListOpen){
      let test = document.getElementsByClassName("todo_button-active");
    test[0].classList.remove("todo_button-active");
    }
    
    document.getElementById("undo-button").classList.add("button-close");
    document.getElementById("redo-button").classList.add("button-close");
    document.getElementById("add-item-button").classList.add("button-close");
    document.getElementById("delete-list-button").classList.add("button-close");
    document.getElementById("close-list-button").classList.add("button-close");

    document.getElementById("add-list-button").classList.remove("button-black");
    this.setState({
      isListOpen:false,
      currentList: {items: []}
    }, this.afterToDoListsChangeComplete)
  }


  addNewItem = () =>{
    if(this.state.isListOpen){
      let newItem = this.makeNewToDoListItem();
      let newCurrentList = [newItem,...this.state.currentList.items];
      this.state.currentList.items = newCurrentList;
      this.setState({
        nextListItemId: this.state.nextListItemId+1,
      },this.afterToDoListsChangeComplete);
      return newItem;
    }
    
  }

  deleteCurrentList = () =>{
    let thisApp = this;
    if(this.state.isListOpen){
        let modal = document.getElementById("delete-list-modal");

        var close = document.getElementsByClassName("close")[0];
    
        var confrim =document.getElementsByClassName("delete-list-modal-button-yes")[0];
    
        var cancel = document.getElementsByClassName("delete-list-modal-button-no")[0];
               
        modal.style.display = "block";
    
        confrim.onclick = function(){
          thisApp.state.toDoLists.shift();
          thisApp.setState({
            currentList: {items: []}
          },thisApp.afterToDoListsChangeComplete)
          modal.style.display="none";
          document.getElementById("undo-button").classList.add("button-close");
          document.getElementById("redo-button").classList.add("button-close");
          document.getElementById("add-item-button").classList.add("button-close");
          document.getElementById("delete-list-button").classList.add("button-close");
          document.getElementById("close-list-button").classList.add("button-close");
          document.getElementById("add-list-button").classList.remove("button-black");
        }
    
        cancel.onclick = function(){
          thisApp.setState({});
          modal.style.display="none";
        }
    
        close.onclick = function(){
          thisApp.setState({});
          modal.style.display="none";
        }
      }
  }

  redo= () => {
    if (this.tps.hasTransactionToRedo()) {
        this.tps.doTransaction();
    }
  }
  
  undo= () =>  {
    if (this.tps.hasTransactionToUndo()) {
        this.tps.undoTransaction();
    }
} 

  addNewItemTransaction= () =>{
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  moveItemUpTransaction=(item)=>{
    let transaction = new MoveItemUp_Transaction(this,item);
    this.tps.addTransaction(transaction);
  }

  moveItemDownTransaction=(item)=>{
    let transaction = new MoveItemDown_Transaction(this,item);
    this.tps.addTransaction(transaction);
  }

  deleteItemTransaction=(item)=>{
    let transaction = new DeleteItem_Transaction(this,item);
    this.tps.addTransaction(transaction);
  }

  changeDueDateTransaction=(item,oldDate,newDate)=>{
    let transaction = new ChangeDueDate_Transaction(this,item,newDate,oldDate);
    this.tps.addTransaction(transaction);    
    this.setState({
      
    }, this.afterToDoListsChangeComplete);
  }

  changeStatusTransaction=(item,newStatus,oldStatus)=>{
    let transaction = new ChangeStatus_Transaction(this,item,newStatus,oldStatus);
    this.tps.addTransaction(transaction);    
    this.setState({
      
    }, this.afterToDoListsChangeComplete);
  }

  changeTask_Transaction=(item,oldTask,newTask)=>{
    let transaction = new ChangeTask_Transaction(this,item,oldTask,newTask);
    this.tps.addTransaction(transaction);
    this.setState({
      
    }, this.afterToDoListsChangeComplete);
  }

  editeListName = (toDoList) =>{
    let app = this;
    let toDoListElements = document.getElementById(toDoList.id);
    toDoListElements.contentEditable = true;
    toDoListElements.addEventListener('focusout',function(){
      toDoList.name=toDoListElements.innerText;
      toDoListElements.contentEditable = false;
      app.setState({
      
      }, app.afterToDoListsChangeComplete);
    });
    
  }

  render() {
    let items = this.state.currentList.items;
    let app = this;
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'z') {
        app.undo();
      }
    });
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'y') {
        app.redo();
      }
    });
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          editeListNameCalllback={this.editeListName}
        />
        <Workspace toDoListItems={items} 
          moveItemUpCallback={this.moveItemUpTransaction}
          moveItemDownCallback={this.moveItemDownTransaction}
          deleteItemCallback={this.deleteItemTransaction}

          changeDueDateCallback={this.changeDueDateTransaction}
          changeStatusCallback={this.changeStatusTransaction}
          changeTaskCallback={this.changeTask_Transaction}

          closeToDoListCallback={this.closeToDoList}
          addNewItemCallback={this.addNewItemTransaction}
          deleteCurrentListCallback={this.deleteCurrentList}
          
          redoCallback={this.redo}
          undoCallback={this.undo}/>

      </div>
    );
  }
}

//test again
 
export default App;