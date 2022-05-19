import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trip from './trip'

class UpcomingRides extends Component {
    
    
    render() { 

        const{upcoming, user, state,city,handleFilter} = this.props
 

       
        return ( 
            <div className="upcoming-trips">
                {
                     handleFilter(upcoming,state,city).map(ride => (
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
 
export default connect(mapStateToProps)(UpcomingRides);