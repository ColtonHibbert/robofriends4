import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants.js';


export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text   
})

export const requestRobots = () => (dispatch) => {
    // higher order function, function returns a function
    // dispatch gets passed in because its an arrow function 
    // and requestRobots called from inside our mapDispatchToProps 
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data}))
    .catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}))
}
