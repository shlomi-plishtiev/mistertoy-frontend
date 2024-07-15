import { useState } from 'react'

export function ToyFilter({ onFilterByName, onFilterByStock, onFilterByLabel, onSort }) {
  const [nameFilter, setNameFilter] = useState('')
  const [stockFilter, setStockFilter] = useState('all')
  const [selectedLabels, setSelectedLabels] = useState([])
  const [sortType, setSortType] = useState('')

  const handleNameChange = (event) => {
    setNameFilter(event.target.value)
    onFilterByName(event.target.value)
  }

  const handleStockChange = (event) => {
    setStockFilter(event.target.value)
    onFilterByStock(event.target.value)
  }

  const handleLabelChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedLabels([...selectedLabels, value])
    } else {
      setSelectedLabels(selectedLabels.filter(label => label !== value))
    }
    onFilterByLabel(selectedLabels)
  }

  const handleSortChange = (event) => {
    const { value } = event.target
    setSortType(value)
    onSort(value)
  }

  return (
    <div className="toy-filter">
      <input
        type="text"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={handleNameChange}
      />
      <select value={stockFilter} onChange={handleStockChange}>
        <option value="all">All</option>
        <option value="inStock">In Stock</option>
        <option value="outOfStock">Out of Stock</option>
      </select>
      {/* <select multiple value={selectedLabels} onChange={handleLabelChange}>
        <option value="Doll">Doll</option>
        <option value="Battery Powered">Battery Powered</option>
        <option value="Baby">Baby</option>
      </select> */}
      <select value={sortType} onChange={handleSortChange}>
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="created">Created</option>
      </select>
    </div>
  )
}