import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds,fetchCatByBreed } from './js/cat-api';
import '../src/style.css';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const { breedSelect, loader, error, catInfo } = elements;
handlerBars()
function handlerBars(e) {
  fetchBreeds()
  .then(data => {
    let markup = data.map(({name,id}) => `<option value="${id}">${name}</option>`)
    breedSelect.insertAdjacentHTML('beforeend',markup)
    new SlimSelect({
      select: breedSelect,
    });
  })
}
breedSelect.addEventListener('change',handleBreadChange)
function handleBreadChange(event) {
  const breedId = event.currentTarget.value
  fetchCatByBreed(breedId)
  .then(data => {
    const markup =`<img src="${data[0].url}">`
    catInfo.innerHTML = markup 
  })
}



