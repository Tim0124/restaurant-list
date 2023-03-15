const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

//use static public
app.use(express.static('public'))

//setting template engine
app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine','handlebars')

//route index setting
app.get('/', (req, res) => {
  res.render('index',{restaurant: restaurantList.results})
})

// show setting
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params)
  const showRestaurant = restaurantList.results.filter(restaurant => restaurant.id ==  req.params.restaurant_id)
  console.log(showRestaurant)
  res.render('show', {restaurant: showRestaurant[0]})
})

//search setting
app.get('/search',(req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  const searchResult = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index',{restaurant: searchResult, keyword: keyword})
})
//route listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})