import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = '/api/user/'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateBalance,
    saveUser
}

async function query() {
    try {
        const res = await httpService.get(BASE_URL)
        return res.data
    } catch (error) {
        console.error('Error querying users:', error)
        throw error
    }
}

async function getById(userId) {
    try {
        const res = await httpService.get(`${BASE_URL}${userId}`)
        return res.data
    } catch (error) {
        console.error(`Error getting user by ID (${userId}):`, error)
        throw error
    }
}

async function login({ username, password }) {
    try {
        const res = await httpService.post('auth/login', { username, password })
        const user = res
        _setLoggedinUser(user)
        return user
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}

async function signup({ username, password, fullname }) {
    console.log(username)
    try {
        const user = { username, password, fullname, balance: 10000, activities: [], createdAt: Date.now(), updatedAt: Date.now() }
        const res = await httpService.post('auth/signup', user)
        const newUser = res

        console.log(newUser);

        _setLoggedinUser(newUser)
        return newUser
    } catch (error) {
        console.error('Error signing up:', error)
        throw error
    }
}

async function logout() {
    try {
        await httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (error) {
        console.error('Error logging out:', error)
        throw error
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, activities: user.activities, prefs: user.prefs }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}

async function updateBalance(diff) {
    const loggedInUser = getLoggedinUser()
    if (!loggedInUser) throw new Error('User not logged in')

    try {
        let user = await getById(loggedInUser._id)
        if (!user) throw new Error('User not found')

        user.balance += diff
        user = await saveUser(user)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
        return user.balance
    } catch (error) {
        console.error('Error updating balance:', error)
        throw error
    }
}

async function saveUser(userToEdit) {
    try {
        const res = await httpService.put(`${BASE_URL}${userToEdit._id}`, userToEdit)
        _setLoggedinUser(res.data)
        return res.data
    } catch (error) {
        console.error('Error saving user:', error)
        throw error
    }
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}
