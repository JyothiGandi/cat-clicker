
class Model {
  constructor() {
    this.cats = [
      {
        id: 0,
        name: 'candy',
        image: 'img/cat1.jpg',
        clicks: 0
      }, {
        id: 1,
        name: 'lollipop',
        image: 'img/cat2.jpg',
        clicks: 0
      }, {
        id: 2,
        name: 'ice cream',
        image: 'img/cat3.jpg',
        clicks: 0
      }, {
        id: 3,
        name: 'toffee',
        image: 'img/cat4.jpg',
        clicks: 0
      }, {
        id: 4,
        name: 'cherry',
        image: 'img/cat5.jpg',
        clicks: 0
      }
    ],
    this.currentCat = null,
    this.isAdmin = true
  }
}

class View {
  constructor() {
    this.catListElement = document.getElementById('catList');
    this.catImageArea = document.getElementById('catImageArea');
    this.adminArea = document.getElementById('adminArea');
    this.adminButton = document.getElementById('adminArea');
    this.adminForm = document.getElementById('adminForm');
    this.saveButton = document.getElementById('save');
  }

  catListRenderer() {
    const cats = octopus.cats;
    let x = '';
    for (let i = 0; i < cats.length; i++) {
      x += `<p id="catDispName${i}">${cats[i].name}</p>`
    }
    this.catListElement.innerHTML = x;
  }

  setCatImage(cat) {
    this.catImageArea.innerHTML = `<p id="cat${cat.id}Name">${cat.name}</p>
    <img id="cat${cat.id}" src="${cat.image}" alt="cat" height="150px" width="150px">
    <p id="cat${cat.id}Clicks">${cat.clicks}</p>`;
  }

  catNameClickEventListener() {
    this.catListElement.addEventListener('click', (event) => {
      if (event.target.nodeName === 'P') {
        const catId = Number(event.target.id.slice(-1));
        this.setCatImage(octopus.catById(catId));
        octopus.setCurrentCat(catId);
        // if admin
        console.log("name is clicked");
        this.setAdminFormData(octopus.getCurrentCat());
      }
    });
  }

  catImageClickEventListener() {
    this.catImageArea.addEventListener('click', (event) => {
      if (event.target.nodeName === 'IMG') {
        const catId = Number(event.target.id.slice(-1));
        document.getElementById(`cat${catId}Clicks`).innerHTML = octopus.incrementCatClicks(catId);
        this.setAdminFormData(octopus.getCurrentCat());
      }
    });
  }

  setAdminButton() {
    this.adminArea.innerHTML = `<button id="adminButton">Admin</button>`;
  }

  setAdminFormData(cat) {
    document.forms["myForm"]["catName"].value = cat.name;
    document.forms["myForm"]["catClicks"].value = cat.clicks;
  }

  showAdminForm() {
    this.adminForm.classList.remove('hideAdminForm');
  }

  hideAdminForm() {
    this.adminForm.classList.add('hideAdminForm');
  }

  adminClickEventListener() {
    this.adminButton.addEventListener('click', (event) => {
      this.showAdminForm();
      this.setAdminFormData(octopus.getCurrentCat());
    });
  }

  saveButtonEventListener() {
    this.saveButton.addEventListener('click', (event) => {
      let catName = document.forms["myForm"]["catName"].value;
      let catClicks = document.forms["myForm"]["catClicks"].value;
      if (octopus.isAdmin && catName && catClicks !== undefined) {
        octopus.modifyCatData(catName, catClicks);
        this.hideAdminForm();
      }
    });
  }

}

class Octopus {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  get cats() {
    return this.model.cats;
  }

  get isAdmin() {
    return this.model.isAdmin;
  }

  getCurrentCat() {
    return this.model.currentCat;
  }

  setCurrentCat(catId) {
    this.model.currentCat = this.cats[catId];
  }

  catById(catId) {
    return this.cats[catId];
  }

  modifyCatData(name, clicks) {
    const cat = this.cats[this.getCurrentCat().id];
    cat.name = name;
    cat.clicks = clicks;
    this.view.setCatImage(cat);
  }

  incrementCatClicks(catId) {
    return ++this.catById(catId).clicks;
  }

  init() {
    this.view.catListRenderer();
    this.setCurrentCat(0);
    this.view.catNameClickEventListener();
    this.view.catImageClickEventListener();

    this.view.setCatImage(this.getCurrentCat());

    if (this.isAdmin) {
      this.view.setAdminButton();
      this.view.adminClickEventListener();
      this.view.saveButtonEventListener();
    }
  }
}

const octopus = new Octopus();
octopus.init();
