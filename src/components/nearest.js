import React, { Component } from 'react';
import Trip from './trip'
import { connect } from 'react-redux'

class Nearest extends Component {

    
    

    
    render() { 

        let {nearest , user, city,state,handleFilter} = this.props
        console.log(this.props)
        

       



      console.log('nearest component props : ',this.props)
       
        return ( 
            <div>
               <div className="nearest-rides">
                    {
                         handleFilter(nearest,state,city).map((ride) => (
                            <div className="ride" key={ride.uID}>
                                <Trip ride={ride} user={user} />
                            </div>
                        ))
                    }
                    </div>
            </div>
         );
    }
}

function mapStateToProps({rides , user}) {
    return {
        user,
    }
}
 
export default connect(mapStateToProps)(Nearest);