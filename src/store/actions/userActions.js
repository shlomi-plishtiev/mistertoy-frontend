import { userService } from "../../services/userService"
import { SET_USER } from "../reducers/user.reducer"
import { store } from "../store"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {

    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout', err)
        throw err
    }
}

export async function saveUser(user) {
    try {
        const updatedUser = await userService.saveUser(user)
        store.dispatch({ type: SET_USER, user: updatedUser })
        return updatedUser
    } catch (err) {
        console.error('user actions -> Cannot update user', err)
        throw err
    }
}
