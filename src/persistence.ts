import * as fs from 'fs-extra'

export class Persistence {
    constructor() {
        this.getScript = this.getScript.bind(this)
        this.init = this.init.bind(this)
    }

    init() {
        if (!fs.existsSync('scripts')) {
            fs.mkdirSync('scripts')
        }
    }

    getScript(user, script) {
        const raw = fs.readFileSync(`scripts/${user}/${script}`)
        return raw.toString('ascii')
    }

    saveScript(user, script, body) {
        const userDir = `scripts/${user}`
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir)
        }
        fs.writeFileSync(`${userDir}/${script}`, body)
    }

    saveAsPlugin(user, script) {
        const SERVER_HOME = process.env.SERVER_HOME

        fs.copy(`scripts/${user}/${script}`, `${SERVER_HOME}/plugins/custom/${script}`, function (err) {
            if (err)
                return console.error(err)
        })
    }

}
