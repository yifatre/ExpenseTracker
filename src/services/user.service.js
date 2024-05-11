import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    getUsers
}


async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        return _setLoggedinUser(user)
    }
    catch (err) {
        return 'Invalid login' + err
    }
}

async function signup({ username, password, fullName }) {
    try {
        const userToSingUp = { username, password, fullName, isAdmin: false }
        const user = await httpService.post(BASE_URL + 'signup', userToSingUp)
        return _setLoggedinUser(user)
    }
    catch (err) {
        return 'Invalid signup' + err
    }
}


async function logout() {

    try {
        const user = await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    }
    catch (err) {
        return 'couldn\'t logout' + err
    }
}

function getById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedinUser() {
    const loggedinUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    if (loggedinUser) return loggedinUser
    else return null
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id, fullName: user.fullName, isAdmin: user.isAdmin || ''
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullName: ''
    }
}

async function getUsers() {
    return await httpService.get(`user`)
}