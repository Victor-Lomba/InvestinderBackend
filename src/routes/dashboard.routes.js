const express = require('express');

const Consultores = require('../services/user/indexCons');
const Investidoresores = require('../services/user/indexInv');

const indexRouter = express.Router();

indexRouter.get('/cons/:id', Consultores.index);

indexRouter.get('/invs/:id', Investidoresores.index);

module.exports = indexRouter;
