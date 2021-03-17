'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel,item,newStatus,oldStatus) {
        super();
        this.model = initModel;
        this.changedItem = item;
        this.newStat = newStatus;
        this.oldStat = oldStatus;
    }

    doTransaction() {
        this.changedItem.setStatus(this.newStat);
        this.model.view.viewList(this.model.currentList);
    }

    undoTransaction() {
        this.changedItem.setStatus(this.oldStat);
        this.model.view.viewList(this.model.currentList);
    }
}