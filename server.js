const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();

const helpers = require('./util/helper');


const app = express();
const PORT = process.env.PORT || 3001;

const { User, Blog, Comment } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
  secret: "super secret",
  cookie: {
    // an hour per session
    maxAge: 1 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

app.use(express.static('public'));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});