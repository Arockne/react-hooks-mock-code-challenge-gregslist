import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";
import Location from './Location'
import FormListing from './FormListing'

/*
As a user:
I can create a new listing by submitting a form, and persist the changes to the backend.
*/

function App() {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [searchListings, setSearchListings] = useState([])
  const [filterByLocation, setFilterByLocation] = useState('all')

  useEffect(() => {
    fetch('http://localhost:6001/listings')
    .then(r => r.json())
    .then(data => {
      setListings(data)
      setSearchListings(data)
    })
  }, [])

  function removeListing(id) {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(() => {
      const updated = listings.filter(listing => listing.id !== id)
      setListings(updated)
      setSearchListings(updated)
    })
  }

  function setNewListing(listing) {
    fetch('http://localhost:6001/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listing)
    })
    .then(r => r.json())
    .then(data => {
      const updated = [ ...listings, data]
      setListings(updated)
      setSearchListings(updated)
    })
  }
  
  function onSearchSubmit(search) {
    const searchList = listings.filter(listing => listing.description.toLowerCase().includes(search.toLowerCase()));
    setSearchListings(searchList)
  }

  const updatedListings = searchListings.filter(listing => {
    if (filterByLocation === 'all') {
      return listing
    }
    return listing.location === filterByLocation
  })


  return (
    <div className="app">
      <Header search={search} setSearch={setSearch} onSearchSubmit={onSearchSubmit}/>
      <FormListing onNewListing={setNewListing} />
      <Location listings={listings} filterByLocation={filterByLocation} setFilterByLocation={setFilterByLocation}/>
      <ListingsContainer listings={updatedListings} removeListing={removeListing}/>
    </div>
  );
}

export default App;
