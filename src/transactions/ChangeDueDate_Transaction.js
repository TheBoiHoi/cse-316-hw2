'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel,item,newDate,oldDate) {
        super();
        this.model = initModel;
        this.changedItem = item;
        this.newDueDate = newDate;
        this.oldDueDate = oldDate;
    }

    doTransaction() {
        this.changedItem.setDueDate(this.newDueDate);
        this.model.view.viewList(this.model.currentList);
    }

    undoTransaction() {
        this.changedItem.setDueDate(this.oldDueDate);
        this.model.view.viewList(this.model.currentList);
    }
}