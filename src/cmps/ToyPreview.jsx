export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>toy preview</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        </article>
    )
}
