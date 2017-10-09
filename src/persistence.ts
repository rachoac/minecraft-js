export class Persistence {
    users
    transactions

    constructor() {
        this.addUser = this.addUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.addTransaction = this.addTransaction.bind(this)

        this.users = {
            items: {},
            sort: [],
        }
        this.transactions = {
            items: {},
            sort: []
        }
    }

    addUser(newUser) {
        const users = this.users
        //const exampleUser = { "username": "shinds", "name": "Siggy Hinds", "password" : "oOs", "role": "basic user", "transactions": []};
        
        //add new user object with key equal to newUser.username to the existing object of users.
        const newItems = {...users.items,[newUser.username]: newUser}
        //sort user names
        const sortedUserNames = Object.keys(newItems).sort();
        //can chain map and reduce methods 
        const newUsersObject = sortedUserNames
        // 1. transform sorted user name strings to user objects
        .map(name => newItems[name])
        // 2. reduce the array of objects into a single object where the keys of each object is equal to the object.username
        .reduce( 
            (acc, item) => 
            ({...acc, [item.username]: item }), 
            {}
        )
        // 3.
        //create a new database where the user objects are stored as items and the sorted list of user names is stored as sort
        this.users = {"items": newUsersObject, "sort": sortedUserNames}
    }

    getUsers() {
        return this.users
    }
    getUserById(userId){
        return this.users[userId]
    }
    getTransactionById(transactionId){
        return this.transactions[transactionId];
    }
    getAllUserTransactionsByUserId(userId){
        const transactionIdList = this.getUserById(userId);
        return transactionIdList.map(transactionId => this.getTransactionById);
    }

    addTransaction(newTransaction){
        // const exampleTransaction = { "id": "20170926PerhapsSomeRandomText", "user": "shinds", "date":"20170926", "type": "snacks", "description": "I got some good snacks", "amount": 7.99};
        const transactions = this.transactions
        //add new Transaction object with key equal to newTransaction.id to the existing object of all transactions.
        const newItems = {...transactions.items, [newTransaction.id]: newTransaction}
        //sort transactions by key descending (assuming key will start with date)
        const sortedKeys = Object.keys(newItems).sort().reverse();
        //can chain map and reduce methods 
        const newTransactionsObject = sortedKeys
        // 1. transform sorted user name strings to user objects
        .map(key => newItems[key])
        // 2. reduce the array of objects into a single object where the keys of each object is equal to the object.id
        .reduce( 
            (acc, item) => 
            ({...acc, [item.id]: item }), 
            {}
        )
        // 3.set the transactions database with updated information
     this.transactions = {"items": newTransactionsObject, "sort": sortedKeys}
     const oldTransactions = this.users.items[newTransaction.user].transactions
     //update the user profile such that the user keeps track of the newly added transactionm
     this.users.items[newTransaction.user].transactions = [...oldTransactions, newTransaction.id];
    }
    getTransactions(){
        return this.transactions

    }
}
