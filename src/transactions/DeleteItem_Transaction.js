'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initModel,item) {
        super();
        this.model = initModel;
        this.removedItem = item
    }

    doTransaction() {
       this.model.removeItemFromList(this.removedItem);
       this.model.view.viewList(this.model.currentList);

    }

    undoTransaction() {
        this.model.addItemToCurrentList(this.removedItem);
        this.model.view.viewList(this.model.currentList);
    }
}