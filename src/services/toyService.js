import { storageService } from './storageService'
import { utilService } from './util.service'
import { httpService } from './http.service'

const TOY_KEY = 'toy/'

_createToys()

export const toyService = {
  query,
  save,
  remove,
  getById,
  getEmptyToy,
  getDefaultFilter

}

function query(filterBy = {}) {
  return httpService.get(TOY_KEY, filterBy)
 
}

function getById(toyId) {
  return httpService.get(TOY_KEY + toyId)
}

function remove(toyId) {
  return httpService.delete(TOY_KEY + toyId)
}

function save(toy) {
  if (toy._id) {
      return httpService.put(TOY_KEY, toy)
  } else {
      return httpService.post(TOY_KEY, toy)
  }
  
}



function getDefaultFilter() {
  return {
      txt: '',
      maxPrice: '',
      labels: []
  }
}


function getEmptyToy(name = '', price = 0) {
  return { 
    _id: '',
    name, 
    price, 
    labels: [], 
    createdAt: Date.now(), 
    inStock: true, 
  }
}
function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
      toys = []
      for (let i = 0; i < 10; i++) {
          toys.push(_createRandToy())
      }
      utilService.saveToStorage(TOY_KEY, toys)
      console.log(toys)
  }
}

function _createRandToy() {
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
      'Outdoor', 'Battery Powered']
  return {
      _id: utilService.makeId(),
      name: utilService.makeLorem(2),
      price: utilService.getRandomIntInclusive(10, 500),
      labels: [labels[Math.floor(Math.random() * labels.length)]],
      createdAt: Date.now(),
      inStock: true
  }
}