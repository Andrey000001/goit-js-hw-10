import refs from './refs';
export default function createMarkupCat(catUrl, catInfoChoose) {
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
  refs.catInfo.innerHTML = markupInfoCat;
}
