import md5 from './md5.js';

document.addEventListener('DOMContentLoaded', function() {
  const openModal = document.getElementById('#modal_toggle');
}, false);

// Ponto inicial de configuração da API da marvel
const BASE_URL_INITIAL = 'http://gateway.marvel.com/v1/public/characters?';
const API_KEY_PUBLIC = "d3d4c96332c02914ba460ab51662f742";
const API_KEY_PRIVATE = "6c83ae9bd2fe030d9e89c6047a55074b6abd9360";
const TIME = Date.now();
const API_PRIVATE_HASH = md5(TIME+API_KEY_PRIVATE+API_KEY_PUBLIC);


// Abre Modal de Herois

// const modal = document.querySelector('.box-modal-details');
// document.getElementById('#modal_toggle').click(() => {
//   alert('toggle')
// });

// const closeModal = document.getElementById('#close-modal').click();

// const modal= () => {
//   alert('deu certo')
// }

// openModal = function(){
//   if(modal.classList.contains('desactive')){
//     modal.classList.remove('desactive');
//     modal.classList.add('active');
//   }
// }

// closeModal = function(){
//   if(modal.classList.contains('active')){
//     modal.classList.remove('active');
//     modal.classList.add('desactive');
//   }
// }

// function iniciaModal(){
//   const modal = document.querySelector('.box-modal-details');
//   // if(modal.classList.contains('desactive')){
//   //   modal.classList.remove('desactive');
//   //   modal.classList.add('active');
//   // }

//   alert('deu certo');
// }

// const openModal = document.getElementById('#modal_toggle');

// openModal.addEventListener('click', () => {
//   iniciaModal();
// })

// const modal = document.querySelector('.box-modal-details');

// const openModal = document.getElementById('box-content-result-2');
// openModal.addEventListener('click', () => {
//   alert('deu certo')
// })


const initialValueHeroComuted = `&nameStartsWith=spider`;

let BASE_URL = `${BASE_URL_INITIAL}limit=10&ts=${TIME}&apikey=${API_KEY_PUBLIC}&hash=${API_PRIVATE_HASH}`


let PAGE_RESULTS = 1;




const heroisContainer = document.querySelector('#list-hero');

const getHerois = async (heroi = '', pagina) => {
  if(heroi !== ''){
    BASE_URL = `${BASE_URL}&name=${heroi}`
  }

  const response = await fetch(BASE_URL);

  return response.json();
}

const addHeroisIntoDom = async (heroi, page) => {
  const data = await getHerois(heroi, page);

  
  
  
  const totalRecordsPerPage = 10;
  const totalRecords = data.data.total;
  const totalPages = Math.round(totalRecords / totalRecordsPerPage);
  let currentPage = page === 1 ? 1 : page;
  
  if (currentPage > totalPages) {
    currentPage = totalPages;
  } else if (currentPage < 1) {
    currentPage = 1;
  }
  
  const begin = (totalRecordsPerPage * currentPage) - totalRecordsPerPage;

  // faz uma nova requisição para api para população dos dados com paginação
  let heroisNovaChamada = fetch(`${BASE_URL}&offset=${begin}`).then(response => response.json()).then(response => response.data)
  heroisNovaChamada = await heroisNovaChamada; 
  

  
  
  const herois = heroisNovaChamada.results;

  const detailSerie = document.querySelector('.box_detail_series');

  const heroesTemplate = herois.map((heroi) => 
  {
    const srcImage =  heroi.thumbnail.path +'.'+heroi.thumbnail.extension;
    const template = `
      <li>
        <div class="box_detail_hero">
          <div class="box_thumb">
          <img src="${srcImage}" alt="${heroi.name}" />
          </div>
          <p>${heroi.name}</p>
        </div>
        <div class="box_detail_series">
          <p>Series</>
        </div>
        <div class="box_detail_events">
          <p>ajadlahlahd</>
        </div>
      </li>
    `;

    return template;
  }  
 ).join('');

heroisContainer.innerHTML += heroesTemplate;

}


const divPaginação = document.querySelector('.box-pagination ul li a');

console.log(divPaginação.dataset)


addHeroisIntoDom('', PAGE_RESULTS);

const form = document.querySelector('#form-herois');
form.addEventListener('submit', event => {
  event.preventDefault();
  const inputValue = document.querySelector('#hero');
  const value = inputValue.value;
  addHeroisIntoDom(value, 5);
})