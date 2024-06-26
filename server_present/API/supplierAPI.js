const { Router } = require('express');
const app = Router();
const {insertToTable} = require('../BL/insertToTable')

app.use(bodyParser.json());

app.post('/api/suppliers', async (req, res) => {
    const { name, password, phone, email, city, country } = req.body;
    
    if (!name || !password || !phone || !email || !city || !country) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const parameters = 'name, password, phone, email, city, country';
    const columns = `'${name}', '${password}', '${phone}', '${email}', '${city}', '${country}'`;

    try {
        insertToTable('Suppliers', parameters, columns);
        res.status(201).send('Supplier registered successfully');
    } catch (error) {
        console.error('Error registering supplier:', error);
        res.status(500).send('Error registering supplier');
    }
});


  module.exports = app;