import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BsFilterLeft } from 'react-icons/bs'
import Navbar from './navbar'
import Nearest from './nearest'
import PastTrips from './pastTrips'
import Upcoming from './upcoming'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom' 


class Dashboard extends Component {
    
    state = {
      city : '',
      rideState: '',
    }


// ---------------- handle filter "city" 'state' --------- //

    handleFilter = function (rides,state,city){
       if(state !== ''){
          rides = rides.filter(ride => ride.state === state)
          if(city !== ''){
              rides = rides.filter(ride => ride.city === city)
          }
      }else if (city !== ''){
          rides = rides.filter(ride => ride.city === city)
      }

      return rides
    }


    handleCity = function (e){
      e.preventDefault()
      this.setState(() => ({
        city: e.target.value
      }))
    }


    handleState = function (e,rides){
      e.preventDefault()
      this.setState({
        rideState: e.target.value
      })
    }

     

    

    render() { 
// ------------ Main variables --------------- //
        const { rides, user } = this.props
        console.log('dashboard component props', this.props)
        let cities = [...rides].map(ride => ride.city)
        cities = new Set(cities)
        let states = [...rides].map(ride => ride.state)
        states = new Set(states)

        // ------------ handle nearest Trips --------------// 


        let results = []
        function loopOnRides (rides) {
            rides.forEach((ride,i) =>{
                const destPathCode = ride.destination_station_code;
                let nearestPath = searchNearestRides(ride.station_path,user.station_code);
                ride.distance = nearestPath
                nearestPath.nearestPoint =  getClosestPoint([searchNearestRides(ride.station_path,user.station_code).nearestPoint,destPathCode],user.station_code);
                const tempRide = {
                    index:(nearestPath.nearestPoint === destPathCode) ? (ride.station_path.length) : nearestPath.index,
                    nearestPathCode: nearestPath.nearestPoint,
                    id: ride.uID
                }
                results.push(tempRide)
            })
            return results
        }
        
        function searchNearestRides( stationPaths,target){
            return {nearestPoint:binarySearch(stationPaths,target),
                index: stationPaths.indexOf(binarySearch(stationPaths,target))
            };
        }
        
        function binarySearch(arr,target){
            var midpoint = Math.floor(arr.length/2);
          
            if (arr[midpoint] === target){
              return arr[midpoint];
            }
            if (arr.length === 1){
              return arr[0];
            }
          
            if (arr[midpoint] > target){
              return binarySearch(arr.slice(0,midpoint),target);
            }else if (arr[midpoint] < target){
              return binarySearch(arr.slice(midpoint),target);
            }
        }
        
        function getClosestPoint(arr,target){
            
            const res1 = Math.abs(target - arr[0]);
            const res2 = Math.abs(target - arr[1]);
            return (res1 < res2) ? arr[0] : arr[1]
        
        }
        
        const tempResults = loopOnRides(rides)
        const sorted = tempResults.sort((a,b) => {
        
            const [a1, a2] = [a.index,a.nearestPathCode]
            const [b1, b2] = [b.index,b.nearestPathCode]
        
                if( a2 === b2 || Math.abs(a2-user.station_code) === Math.abs(b2-user.station_code)){
                    return a1 - b1
                }
        
                return Math.abs(a2-user.station_code) - Math.abs(b2-user.station_code)
            } 
        
        );
        
        
        const getRideById = (object, key, value) => {
          if (Array.isArray(object)) {
            for (const obj of object) {
              const result = getRideById(obj, key, value);
              if (result) {
                return obj;
              }
            }
          } else {
            if (object.hasOwnProperty(key) && object[key] === value) {
              return object;
            }
        
            for (const k of Object.keys(object)) {
              if (typeof object[k] === "object") {
                const o = getRideById(object[k], key, value);
                if (o !== null && typeof o !== 'undefined')
                  return o;
              }
            }
        
            return null;
          }
        }
        
        const nearestRidesList = sorted.map(item => getRideById(rides,'uID',item.id))
        console.log(sorted)

        function activeFilter (){
          const filterBox = document.querySelector('.filter__box')
          console.log(filterBox)
          filterBox.classList.toggle('active')
        }

        
      
    

        // ------------ handle nearest Trips --------------// 

        //------------------ handle past & upcomming Rides -------------------//

        let pastRides = [...rides].filter(ride => new Date(ride.date)*1000 < new Date()*1000)
        let upcoming = [...rides].filter(ride => new Date(ride.date)*1000 > new Date()*1000)

        //------------------ handle past & upcomming Rides -------------------//
        return ( 
            <div className='dashboard'>
               <Router>
                <Navbar /> 
                  <div className="trips-container">
                    <div className="trips-class">
                        <ul className="class-list">
                            <li className="class-item"><Link to='/'>nearest ride</Link></li>
                            <li className="class-item"><Link to='/upcoming'>upcoming ride</Link></li>
                            <li className="class-item"><Link to='/pastRides'>past ride</Link></li>
                        </ul>
                        <div className="filter" onClick={() => activeFilter()}>
                            <BsFilterLeft size={30} className='filter__icon'/>
                            <p className="rides__filter">filters</p>
                        </div>
                        <div className="filter__box">
                            <h4>filters</h4>
                            
                            <div className="filter__list rideState ">
                                <select name="rideStates" className="rideStates__list list" onChange={(e) => this.handleState(e)}>
                                    {['state',...states].map(rideState => (
                                        <option className="filter__item" key={rideState} value={rideState}>{rideState}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter__list city" >      
                              <select name="cities"  className="cities__list list" onChange={(e) => this.handleCity(e)}>
                                  {['city',...cities].map(city => (
                                      <option className="filter__item" key={city} value={city}>{city}</option>
                                  ))}
                              </select>
                            </div>
                        </div>
                          
                    </div>
                     <Switch>
                      <Route exact path='/'>
                        <Nearest  nearest={nearestRidesList} state={this.state.rideState} city={this.state.city} handleFilter={this.handleFilter} />
                      </Route>
                        
                      <Route exact path = '/pastRides'>
                        <PastTrips pastRides = {pastRides} state={this.state.rideState} city={this.state.city} handleFilter={this.handleFilter}/>
                      </Route>
                        {
                            upcoming.length === 0 ? <Route exact path='/upcoming'> <h4> there's no future rides </h4></Route> : <Route exact path='/upcoming'><Upcoming upcoming = {upcoming} state={this.state.rideState} city={this.state.city} handleFilter={this.handleFilter} /></Route>
                        }
                     </Switch>
                  </div>
                
               </Router>
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
 
export default connect(mapStateToProps)(Dashboard);