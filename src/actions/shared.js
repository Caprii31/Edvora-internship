import { getRides } from './rides'
import { getUser } from './user'
import { getInitialData } from '../utils/Data'

export function handleInitialData (){
    return (dispatch) => {
        getInitialData()
        .then(({user, rides}) => {
            rides.map((ride,index) => {
                ride.uID = index
                return ride;
            })
            dispatch(getUser(user))
            dispatch(getRides(rides))
        })
    }
}