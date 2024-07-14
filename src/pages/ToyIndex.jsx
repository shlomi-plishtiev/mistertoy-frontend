import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { ToyList } from '../cmps/ToyList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ToyFilter } from '../cmps/ToyFilter'
import { loadToys, removeToyOptimistic, setFilter, setSort } from '../store/actions/toyActions.js'

export function ToyIndex() {
  const navigate = useNavigate()

  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
  const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)


  useEffect(() => {
    loadToys()
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot load toys')
      })
  }, [filterBy, sortBy,])

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
      .then(() => {
        loadToys()
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        console.log('Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }
  function onEditToy(toy) {
    navigate(`/toy/edit/${toy._id}`)
  }
  function onSetFilter(filterBy) {
    setFilter(filterBy)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

  return (
    <section className="toy-index">
      <ToyFilter
        filterBy={filterBy}
        onSetFilter={onSetFilter}
        sortBy={sortBy}
        onSetSort={onSetSort}
      />
      <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
        <button className='btn-add' style={{ marginInline: 0,fontSize:'18px' }}>
          <Link to="/toy/edit">Add Toy</Link>
        </button>
      </div>
      
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />}
      <div style={{ marginBlockStart: '1em', textAlign: 'center' }}>
      </div>
    </section>
  )
}

