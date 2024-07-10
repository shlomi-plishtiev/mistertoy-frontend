import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { ToyList } from '../cmps/ToyList'
import { showErrorMsg,showSuccessMsg } from '../services/event-bus.service'
import { ToyFilter } from '../cmps/ToyFilter'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toyActions'

export function ToyIndex() {

  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys()
      .catch(err => {
        console.log('err',err);
        showErrorMsg('Cannot load toys')
      })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('Enter new price')
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then(savedToy => {
        showSuccessMsg('Toy price updated')
      })
      .catch(err => {
        showErrorMsg('Cannot update toy price')
      })
  }

  return (
    <div className="toy-index">
      <Link to="/toy/edit" className="add-btn">Add a toy</Link>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      {!isLoading
        ? <ToyList
          toys={toys}
          onRemoveToy={onRemoveToy}
          onEditToy={onEditToy}
        />
        : <div>Loading...</div>
      }
    </div>
  );
}

