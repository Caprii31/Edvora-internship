import { GET_RIDES } from '../actions/rides'


export function rides (state = [], action){
    switch (action.type) {
        case GET_RIDES:
            return [
                ...state,
                ...action.rides
            ]
        
        default: return state
    }
}

