const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user.models');
const PORT = 3500;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', "ejs");

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/show', async (req, res) => {
  let allUser = await userModel.find();
  res.render('show', {allUser});
});

app.post('/create', async (req, res) => {
  let {name, email, image} = req.body;
  let makeUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  });
  res.redirect('/show');
});

app.get('/edit/:id', async (req, res) => {
  let allUser = await userModel.findOne({_id: req.params.id});
  res.render('edit', {allUser});
});

app.post('/edit/:id', async (req, res, next) => {
  const { name, email, image } = req.body;
  let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, image}, {new: true});
  res.redirect('/show');
});

app.get('/delete/:id', async (req, res) => {
  let user = await userModel.findOneAndDelete({_id: req.params.id});
  console.log(user);
  res.redirect('/show');
});

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}/`);
});