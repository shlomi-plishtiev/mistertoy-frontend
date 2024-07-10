import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

// _createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getToyLabels,
}

function query(filterBy = {}, sortBy, pageIdx) {
  return httpService.get(BASE_URL, { filterBy, sortBy, pageIdx })
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  const method = toy._id ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: [],
    pageIdx: 0,
  }
}

function getDefaultSort() {
  return { type: '', desc: 1 }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
  }
}

function getToyLabels() {
  return [...labels]
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = gToys
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}
