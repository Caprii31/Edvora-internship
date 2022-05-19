import React, { Component } from 'react';
import { connect } from 'react-redux';

class Trip extends Component {

    render() { 
        //variables
        const { ride , user } = this.props
        const stationPath = ride.station_path
        const rideDate = new Date(ride.date)
        const tripDistance = Math.abs(ride.distance.nearestPoint - user.station_code)

        
       

        


        return ( 
            <div className="trip">

                <div className="left-side-trip">

                    <img src={ride.map_url} alt="" />
                    <div className="ride-info">
                        <p>ride id : <span>{ride.id}</span></p>
                        <p>origin station : <span>{ride.origin_station_code}</span></p>
                        <p>station path : <span>[{stationPath.join(', ')}]</span></p>
                        <p>date : <span>{rideDate.toDateString()}</span></p>
                        <p>distance : <span>{tripDistance}</span></p>
                    </div>


                </div>   
        
            </div>
         );
    }
}
 
function mapStateToProps({rides , user}){
    return {
        user, 
        rides
    }
}

export default connect(mapStateToProps)(Trip);