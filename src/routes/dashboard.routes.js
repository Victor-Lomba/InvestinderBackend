const express = require('express');

const Consultores = require('../services/user/indexCons');
const Investidoresores = require('../services/user/indexInv');

const indexRouter = express.Router();

indexRouter.get('/cons', Consultores.index);

indexRouter.get('/invs', Investidoresores.index);

module.exports = indexRouter;
