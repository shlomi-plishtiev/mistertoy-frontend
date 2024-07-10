export function ToyPreview({ toy }) {
    return (
      <article className="toy-preview">
        <h4>{toy.name}</h4>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <img src={toy.imageUrl} alt={toy.name} />
      </article>
    );
  }
