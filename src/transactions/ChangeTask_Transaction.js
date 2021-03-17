'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTask_Transaction extends jsTPS_Transaction {
    constructor(initModel,item,newTask,oldTask) {
        super();
        this.model = initModel;
        this.changedItem = item;
        this.newDescription = newTask;
        this.oldDescription = oldTask;
    }

    doTransaction() {
        this.changedItem.setDescription(this.newDescription);
        this.model.view.viewList(this.model.currentList);
    }

    undoTransaction() {
        this.changedItem.setDescription(this.oldDescription);
        this.model.view.viewList(this.model.currentList);
    }
}