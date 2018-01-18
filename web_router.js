var express = require('express');

// 首页相关
var site  = require('./controllers/site')



var router = express.Router();

router.get('/',site.index);

