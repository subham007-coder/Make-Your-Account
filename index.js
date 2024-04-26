// const express = require('express');
// const app = express();
// const path = require('path');
// const userModel = require('./models/user.models');
// const PORT = process.env.PORT || 3000;


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', "ejs");

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/show', async (req, res) => {
//   let allUser = await userModel.find();
//   res.render('show', {allUser});
// });

// app.post('/create', async (req, res) => {
//   let {name, email, image} = req.body;
//   let makeUser = await userModel.create({
//     name: name,
//     email: email,
//     image: image,
//   });
//   res.redirect('/show');
// });

// app.get('/edit/:id', async (req, res) => {
//   let allUser = await userModel.findOne({_id: req.params.id});
//   res.render('edit', {allUser});
// });

// app.post('/edit/:id', async (req, res, next) => {
//   const { name, email, image } = req.body;
//   let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, image}, {new: true});
//   res.redirect('/show');
// });

// app.get('/delete/:id', async (req, res) => {
//   let user = await userModel.findOneAndDelete({_id: req.params.id});
//   console.log(user);
//   res.redirect('/show');
// });

// app.listen(PORT, () => {
//   console.log(`listening on port http://localhost:${PORT}/`);
// });


const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user.models');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Error handling middleware
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send('Page not found!');
  } else {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  }
});


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/show', async (req, res, next) => {
  try {
    const allUser = await userModel.find();
    res.render('show', { allUser });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Add input validation middleware for '/create' and '/edit/:id' routes

app.post('/create', async (req, res, next) => {
  try {
    const { name, email, image } = req.body;
    const makeUser = await userModel.create({ name, email, image });
    res.redirect('/show');
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

app.get('/edit/:id', async (req, res, next) => {
  try {
    const allUser = await userModel.findOne({ _id: req.params.id });
    res.render('edit', { allUser });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

app.post('/edit/:id', async (req, res, next) => {
  try {
    const { name, email, image } = req.body;
    const user = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, email, image }, { new: true });
    res.redirect('/show');
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

app.get('/delete/:id', async (req, res, next) => {
  try {
    const user = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/show');
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server Setup
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}/`);
});

