import * as express from 'express'
import {Persistence} from './persistence'
import * as bodyParser from 'body-parser'

class App {
    public express
    persistence

    constructor() {
        this.express = express()
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json());

        this.mountRoutes()

        this.persistence = new Persistence()
        this.persistence.init()
    }

    private mountRoutes(): void {
        const router = express.Router()

        router.get('/script/:user/:script', (req, res) => {
            const scriptName = req.query.scriptName
            const { script, user } = req.params
            const raw = this.persistence.getScript(user, script)
            const toSend = `var ${scriptName} = function() { ${raw} }`

            res.setHeader('Content-type', 'text');
            res.send(new Buffer(toSend))
        })

        router.post('/script/:user/:script', (req, res) => {
            const JS_SECRET = process.env.JS_SECRET
            const { secret } = req.query

            const { script, user } = req.params
            if (secret !== JS_SECRET) {
                console.log("Bad secret!")
                res.status(401)
                res.send('Rejected')
                return
            }
            const raw = req.body.script.replace(' ', '+')
            let body = Buffer.from(raw, 'base64').toString('ascii')
            if (body.indexOf('/js ') === 0) {
                body = body.split('/js ')[1]
            }
            console.log("TEXT",body);

            res.send(this.persistence.saveScript(user, script, body))
        })

        router.get('/plugin/:user/:script', (req, res) => {
            const JS_SECRET = process.env.JS_SECRET
            const { secret } = req.query

            const { script, user } = req.params
            if (secret !== JS_SECRET) {
                console.log("Bad secret!")
                res.status(401)
                res.send('Rejected')
                return
            }

            this.persistence.saveAsPlugin(user, script)
            res.send("done")
        })

        this.express.use('/', router)
    }
}

export default new App().express
