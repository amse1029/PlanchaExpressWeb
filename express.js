const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hola mundo WEB');
});
app.listen(3000, () => {    
    console.log('Servidor levantado y escuchando por el puerto 3000!');
});