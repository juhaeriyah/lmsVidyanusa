const copyright = "© 2017 Vidyanusa Institut Teknologi Bandung"

//Import untuk REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();

var async = require('async')

exports.index = function(req, res){

    var sess = req.session
    if(sess.peran != null){
        return res.redirect('/dashboard')
    }else{
        return res.redirect('/')
    }

}

exports.dashboard = function(req, res) {

    var session = req.session

    if(session.peran == 4){//Sebagai guru
      return res.render('member/guru/dashboard',{title : 'Dashboard', username: session.username, access_token:session.token})
    }else if(session.peran == 2){//Sebagai siswa
      return res.send('dashboard Siswa')
    }else if(session.peran == 3){//Sebagai sekolah
      return res.send('dashboard Sekolah')
    }else if(session.peran == 1){//Sebagai administrator
      return res.send('dashboard Administrator')
    }else if(session.peran == null){//Tidak terdaftar pengguna nya
      return res.redirect('/')
    }

};
