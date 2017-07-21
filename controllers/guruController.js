const copyright = "© 2017 Vidyanusa Institut Teknologi Bandung"

//Import untuk REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();

var async = require('async')

exports.kelas = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 4){//Bukan sebagai guru
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai guru
        return res.render('member/guru/kelas',{title : 'Manajemen Kelas', username: session.username, access_token:session.token})
    }

}

exports.daftar_kelas = function(req, res){
  var session = req.session

  //Mencek apakah pengguna masuk sebagai sebagai guru
  if(session.peran == null || session.peran != 4){//Bukan sebagai guru
      return res.redirect('/')//Di arahkan ke route index
  }else{//Sebagai guru
      return res.render('member/guru/daftar_kelas',{title : 'Daftar Kelas', username: session.username, access_token:session.token})
  }
}
