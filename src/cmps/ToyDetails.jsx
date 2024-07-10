import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toyService } from '../services/toyService'

export function ToyDetails() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)

  useEffect(() => {
    toyService.get('toys', toyId)
      .then(fetchedToy => {
        setToy(fetchedToy)
      })
      .catch(error => {
        console.error('Error fetching toy details:', error)
      })
  }, [toyId])

  if (!toy) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{toy.name}</h1>
      <p>Price: ${toy.price}</p>
      <p>Created At: {new Date(toy.createdAt).toLocaleString()}</p>
      <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  )
}
