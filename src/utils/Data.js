// api url: https://assessment.api.vweb.app/rides
export async function getUser (){
  const user = await (await fetch('https://assessment.api.vweb.app/user')).json()
   return user
}

export function getInitialData () {
  return Promise.all([
    getUser(),
    getFullRides(),
  ]).then(([user, rides]) => ({
    user,
    rides,
  }))
}

export async function getFullRides (){
   const rides =  await (await fetch('https://assessment.api.vweb.app/rides')).json()
   return rides
}
// Nearest ride: A nearest ride is a ride that includes your station code or a number closest to your station code in the station_path array.For example, your station code is 40. So any ride that has your station code as nearest number in station_path array.

// That would be  id 002 the most nearest as it has your station code 40 in the station_path array. 
// Then id 003 has 41 from station_path array is nearest to your station code 40. 

// Then id 001 has 42 from station_path array nearest to your station code 40. Hence it would be 002 > 003 > 001.
// Please note: You cannot use the same ride twiceDistance : Nearest station for your ride is your station code. 
// Example:For id 002, your station code is 40 and your ride also stops at your station so the distance is 40-40 = 0for id 001, your station code is 40 and your ride stops at station 42, so the distance is 42-40 = 2
