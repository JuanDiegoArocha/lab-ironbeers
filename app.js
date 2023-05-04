const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//TODO hice ambos metodos, queria probar primero el async await y luego hice como hicimos en el codigo de clase con Jorge a 1.5

// app.get("/beers", async function (req, res) {
//   try {
//     const beersFromApi = await punkAPI.getBeers();
//     res.render("beers", { beers: beersFromApi});
//   } catch ( error ) {
//     console.log(error)
//   }
// })

app.get('/beers', (req, res) => {
  console.log("Beers from API")
  punkAPI.getBeers()
    .then((beersFromApi) => {
      console.log(beersFromApi)
      res.render("beers", { 
      beers: beersFromApi
    });
  })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

app.get("/random-beer", async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    console.log(randomBeer)
    res.render("random-beer.hbs", {
      randomBeer
    })
  } catch ( error ) {
    console.log(error)
    res.render("error")
  }
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
