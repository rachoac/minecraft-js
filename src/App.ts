import * as express from 'express'
import { Persistence } from './persistence'
import * as bodyParser from 'body-parser'

class App {
  public express
  persistence

  constructor () {
    this.express = express()
    this.express.use(bodyParser.json());
    
    this.mountRoutes()

    this.persistence = new Persistence()
  }

  private mountRoutes (): void {
    const router = express.Router()

    //MAIN 
    router.get('/', (req, res) => {
      res.json({"I'm working": "Checkout /users"});
    })       
    // GET USERS
    router.get('/users', (req, res) => {
      res.json(this.persistence.getUsers());
    })

    // CREATE USER
    router.post('/users', (req, res) => {
      const newUser = req.body
      console.log("----->", newUser)
      res.json(this.persistence.addUser(newUser));
    })
    // GET TRANSACTIONS
    router.get('/transactions', (req, res) => {
      res.json(this.persistence.getTransactions());
    })

    // CREATE TRANSACTION
    router.post('/transactions', (req, res) => {
      const newTransaction = req.body
      console.log("----->", newTransaction)
      res.json(this.persistence.addTransaction(newTransaction));
    })
    this.express.use('/', router)
  }
}

export default new App().express
