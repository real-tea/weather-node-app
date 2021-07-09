const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); 
const port = process.env.PORT || 3000;

//setting up hbs partials
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//set up path files for configurations
app.set('view engine', 'hbs')
const templatePaths = path.join(__dirname,'../templates/views');
app.set('views',templatePaths);

//setting up express to use static files from public directory(eg: css,images and javascript)
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akash Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'About Me',
        name: 'Akash Singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ 
            error:'Provide Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{ 
        if(error){return res.send({ error: error})}

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error: error})
            }
        

        res.send({ 
            forecast:forecastData,
            location:location,
            address:req.query.address,

        })
    })
})

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Provide location'
        })
    }
    console.log(req.query.search);
    res.send({
        products :[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'About Me',
        name: 'Akash Singh',
        message:'help not found'
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'About Me',
        name: 'Akash Singh',
        message:'Page not Found'
    });
})

app.listen(port, () => {
    console.log('Server is up on port '+ port);
})