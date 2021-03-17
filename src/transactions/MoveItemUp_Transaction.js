'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemIndex) {
        super();
        this.model = initModel;
        this.index = itemIndex;
    }

    doTransaction() {
        this.model.moveItemUp(this.index);
        this.model.view.viewList(this.model.currentList);
    }

    undoTransaction() {
        this.model.moveItemDown(this.index-1);
        this.model.view.viewList(this.model.currentList);
    }
}