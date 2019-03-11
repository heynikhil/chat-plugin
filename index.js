const express = require('express');
const googleAuth = require('google-oauth-jwt');
const cors = require('cors')
const path = require('path')
const app = express();

const config = {
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC79cej0OG6Hceu\nEB8W1UvZMd/sZ7jWosncI3RYz4j7iAMV7l283KGFcr7fyjDjacNXR3eq4alQW+fX\nYvTDLzMB+KQV6Y2dIPmaKsXBeQxPnpFSai52VqfW20Q0rbgEiIfmV8cQGkErZFZt\nHI4r6fl2kS15tYI1fuhh2Dh0ZdCF1SlStVsB8cekXZBr/Zk2gIYgos+lUZZEUka7\nCg4xqIzQdxPaEzuWaVVrZED770tf+nJXQjJ9+ycf/Czsmb/xH4hreiPAvDsQyO7x\nW8z0x2zQ0KqSPYbPWVbqytYV71nFHBBfOtHrwFOMGT4wSgXIz/VSterK7CNPs4s6\nLUoizr4xAgMBAAECggEAS54fyTn59iSQ9ugpecgqEaFNExDPfhpT16qz3h7wXzFi\n/Gm/cIHawZNeUy5G6Nbd7bkk3ayXr2qqJS78haHxhXOAoAgsHvDrOijHEoUefNGw\naVWqh5VpRLlGAWN6SuiatALQZRwK5+ggFRmN4QDqidbyUqrBTcBWwTZ5z+o+L/jW\n80+/sys9qo1zAF+cpMZjlDTFG//n/CKeP7kXN10nRz03DajQRtMVIx69pcPP7UEB\nwZK3Rs7n+CaU4f6DtCcJgBQElqrvzFC5DmvO1fFRC+KC2L3sM8PRFqVW05YHBdrZ\nWcSlX12Xn5iBikq+hI4rq001GAqofE/G2K+qEuTPGQKBgQDtJ6HxR20N3oGtajz9\n1Tfni21zF5KgTVjeNZpoZxDv+RUSObPVXH4LvcXCo8HzAqfNcW0SUsd82sAAyqzX\noS/KpWYGUwzMDyZDGLe1jth+31lMSSc6czLvzEb8VErm1M8ecutxN9AZRFx4T3C9\nzimt4QUVrK6rFuR7c2uvLmK7GwKBgQDK5WTTq2HIarIQCoYWeRTOZ+uJjzFHwcen\nOMHRylEYoiGcO0xejyyr+ZZUgtiGtQxvULW3i0j1zMYiTQqVImlJsiPWfABs75Ic\n7lzF10y2oFuNotp6j4hJEtcQ4LlMjG4ey1Yzv3bApdciA3NX3t+t51J9zGRDeHsk\nH3n7F7KUowKBgQDHpcnLWZoRRvRcjUdzWYCKyPIHJh0mHndl+jJXGg1EOKjogvNF\n92uVbtmBlmK8tcuWRJrSBiYykeV5xSXlEakuLDfLszbewxIvAiwGCI9xn42Jjzwb\nFMgY4BwSaNP1p8oFlDFpStdBri86iYYcA+dKnliteoZBOjB3TR+mhqJPaQKBgA2N\nyXCCcGPNDNwZd9+kcwle09M6p5YdkdLP7dKv6z70Bb7ED1P5yIgsgihfHUvSaGQ/\nRgRe357b8Rh1gRF5XQM5TT+UxQqB7obUPYpR2aQRjkwl5uZtFDOdeJR+DqLYdrrD\n5pxKXAp+iaKSDHCASPz7CP2yW7hOIhvFpoZpjNp1AoGBANgn+wSogMUBCA7223tb\nDY8IeVCe8pdFQliqwguwMs9rbaIJhCe2YIz3+bRweJlieiXJuxGEihW2UGUVP7Ch\nJsvM69g+oLpvG2UJGF/ch1lwKXaIi7nlAhR22C+kHt0In+USrlZxMFg5VNFdNEgO\n4lMRq4ECTrVmJHZMeNI7pvYu\n-----END PRIVATE KEY-----\n",
  "client_email": "dialogflow-hllerg@plumbing-hvac-seo.iam.gserviceaccount.com",
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
  console.log("Magic...Magic on 1337");
  
});