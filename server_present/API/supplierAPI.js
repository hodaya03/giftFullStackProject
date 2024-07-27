const { Router } = require('express');
const app = Router();
const { insertToTable } = require('../BL/insertToTable');
const { fetchDataFromTableCondition } = require('../BL/selectCondition');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/suppliers', async (req, res) => {
    const { name, password, phone, email, city, country } = req.body;
    
    if (!name || !password || !phone || !email || !city || !country) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const parameters = 'name, password, phone, email, city, country';
    const columns = `'${name}', '${password}', '${phone}', '${email}', '${city}', '${country}'`;

    try {
        const myUsers = await fetchDataFromTableCondition('Business', 'Email', email);
        console.log('Existing users:', myUsers);
        if (myUsers.length === 0) {
            await insertToTable('Business', parameters, columns);
            res.status(201).send('Supplier registered successfully');
        } else {
            console.log('Supplier already exists:', email);
            res.status(409).send('Supplier already exists');
        }
    } catch (error) {
        console.error('Error registering supplier:', error);
        res.status(500).send('Error registering supplier');
    }
});

module.exports = app;
