'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.currentAPP = initApp;
    }

    doTransaction() {
        this.itemAdded = this.currentAPP.addNewItem();
    }

    undoTransaction() {
        this.currentAPP.deleteItem(this.itemAdded);
    }
}