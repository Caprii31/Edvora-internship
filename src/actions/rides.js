export const GET_RIDES = 'GET_RIDES'

export function getRides (rides) {

    return {
        type: "GET_RIDES",
        rides
    }

}