import axios from 'axios';

const KEY = '30661779-0ac9a2888848bc4b079840e05';
const URL = 'https://pixabay.com/api/';

const getImages = async (inputValue, page) => {
  const { data } = await axios.get(
    `${URL}?q=${inputValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const images = getNormalizedImages(data.hits);
  const totalPages = Math.ceil(data.totalHits / 12);

  return { images, totalPages };
};

const getNormalizedImages = imagesData =>
  imagesData.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));

//return await axios.get(`${URL}?q=${valueInput}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)

// fetch(`https://pixabay.com/api/?q=cat&page=1&key=30901823-3559667aaedc24b5df855bd98&image_type=photo&orientation=horizontal&per_page=12`)
//    .then(resp => resp.json()).then(console.log)

export { getImages };
