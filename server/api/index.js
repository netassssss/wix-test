const express = require('express');
const { getAdminDB } = require('../db/admin');

const getTree = require('./categories/get-tree');
const setNode = require('./categories/add-node');
const deleteNode = require('./categories/delete-node');
const updateNodes = require('./categories/update-node');

const router = express.Router();

router.get('/get-tree', getAdminDB(getTree));
router.post('/add-node', getAdminDB(setNode));
router.post('/delete-node', getAdminDB(deleteNode));
router.post('/update-node', getAdminDB(updateNodes));

module.exports = router; // exporting router so that it can be used in app.js
