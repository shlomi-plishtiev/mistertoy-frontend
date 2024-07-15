import { toyService } from '../../services/toyService.js'
import {
  ADD_TOY,
  REMOVE_TOY,
  SET_FILTER_BY,
  SET_IS_LOADING,
  SET_SORT_BY,
  SET_TOYS,
  TOY_UNDO,
  UPDATE_TOY,
} from '../reducers/toy.reduser.js'
import { store } from '../store'

export async function loadToys(pageIdx) {
  try {
    const { filterBy, sortBy } = store.getState().toyModule
    
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    
    const toys = await toyService.query(filterBy, sortBy, pageIdx)
    
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log('toy action -> Cannot load toys', err)
    throw err
  } finally {
    setTimeout(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }, 350)
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('toy action -> Cannot remove toy', err)
    throw err
  }
}


export function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  return toyService.remove(toyId)
    .catch(err => {
      store.dispatch({ type: TOY_UNDO })
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export async function saveToy(toyToSave) {
  const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
  try {
    const toy = await toyService.save(toyToSave)
    store.dispatch({ type, toy })
    return toy
  } catch (err) {
    console.log("toy action -> Cannot save toy", err)
    throw err
  }
}


export function setFilter(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
  store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}
