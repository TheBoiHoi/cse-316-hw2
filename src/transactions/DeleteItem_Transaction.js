'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initApp,item) {
        super();
        this.currentAPP = initApp;
        this.changedItem = item;
    }

    doTransaction() {
        this.currentAPP.deleteItem(this.changedItem);
    }

    undoTransaction() {
        this.currentAPP.addItemToCurrentList(this.changedItem); 
    }
}
