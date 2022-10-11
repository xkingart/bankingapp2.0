

const ensureAuthenticated = (req, resp, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return resp.status(403).send('Cannot access this endpoint')
}

module.exports = (app, Models) => {

    const { User, Person, Account } = Models

    

    // Register User
    app.get('/api/user', (req, res) => res.send(req.session.passport));

    app.post('/api/user', async (req, res) => {
        try {
            await User.register({ username: req.body.username, active: true }, req.body.password)
            res.status(201).send()
        } catch(e) {
            res.status(400).send(e.message)
        }
        
    })

    // Person
    app.get('/api/person', ensureAuthenticated, async (req, resp) => {
        const username = req.session?.passport?.user
        const person = await Person.findOne({ username }).exec()
        if (person) {
            resp.status(200).send(person)
        } else {
            resp.status(404).send()
        }
    })
    app.post('/api/person', ensureAuthenticated, async (req, resp) => {
        const username = req.session?.passport?.user
        const person = new Person({ ...req.body, username })
        await person.save()
        resp.status(201).send(person)
    })


    // Bank Account
    app.get('/api/account', ensureAuthenticated, async (req, resp) => {
        const username = req.session?.passport?.user
        const accounts = await Account.find({ username }).exec()
        if (accounts && accounts.length) {
            resp.status(200).send(accounts)
        } else {
            resp.status(404).send()
        }
    })
    app.post('/api/account', ensureAuthenticated, async (req, resp) => {
        const username = req.session?.passport?.user
        const account = new Account({ ...req.body, username })
        await account.save()
        resp.status(201).send(account)
    })
    app.patch('/api/account/:id', ensureAuthenticated, async (req, resp) => {
        const username = req.session?.passport?.user
        const account = await Account.findOne({ username, _id: req.params.id }).exec()
        if (account) {
            await account.update({ ...req.body })
            resp.send(account)
        } else {
            resp.status(404).send()
        }
        
    })
} 