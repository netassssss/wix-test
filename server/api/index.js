const express = require('express');
const { getAdminDB } = require('../db/admin');

const getTree = require('./categories/get-tree');
const setNode = require('./categories/add-node');

const router = express.Router();

router.get('/get-tree', getAdminDB(getTree));
router.post('/add-node', getAdminDB(setNode));

module.exports = router; // exporting router so that it can be used in app.js
