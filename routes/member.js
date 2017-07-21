var express = require('express');
var router = express.Router();

var member_controller = require('../controllers/memberController');
var guru_controller = require('../controllers/guruController');

router.get('/', member_controller.index);

router.get('/dashboard', member_controller.dashboard);

router.group("/guru", (router) => {
    router.get("/kelas/", guru_controller.kelas);
    router.get("/kelas/daftar", guru_controller.daftar_kelas);
});

module.exports = router;
