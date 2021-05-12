const express = require('express');

const PORT = 3001;


app = new express();


app.get('/', (req,res) => res.send('ADORO'));


app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
