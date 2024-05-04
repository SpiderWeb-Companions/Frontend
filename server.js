// Can we not just dockerize this and run it in ec2?🤔
const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, 'public')));

// I can't think of a better way to do varaible injection 
// Sorry for whatever the fuck this is
app.get('/variables.js', (req, res) => {
    const secretsContent = `
        const API_ENDPOINT = "${process.env.API_ENDPOINT}";
    `;
    res.type('application/javascript').send(secretsContent);
});

app.use((req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(4200, () => {
    console.log('Server listening on http://localhost:4200');
});