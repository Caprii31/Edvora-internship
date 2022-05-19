import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trip from './trip'

class PastTrips extends Component {
    
    
    render() { 

        const{pastRides, user,city,state,handleFilter} = this.props
 

       
        return ( 
            <div className="past-trips">
                {
                     handleFilter(pastRides,state,city).map(ride => (
                        <div className="ride" key={ride.uID}>
                                <Trip ride={ride} user={user} />
                        </div>
                    ))
                }
            </div>
         );
    }
}


function mapStateToProps({user , rides}){
    return{
        user
    }
}
 
export default connect(mapStateToProps)(PastTrips);