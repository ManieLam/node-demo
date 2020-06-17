const express = require('express');
const router = express.Router();
const api = require('./api')

router.get('/', api.get())
router.post('/create', api.create({name: '散步'}))