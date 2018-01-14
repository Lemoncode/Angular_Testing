const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/games', (req, res) => {
  res.json([
    {
      title: 'sonic'
    },
    {
      title: 'mario'
    },
  ])
});

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);
