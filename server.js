//server.js serves up the code for other computer

var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var app = express()
//configuration (setup for our app)
app.set('view engine', 'ejs')
app.set(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.set('views', __dirname + '/public')

app.get('/', function(request, response){
    response.render('home.ejs')
})

app.get('/singleCollege/:collegeName', function(request,response){

    var input = request.params.collegeName
    
    var apiKey = 'SfFpDoUssAhPA5WWP8UXoB1O15E5qF4Tct5AkJ3w'
    var url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${input}`
    
    axios.get(url)
    .then(function(res){
        // console.log(response.data)
        
        response.render('singleCollege.ejs', {
            data: res.data,
            collegeName: input
        })
    })    
})

app.post('/results', function(request, response){
    var input = request.body.college
    .replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20")
    var apiKey = 'SfFpDoUssAhPA5WWP8UXoB1O15E5qF4Tct5AkJ3w'
    var url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${input}`
    
    axios.get(url)
    .then(function(res){
        // console.log(response.data)
        
        response.render('collegeInfo.ejs', {
            data: res.data
        })
    })
    
})

var port = process.env.PORT || 8080

app.listen(port, function(){
//app.listen makes the computer wait and "listen"
    console.log('App is running on port' + port)
})
