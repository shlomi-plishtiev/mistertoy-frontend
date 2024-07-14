import { Link } from "react-router-dom"

import { ToyPreview } from "./ToyPreview"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    if (isLoading) {
        return (
            <div className="loading-indicator">
                <ReactLoading />
            </div>)
    }


    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="toy-controls">
                        <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                        <button className="btn" onClick={() => onEditToy(toy)}>Edit</button>
                        <Link to={`/toy/${toy._id}`} className="details-btn">Details</Link>

                    </div>
                </li>
            ))}
        </ul>
    );
}
