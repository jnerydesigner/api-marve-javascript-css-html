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

var QTD_VAR_PAGES = 50;



const initialValueHeroComuted = `&nameStartsWith=spider`;

let BASE_URL = `${BASE_URL_INITIAL}limit=10&ts=${TIME}&apikey=${API_KEY_PUBLIC}&hash=${API_PRIVATE_HASH}`






const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('page');
const myhero = urlParams.get('name');
let PAGE_RESULTS = myParam < 1 ? 1: myParam;
let NAME_HERO = myhero === null ? '' : myhero;


function interatorPagination(totalPage = 5, pageAtual = PAGE_RESULTS, qtdPages=QTD_VAR_PAGES){
  let passo = 0;
  const ulpaginação = document.querySelector('.box-pagination ul');
  let arrayPaginacao = [];

  let nextPage = (parseInt(pageAtual) + 1) >= 50 ? 50 : (parseInt(pageAtual) + 1);
  let lastPage = 150;
  let prevPage = (parseInt(pageAtual) - 1) < 1 ? 1 : (parseInt(pageAtual) - 1);
  let firstPage = 1;

  for (passo = 0; passo < totalPage ; passo++){
    arrayPaginacao.push(passo+1)
  }

  const templatePrev =
    `<li>
      <a href="http://localhost:3000?page=${prevPage}" id="page-link-${prevPage}" data-page="${prevPage}"> << </a>
    </li>`;
  const templateFirst =
  `<li>
    <a href="http://localhost:3000?page=${firstPage}" class="firstPage" id="page-link-${firstPage}" data-page="${firstPage}"> Primeira Página </a>
  </li>`;

  const templateNext =
    `<li>
      <a href="http://localhost:3000?page=${nextPage}" id="page-link-${nextPage}" data-page="${nextPage}"> >> </a>
    </li>`;
  const templateLast =
  `<li>
    <a href="http://localhost:3000?page=${lastPage}" class="lastPage" id="page-link-${lastPage}" data-page="${lastPage}"> Última Página </a>
  </li>`;


  let pagination = arrayPaginacao.map((pagina, index) => {
    const template =
    `<li>
      <a href="http://localhost:3000?page=${pagina}" id="page-link-${pagina}" data-page="${pagina}">${pagina}</a>
    </li>`;

    return template;
  }).join('');


  // inclusão do Retorno no HTML
  ulpaginação.innerHTML += templateFirst;
  ulpaginação.innerHTML += templatePrev;
  // ulpaginação.innerHTML += pagination;
  ulpaginação.innerHTML += templateNext;
  ulpaginação.innerHTML += templateLast;




 
}


interatorPagination();


const heroisContainer = document.querySelector('#list-hero');

const getHerois = async (heroi, pagina) => {
  console.log(heroi);
  if(heroi !== ''){
    BASE_URL = `${BASE_URL}&name=${heroi}`
  }
  const response = await fetch(BASE_URL);
  return response.json();
}


const addHeroisIntoDom = async (heroi, page) => {
  console.log(heroi)
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
  const novaChamada = heroisNovaChamada.results;

  const novosItems = novaChamada.map(({ series }) => {
    return {
      ...series.items
    }
  })

  const itememem = novosItems.map((item, index) => {
    if(item[index] !== undefined){
      return {
        ...item[index]
      };
    }
  })




  const detailSerie = document.querySelector('.box_detail_series');



  const heroesTemplate = herois.map((heroi) =>
  {
    // const serie1 = heroi.series.items[0].name < 1 ? null : heroi.series.items[0].name;

    const srcImage =  heroi.thumbnail.path +'.'+heroi.thumbnail.extension;
    const template = `
      <li class="card-revelation">
        <div class="box_detail_hero">
          <div class="box_thumb">
          <img src="${srcImage}" alt="${heroi.name}" />
          </div>
          <p>${heroi.name}</p>
        </div>
        <div class="box_detail_series">
        <p>${heroi.series.items[0] === undefined ? 'Sem Séries': heroi.series.items[0].name}</p>
        <p>${heroi.series.items[1] === undefined ? '': heroi.series.items[1].name}</p>
        <p>${heroi.series.items[2] === undefined ? '': heroi.series.items[2].name}</p>

        </div>
        <div class="box_detail_events">
        <p>${heroi.events.items[0] === undefined ? 'Sem Eventos': heroi.events.items[0].name}</p>
        <p>${heroi.events.items[1] === undefined ? '': heroi.events.items[1].name}</p>
        <p>${heroi.events.items[2] === undefined ? '': heroi.events.items[2].name}</p>
        </div>
      </li>
    `;

    return template;
  }
 ).join('');

heroisContainer.innerHTML += heroesTemplate;

const liHover = document.querySelector('.card-revelation');


}






addHeroisIntoDom(NAME_HERO, PAGE_RESULTS);

document.getElementById('btn-modal-open').onclick = openModalFunction;
document.getElementById('btn-modal-close').onclick = closeModalFunction;

function openModalFunction(){
  const modal = document.querySelector('.box-modal-details');
  if(modal.classList.contains('desactive')){
    modal.classList.remove('desactive');
    modal.classList.add('active');
  }
}

function closeModalFunction(){
  const modal = document.querySelector('.box-modal-details');
  if(modal.classList.contains('active')){
    modal.classList.remove('active');
    modal.classList.add('desactive');
  }
}

const btnSendHero = document.querySelector("#send-hero");
btnSendHero.addEventListener("click", function(e){
  // e.preventDefault();
  const nameHero = document.querySelector("#name-hero");
  const hero = nameHero.value;

  const locationSearch = `http://localhost:3000?name=${hero}`;

  window.location.href = locationSearch;
})




const form = document.querySelector('#form-herois');
form.addEventListener('submit', event => {
  event.preventDefault();
  const inputValue = document.querySelector('#hero');
  const value = inputValue.value;
  addHeroisIntoDom(value, 5);
})