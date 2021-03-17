'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeListName_Transaction extends jsTPS_Transaction {
    constructor(initModel,list,newName,oldName) {
        super();
        this.model = initModel;
        this.changedList = list;
        this.newListName = newName;
        this.oldListName = oldName;
    }

    doTransaction() {
        this.changedList.setName(this.newListName);
        this.model.view.refreshLists(this.model.toDoLists);
        this.model.view.viewList(this.model.currentList);
    }

    undoTransaction() {
       this.changedList.setName(this.oldListName);
       this.model.view.refreshLists(this.model.toDoLists);
       this.model.view.viewList(this.model.currentList);
    }
}