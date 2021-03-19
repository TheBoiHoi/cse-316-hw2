'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initApp,item,newDate,oldDate) {
        super();
        this.currentAPP = initApp;
        this.changeItem = item;
        this.newDueDate = newDate;
        this.oldDueDate = oldDate;
    }

    doTransaction() {
        this.changeItem.due_date = this.newDueDate;
        this.currentAPP.setState({

        });
    }

    undoTransaction() {
        this.changeItem.due_date = this.oldDate;
        this.currentAPP.setState({

        });
    }
}