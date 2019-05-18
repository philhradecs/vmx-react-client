export default function CoverGrid({ data }) {
  const { items, pages, page, results } = data;
  return (
    <div>
      <ul>
        <strong>
          total number of items: {items} | page {page} of {pages}
        </strong>
        <hr />
        {results.map(({ title, year, country, genres, styles, id }) => (
          <li key={id}>
            <b>{title}</b> ({' '}
            <span style={{ opacity: '0.9', fontWeight: 'lighter' }}>year:</span>{' '}
            {year}{' '}
            <span style={{ opacity: '0.9', fontWeight: 'lighter' }}>
              country:
            </span>{' '}
            {country}{' '}
            <span style={{ opacity: '0.9', fontWeight: 'lighter' }}>id:</span>{' '}
            {id}{' '}
            <span style={{ opacity: '0.9', fontWeight: 'lighter' }}>
              genres:
            </span>{' '}
            {genres.map(genre => `${genre} `)}{' '}
            <span style={{ opacity: '0.9', fontWeight: 'lighter' }}>
              styles:
            </span>{' '}
            {styles.map(style => `${style} `)})
          </li>
        ))}
      </ul>
    </div>
  );
}