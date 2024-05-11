// import { userService } from "../services/user.service.js"
import { expenseReducer } from "./reducers/expense.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

import { createStore, combineReducers, compose } from 'redux'

const rootReducer = combineReducers({
    expenseModule: expenseReducer,
    userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
