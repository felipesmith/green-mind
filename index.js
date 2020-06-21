let express         = require('express')
let bodyParser      = require('body-parser');
let cors            = require('cors');
let mongoose        = require('mongoose');
let multer          = require('multer');
let usersRoutes     = require("./routes/usersRoutes")
let commentsRoutes  = require("./routes/commentsRoutes");
let eventsRoutes  = require("./routes/eventsRoutes");
let postsRoutes  = require("./routes/postsRoutes");
require('dotenv').config();

let configMensaje = require('./configMensaje');
let fs = require("fs");

let app             = express();

let urlDB = process.env.URLDB || "mongodb://greenmind:greenmind@3.22.232.176:27017/greenmind";

mongoose.set('useNewUrlParser',     true);
mongoose.set('useFindAndModify',    false);
mongoose.set('useCreateIndex',      true);

mongoose.connect(urlDB)
.then(() => console.log("GreenMind online."))
.catch(error => console.log(error));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send("API comments" + port));

app.use('/users',       usersRoutes);
app.use('/comments',    commentsRoutes);
app.use('/events',    eventsRoutes);
app.use('/posts',    postsRoutes);

app.post('/formulario', (req, res) => {
 configMensaje(req.body);
 res.status(200).send();
})

let port = process.env.PORT || 8080;

app.listen(port, () => console.log("Servidor inicializador en el puerto: " + port));
