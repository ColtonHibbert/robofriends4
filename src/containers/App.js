import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry.js';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  // receives a state, returns an object
  return {
    // ----searchField: state.searchField ----
    //for 1 reducer
    // state is what we receive , 
    // searchField is from our intialState object in reducers.js
    // connect passes the state to mapStateToProps I believe
    // which maps it to the component
    searchField: state.searchRobots.searchField, 
    // when mapping state with more than 1 reducer the 
    // state becomes props of our reducers so we need to  
    // to access it via the reducer specifically that has that key/value
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  //here onSearchChange is custom prop we made, it is a function
  // we need to return this key/prop  
  // connect passes dispatch to mapDispatchToProps
  onRequestRobots: () => dispatch(requestRobots())
  //replaces our componentDidMount() fetch request
  // we need the requestRobots action
  // because we return a function above redux thunk recognizes thsi

  

  // another possible option
  //---onRequestRobots: requestRobots(dispatch)
  // requestRobots needs dispatch method passed to it?? we
  // can do this because were inside the  MapDispatchToProps
  

  }
}

class App extends Component {
  // constructor not needed with redux because no more
  // traditional states 
  //constructor() {
  // super()
  // this.state = {
  //    robots: [],
  //  }
  //}

  componentDidMount() {
   // fetch("https://jsonplaceholder.typicode.com/users")
   // .then(response => response.json())
   //.then(users => this.setState({ robots: users}))
   this.props.onRequestRobots();
   //onRequestRobots: value is a function so we call it()
   //to do our fetch
  }

  
  render() {
    const {searchField, onSearchChange, robots, isPending } = this.props;
    // passed down as props from redux because connect mapped
    // the state as props and dispatch as props
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    if (isPending) {
      return <h1>Loading</h1>
    }
    else {
            return (
              <div className="tc">
              <h1 className="f1">RoboFriends</h1>
              <SearchBox searchChange={onSearchChange} />
              <Scroll>
                <ErrorBoundry>
                  <CardList robots={filteredRobots} />
                </ErrorBoundry>
              </Scroll>
              </div>
            )
          }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);