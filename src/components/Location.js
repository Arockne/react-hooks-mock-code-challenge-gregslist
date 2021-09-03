import React from 'react'

function Location( {listings, filterByLocation, setFilterByLocation} ) {
  const locations = listings.reduce(( a, b ) => {
    if (!a.includes(b.location)) {
      a.push(b.location)
    }
    return a;
  }, [])
  
  return (
    <select value={filterByLocation} onChange={event => setFilterByLocation(event.target.value)}>
      <option value='all'>All</option>
      {locations.map(location => <option key={location} value={location}>{location}</option>)}
    </select>
  )
}

export default Location