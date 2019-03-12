import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants.js';

const initialStateSearch = {
    searchField: ''
}

export const searchRobots = (state=initialStateSearch, action={}) => {
    // reducer takes the state and an action
    // state = default of initial state, or what we pass into the reducer
    // actions are just objects, default is an empty object
    switch(action.type) {
        //can have multiple cases and actions that act upon searchRobots reducer
        case CHANGE_SEARCH_FIELD:
        return Object.assign({}, state, {searchField: action.payload});
        // creates an object, assigns all key/value props from state, then also adds or modifies searchField
        // or can do { ...state, searchField: action.payload }
        // also returns an object with the all the state key/values and then modifies searchField
        default: 
        return state;
    }
}

const initialStateRobots = {
    isPending: false,
    robots: [],
    error: ""
}

export const requestRobots = (state=initialStateRobots, action = {}) => {
    switch(action.type) {
        case REQUEST_ROBOTS_PENDING:
            return Object.assign({}, state, { isPending: true})
        case REQUEST_ROBOTS_SUCCESS:
            return Object.assign({}, state, { robots: action.payload, isPending: false})
        case REQUEST_ROBOTS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false })
        default: 
            return state;
        }
}