const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//////////////
const cors = require('cors');
app.use(cors());
//////////////

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const store = new mongoDbStore({
  //uri:'mongodb+srv://abdalrmanbadwy:W7qp1OI3fl2kktYc@cluster0.z40ugzh.mongodb.net/shop?retryWrites=true&w=majority',
  uri:'mongodb+srv://dstr1:1357902468@mmagdydb.otulj0s.mongodb.net/ecommerce',
  collection: 'sessions'

});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    store: store
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    //'mongodb+srv://abdalrmanbadwy:W7qp1OI3fl2kktYc@cluster0.z40ugzh.mongodb.net/shop?retryWrites=true&w=majority'
    'mongodb+srv://dstr1:1357902468@mmagdydb.otulj0s.mongodb.net/ecommerce'
    )
  .then(result => {
    app.listen(2000);
  })
  .catch(err => {
    console.log(err);
  });
