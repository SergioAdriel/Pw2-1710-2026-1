const express = require('express');
const path = require('path');
const router = express.Router();
router.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, '../public','page1'));
});
router.get('/page2', (req, res) =>  {                           
    res.sendFile(path.join(__dirname, '../public','page2'));
});
module.exports = router; // Exporta donde estan las rutas
