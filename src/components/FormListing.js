import React, { useState } from 'react'

function FormListing({ onNewListing }) {
  const [formData, setFormData] = useState({
    description: '',
    image: '',
    location: ''
  })

  function handleFormChange(event) {
    const {name, value} = event.target;
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onNewListing(formData)
    setFormData({
      description: '',
      image: '',
      location: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='description'>Description:</label>
      <input 
        id='description' 
        name='description' 
        type='text' 
        value={formData.description} 
        onChange={handleFormChange}
      />
      <label htmlFor='image'>Image:</label>
      <input 
        id='image' 
        name='image' 
        type='text'
        value={formData.image}
        onChange={handleFormChange}
      />
      <label htmlFor='location'>Location:</label>
      <input 
        id='location' 
        name='location' 
        type='text'
        value={formData.location}
        onChange={handleFormChange}
      />
      <input type='submit' value='Submit Listing'/>
    </form>
  )
}

export default FormListing