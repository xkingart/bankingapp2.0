import axios from 'axios'

export default class API {
    _axios = null

    static _client = null
    static client(base) {
        if (!API._client) {
            API._client = new API(base || process.env.REACT_APP_API)
        }
        return API._client
    }

    constructor(baseURL) {
        this._axios = axios.create({
            baseURL,
            withCredentials: true,
        });
    }

    async login({ username, password }) {
        await this._axios.post('/session/login', { username, password })
    }

    async logout() {
        await this._axios.post('/session/logout')
    }

    async signup(signup) {
        const { username, password, ...person } = signup
        const credentials = { username, password }
        await this._axios.post('/api/user', credentials)
        await this.login(credentials)
        await this._axios.post('/api/person', person)
    }

    async getUser() {
        const response = await this._axios.get('/api/user')
        return response.data
    }

    async getPerson() {
        const response = await this._axios.get('/api/person')
        return response.data
    }

    async getAccounts() {
        const response = await this._axios.get('/api/account')
        return response.data
    }

    async postAccount(account) {
        const response = await this._axios.post('/api/account', account)
        return response.data
    }

    async patchAccount(id, account) {
        const response = await this._axios.patch(`/api/account/${id}`, account)
        return response.data
    }
}