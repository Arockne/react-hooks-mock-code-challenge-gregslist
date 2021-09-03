import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [searchListings, setSearchListings] = useState([])

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
      setListings(listings.filter(listing => listing.id !== id))
    })
  }

  function onSearchSubmit(search) {
    const searchList = listings.filter(listing => listing.description.toLowerCase().includes(search.toLowerCase()));
    setSearchListings(searchList)
  }

  return (
    <div className="app">
      <Header search={search} setSearch={setSearch} onSearchSubmit={onSearchSubmit}/>
      <ListingsContainer listings={searchListings} removeListing={removeListing}/>
    </div>
  );
}

export default App;
