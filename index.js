let express         = require('express')
let bodyParser      = require('body-parser');
let cors            = require('cors');
let mongoose        = require('mongoose');
let multer = require('multer');
let usersRoutes     = require("./routes/usersRoutes")
let commentsRoutes  = require("./routes/commentsRoutes");
let eventsRoutes  = require("./routes/eventsRoutes");
let postsRoutes  = require("./routes/postsRoutes");
let upload = multer({dest: __dirname + '/uploads/images'});

let app             = express();

let urlDB = process.env.URLDB || "mongodb://greenmind:greenmind@54.233.217.136:27017/greenmind";

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
app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send("API comments" + port));

app.use('/users',       usersRoutes);
app.use('/comments',    commentsRoutes);
app.use('/events',    eventsRoutes);
app.use('/posts',    postsRoutes);

let port = process.env.PORT || 8080;

app.listen(port, () => console.log("Servidor inicializador en el puerto: " + port));
