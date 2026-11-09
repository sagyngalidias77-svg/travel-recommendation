const searchForm = document.querySelector('#search-form');
const destination = document.querySelector('#destination');
const results = document.querySelector('#results');
const status = document.querySelector('#search-status');

const categories = {
  beach: 'beach',
  beaches: 'beach',
  temple: 'temple',
  temples: 'temple',
  country: 'country',
  countries: 'country',
};

let catalog;
let searchVersion = 0;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const version = ++searchVersion;
  const query = destination.value.trim().toLowerCase();
  results.replaceChildren();

  if (!query) {
    status.textContent = 'Enter a destination or category.';
    return;
  }

  status.textContent = 'Searching…';
  try {
    if (!catalog) {
      const response = await fetch('destinations.json');
      if (!response.ok) throw new Error('Catalog unavailable');
      catalog = await response.json();
    }
    if (version !== searchVersion) return;

    const words = query.match(/[a-z]+/g) ?? [];
    const category = words.map((word) => categories[word]).find(Boolean);
    const matches = catalog.filter((place) => category
      ? place.category === category
      : `${place.name} ${place.location}`.toLowerCase().includes(query));

    status.textContent = matches.length
      ? `${matches.length} recommendations`
      : 'No results. Try beach, temple, or country.';

    for (const place of matches) {
      const card = document.createElement('article');
      const image = document.createElement('img');
      const title = document.createElement('h2');
      const description = document.createElement('p');
      image.src = place.image;
      image.alt = `Illustration of ${place.name}`;
      image.width = 640;
      image.height = 360;
      title.textContent = `${place.name} · ${place.location}`;
      description.textContent = place.description;
      card.append(image, title, description);
      results.append(card);
    }
  } catch {
    if (version === searchVersion) {
      status.textContent = 'Recommendations could not load. Try searching again.';
    }
  }
});

document.querySelector('#clear-search').addEventListener('click', () => {
  searchVersion += 1;
  searchForm.reset();
  results.replaceChildren();
  status.textContent = '';
  destination.focus();
});
