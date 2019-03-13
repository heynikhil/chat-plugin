const express = require('express');
const googleAuth = require('google-oauth-jwt');
const cors = require('cors')
const path = require('path')
const app = express();

const config = {
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgL2/WdZc3s/xq\nLzFta0VYzDXjOV3E/4fG2lHs4L+bXaMttiQEGi7qpY3ZOI+QKvv/9TIvop7K95Cl\nNW3OGMVWMOlaTX48XT1dLg6j3YjaRMaLep0AWJIGlCsQ3rD8C4/5vncQMYJeM4UF\nOpj1z8gGGQUjAp7vZwOo/BQSi8YUnDh4RN16LZ00O7V81h174C+x4sikx5w5I54y\n0F0esBmB5VGaLSb5hnDHVnR5VtmRA+FVDLg+duE6qg1Z316LVvIHUIpjUALdatXZ\nVe/PinFjvoM/c7+y3wodYWICNJNUYt1bR0th2hQH1EkjzqQ9C+BvlFhEHC0XUDZG\nRgoKFZ2bAgMBAAECggEACpm5C/cyL6SAksJWwgf0SeERu9zDANNsN9Og0k05QN3c\ne5zvGzpkWnDkRzi//2lozdJ7JL3dRk9FyjkT8Cyheoe4GZrBPNtqwSzYGS4C7XbZ\nsMdHdotl9nt9shsamUNmnr9k/7RXDUbZibQMBVBfy0+CkIOO4wbtLhSoe2W2kQx+\nsuSa7SDz20ZgFMwqII9MNDv5EO1+7lPQdvIJ2+yRdc+mFiCuvVAgSFibGWGbwNFT\niBPiPTaUwZtQoMGXXfmqBzwCih0fEC79rIE852Nj+uKT4czkoQEOjL4x5j+wMzI7\nZUgVA6GXMQikvsS92R0r0y08V174epaiP5573YXqEQKBgQDWzAvyXPVIsN9hEbY0\nryWZow/iYMhbXBZP1DA8PsymHregDQyYtFLdE+G3M3npqy0qa8RQLWFwL1jxh4tT\npF0NvUDFSDxvhJQzjvkyXPIXJvDqV86e46ZjnNUD1wmiTafKtsFKKblsuszO1M0q\nUT9ed2F3aSig5rpL+UaNL3PBiQKBgQC+6Zeq2XbXL3g6ftM83tM24AFG5g1PZQGS\ncSFZmgjKyLLOMUt56AF8pxEiciaJKmxi5Fvs/WEdr+E9G83O1p+yxYs1bUMU88fx\n1F9fQzz0/W8q+WzovWnnvSAD8v+W1wLuyHFT7tbhWLnt6wtbPE99/oLUTkWLgesK\nsRCElg5RAwKBgQDJdFJ4G0tJw+mdxtjXDLX9JHxPW2pOlU2vzVj4CAY0f3bFO7fm\nuKlHA9Cc3ECpMYyIzs4uTIGokB+hV/kKl4tWyXsoDJnyFaxRtvRtkdLUeAdYIsZ9\nKxHxNzRqB5LXkHGgpEsg3YU1PvW7vsY1vEHsvZbCQfSDBCMSAldzL2An0QKBgFzP\nSoAwP+nUleo6BY8t9BhVRcmlxQq328/JV6ErlOKgNuyuYjbdZvumbFoGjF1aVl6t\nDVNkynWYLzN59M983x4VkttiRp5E9QrHZ6X0Fgozunt1zlBG5NlXw9ynoUE/PZm/\nr/hRv/zFGX5kKZ0s8KgbtpZnhr+PZShJc/JA0KzpAoGAKavWw4UJUvKs6vr/g0Rs\nA3GJu1igNkN1mDCXlLIbVe7JfLFUbDAQz6TTSfamwdB0D+2lrt2mDj6tVGNET8fk\nBkwyc+JRXS+TPdCO5IQ5SdAQrFScT6ZF1/N0Qz5Bo9z9jLZXly5MqKuG60YDwuJL\n4f8XXz4HA4ZmOc51tUcpNRc=\n-----END PRIVATE KEY-----\n",
  "client_email": "dialogflow-gpwnqn@esoteric-accord-232906.iam.gserviceaccount.com",

}

app.use(cors())
app.use(express.static('public'))

app.get('/token', async (req, res) => {
  let token = await getToken();
  res.send({ token });
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname +'/public/index.html'));
});

const getToken = async () => {
  return new Promise((resolve) => {
    googleAuth.authenticate(
      {
        email: config.client_email,
        key: config.private_key,
        scopes: ['https://www.googleapis.com/auth/cloud-platform',"https://www.googleapis.com/auth/dialogflow"],
      },
      (err, token) => {
        resolve(token);
      },
    );
  });
}

app.listen(3001,()=>{
  console.log("Magic...Magic on 3001");
  
});