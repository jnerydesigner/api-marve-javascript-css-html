import Home from "./views/Home.js";

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router =  async () => {
  console.log('aqui')
  const routes = [
    {path: '/', view: Home},
    // {path: '/hero/1', view: () => console.log('View Hero')}
  ];

  // Test da rota com potencial match 

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);


  if(!match){
    match ={
      route: rotes[0],
      isMatch: true
    }
  }


  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();



  // console.log(match.route.view())

};

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener('click', e => {
    if(e.target.matchs('[data-link')){
      e.preventDefault();
      navigateTo(e.target.href);
    }
  })
  router();
})

