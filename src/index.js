import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import '../src/style.css';

export const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const { breedSelect, loader, error, catInfo } = elements;
error.style.display = 'none';
loader.style.display = 'none';

clearContent();
handlerBars();

function handlerBars() {
  loader.style.display = 'block';
  fetchBreeds()
    .then(data => {
      let markup = data.map(
        ({ name, id }) => `<option value="${id}">${name}</option>`
      );
      breedSelect.insertAdjacentHTML('beforeend', markup);
      new SlimSelect({
        select: breedSelect,
      });
      loader.style.display = 'none';
    })
    .catch((error) => {
      loader.textContent = 'Opps! Something went wrond! Try reloading the page.'
      loader.style.display = 'none',
      error
    });
}

breedSelect.addEventListener('change', handleBreadChange);

function handleBreadChange(event) {
  clearContent();
  loader.style.display = 'block';
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(cats => {
      if (cats.length > 0) {
        const catUrl = cats[0].url;
        const catInfoChoose = cats[0].breeds[0];
        createMarkupCat(catUrl, catInfoChoose);
        loader.style.display = 'none';
        loader.textContent = '';
      } else {
        console.log('По данному запросу ничего не найдено');
      }
    })
    .catch(error => {
      loader.textContent = 'Opps! Something went wrond! Try reloading the page.'
      ,error})
    .finally(() => {
      loader.style.display = 'none';
    });
}

function createMarkupCat(catUrl, catInfoChoose) {
  const { description, name, life_span, temperament, weight } = catInfoChoose;
  const weightMetric = weight ? weight.metric : 'N/A';
  const markupInfoCat = `
    <div class="cat">
  <img src="${catUrl}" alt="${name}">
  <article class="cat__descriotion">
    <h2>${name}</h2>
    <p>${description}</p> 
    <p><span class="cat_span">Temperament:</span>  ${temperament}</p>
    <p><span class="cat_span">Average life expectancy:</span> ${life_span}</p>
    <p><span class="cat_span">Average weight:</span> ${weightMetric}</p>
  </article>
</div>
`;
  catInfo.innerHTML = markupInfoCat;
}
function clearContent() {
  catInfo.innerHTML = '';
}
