import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
    


    render() { 
        console.log('nav component props: ', this.props)
        

        const { user } = this.props   
        console.log('nav component props: ', user)

        return ( 
            
            <div className="navbar">
                    <h1 className="logo">edvora</h1>
                    <div className="userInfo">
                        <a href="#">{user.name}</a>
                        <img src ={user.url}></img>
                    </div>
            </div>
            
         );
    }
}

function mapStateToProps ({ user }){
    return {
        user
    }
}

export default connect(mapStateToProps)(Navbar);