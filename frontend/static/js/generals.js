import md5 from './md5.js';




const BASE_URL_INITIAL = 'http://gateway.marvel.com/v1/public/characters?';
const API_KEY_PUBLIC = "d3d4c96332c02914ba460ab51662f742";
const API_KEY_PRIVATE = "6c83ae9bd2fe030d9e89c6047a55074b6abd9360";
const TIME = Date.now();
const API_PRIVATE_HASH = md5(TIME+API_KEY_PRIVATE+API_KEY_PUBLIC);


const modal = document.querySelector('.box-modal-details');
const openModal = document.querySelector('#modal_toggle');
const closeModal = document.querySelector('#close-modal');

openModal.onclick = function(){
  if(modal.classList.contains('desactive')){
    modal.classList.remove('desactive');
    modal.classList.add('active');
  }
}

closeModal.onclick = function(){
  if(modal.classList.contains('active')){
    modal.classList.remove('active');
    modal.classList.add('desactive');
  }
}

const initialValueHeroComuted = `&nameStartsWith=spider`;

let BASE_URL = `${BASE_URL_INITIAL}limit=20&ts=${TIME}&apikey=${API_KEY_PUBLIC}&hash=${API_PRIVATE_HASH}`
// fetchApi(BASE_URL);


const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  console.log(event)
  const {value} = document.querySelector('#hero');
  let valueHeroComuted = '';
  if(value === ''){
    valueHeroComuted = '';
  }else{
    valueHeroComuted = `&nameStartsWith=${value}`;
  }
  
  const BASE_URL = `${BASE_URL_INITIAL}limit=10&ts=${TIME}&apikey=${API_KEY_PUBLIC}&hash=${API_PRIVATE_HASH}${valueHeroComuted}`;
  fetchApi(BASE_URL);
});



function buscarHeroi(){
  console.log('estou aqui')  
};

const buscando = (value) => {
  return value;
};


function fetchApi(base){
  const marvel = fetch(`${base}`)
                        .then(response => response.json())
                        .then(({data}) => {
                          
                          
                          data.results.forEach((result) => {
                            // const divHero = document.querySelector('#hero'); 
                            
                            let liHero = document.createElement('li');

                            liHero.classList.add('hero-class');
                            const srcImage =  result.thumbnail.path +'.'+result.thumbnail.extension;
                            createDivHero(srcImage, result, liHero);                
                          })
                        })

  return marvel;
}





const father = document.querySelector('#list-hero');




function createDivHero(image, hero, divHero){
  const contentHtml = `
            <div class="box_detail_hero">
              <div class="box_thumb">
                <img src="${image}" alt="${hero.name}" />
              </div>
              <p>${hero.name}</p>
            </div>
            <div class="box_detail_series">
              <p>serie</p>
              <p>serie</p>
              <p>serie</p>
            </div>
            <div class="box_detail_events">
              <p>Events 1</p>
              <p>Events 1</p>
              <p>Events 1</p>
            </div>  
  `;

  divHero.innerHTML = contentHtml;

  father.appendChild(divHero);


} 

// fetchApi(BASE_URL);
