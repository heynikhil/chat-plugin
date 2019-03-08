const express = require('express');
const bodyParser = require('body-parser');
const googleAuth = require('google-oauth-jwt');
const cors = require('cors')
const app = express();

const config = require('./key');

app.use(bodyParser.json());
app.use(cors())
app.get('/token', async (req, res) => {
  let token = await getToken();
  res.send({ token });
})

const getToken = async () => {
  return new Promise((resolve) => {
    googleAuth.authenticate(
      {
        email: config.googleClientEmail,
        key: config.googlePrivateKey,
        scopes: ['https://www.googleapis.com/auth/cloud-platform',"https://www.googleapis.com/auth/dialogflow"],
      },
      (err, token) => {
        resolve(token);
      },
    );
  });
}

app.listen(3001);