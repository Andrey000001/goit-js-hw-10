import { elements } from "..";
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_s0ShbLuiW1I81vNeG6UIA9KxAjdj14rokaExbfrrehoYvnP9qDq1HpMbzIF64xk8'


function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key${API_KEY}`)
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
  .then(response => {
    if(!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  })
}
export {fetchBreeds,fetchCatByBreed}