const Container = require('./index.js').default;

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const container = new Container('productos.txt');


function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min)) + min;
  }

app.get('/productos', function (req, res) {
    container.init().then(()=>{
        container.getAll().then((items)=>{res.send(items)});
    })
})

app.get('/productoRandom', function (req, res){
    container.init().then(()=>{
        container.getAll().then((items)=>{
            container.getById(randomIntFromInterval(1, items.length + 1 )).then((item)=>{res.send(item)})
        })
    })
})

app.listen(PORT, ()=>{console.log(`Iniciado en puerto ${PORT}`)});