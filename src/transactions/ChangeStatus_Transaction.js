'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initApp,item,newStatus,oldStatus) {
        super();
        this.currentAPP = initApp;
        this.changeItem = item;
        this.newStatus = newStatus;
        this.oldStatus = oldStatus;
    }

    doTransaction() {
        this.changeItem.status = this.newStatus;
    }

    undoTransaction() {
        this.changeItem.status = this.oldStatus;
    }
}