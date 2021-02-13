const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 7070
const planetSchema = new mongoose.Schema({
    title: String,
    hdurl: String,
    explanation: String,
    hideDescription: Boolean
})

const Planet = mongoose.model("Planet", planetSchema)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nasapp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get('/images', (req, res) => {
    req.query.id.length < 1 ?
        Planet.find({}).then(planets => res.send(planets)) :
        Planet.findById(req.query.id)
            .then(planets => res.send([planets]))

})

app.post('/image', (req, res) => {
    const planet = new Planet(req.body)
    planet.save().then(planet => res.send(planet))
})
app.delete('/image/:id', function (req, res) {
    const id = req.params.id
    Planet.findByIdAndDelete(id, function (err, planet) {
        if (err) res.send(err)
        else res.send(planet.id)
    })
})

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, 'client/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//     });

// }
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log("server up and running on port " + port))

















