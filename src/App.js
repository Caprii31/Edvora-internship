import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared'
import Dashboard from './components/dasboard'
import { getFullRides } from './utils/Data'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  
  render() { 
      console.log('App component props: ', this.props)
    return ( 
      <div>
        {
          this.props.rides.length  > 0 && <Dashboard />
        }
      </div>
     );
  }
}

function mapStateToProps({rides , user}){
  return {
    rides,
    user
  }
}

 
export default connect(mapStateToProps)(App);
