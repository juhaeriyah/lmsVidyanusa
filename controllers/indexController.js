const copyright = "© 2017 Vidyanusa Institut Teknologi Bandung"

//Import untuk REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();

var async = require('async')
var base_api_url = 'http://apigeneral.vidyanusa.id';
//var base_api_url = 'http://127.0.0.1:3500';

exports.index = function(req, res) {
    return res.render('index', { title: 'Selamat datang', copyright: copyright });
};

exports.masuk_form = function (req, res) {
  res.render('masuk', {title: 'Masuk', copyright: copyright })
}

exports.masuk = function(req, res) {

  args = {
  	data: { email: req.body.email,
            sandi: req.body.sandi
    },
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  rClient.post(base_api_url+'/masuk', args, function (data, response) {

      if(data.success == true){

          //Tampung hasil kembalian
          var idPengguna = data.data.id_pengguna
          var username = data.data.username
          var peran = data.data.peran
          var token = data.data.access_token

          //Deklarasi session
          var sess = req.session
          sess.id_pengguna = idPengguna
          sess.username = username
          sess.peran = peran
          sess.token = token

          return res.redirect('/dashboard')
      }else{
          req.flash('pesan', data.data.message);
          return res.redirect('/masuk')
      }
    });
}

exports.keluar = function(req, res) {
    var session = req.session

    args = {
    	data: { access_token: session.token
      },
    	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    rClient.post(base_api_url+'/keluar', args, function (data, response) {

        if(data.success == true){
            //Menghapus session
            req.session.destroy()
            return res.redirect('/')
        }else{
            req.flash('pesan', 'Gagal keluar');
            return res.redirect('/dashboard')
        }

      });

}

exports.daftar = function (req,res) {
  return res.render('daftar', { title: 'Daftar', copyright: copyright });
}

exports.daftar_default = function (req,res) {
  return res.render('daftar_default', { title: 'Daftar', copyright: copyright });
}

exports.daftar_siswa = function (req,res) {
  return res.render('daftar_siswa', { title: 'Daftar', copyright: copyright });
}

exports.daftar_guru = function (req,res) {
  return res.render('daftar_guru', { title: 'Daftar', copyright: copyright });
}

exports.daftar_guru_proses = function (req,res) {

  args = {
  	data: { email: req.body.email,
      username: req.body.username,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      sandi: req.body.sandi,
      sekolah: req.body.sekolah},
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  rClient.post(base_api_url+'/daftar/proses/guru', args, function (data, response) {

     //console.log('Data Login: '+inputan.email+inputan.password)
      if(data.success == true){

          //Tampung hasil kembalian
          var idPengguna = data.data.id_pengguna
          var username = data.data.username
          var peran = data.data.peran
          var token = data.data.access_token

          //Deklarasi session
          var sess = req.session
          sess.id_pengguna = idPengguna
          sess.username = username
          sess.peran = peran
          sess.token = token

          return res.redirect('/dashboard')
      }else{
          var pesan = ""
          console.log("ERROR: "+JSON.stringify(data))

          //Prosedur pengembalian error
          async.series({
              one: function(callback) {
                for(var i=0;i<data.data.length;i++){
                  pesan += data.data[i].msg+", "
                }
                callback(null, 1);
              },
              two: function(callback){
                req.flash('pesan', pesan);
                console.log('Pesan error:'+pesan)
                return res.redirect('/daftar/guru')
                //return res.json({'error':pesan})
                callback(null, 2);
              }
          }, function(err, results) {
              // results is now equal to: {one: 1, two: 2}
          })

      }

    });

}

exports.daftar_siswa_proses = function (req,res) {

  args = {
  	data: {
      email: req.body.email,
      username: req.body.username,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      sandi: req.body.sandi,
      kelas: req.body.kode_kelas},
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  rClient.post(base_api_url+'/daftar/proses/siswa', args, function (data, response) {

     //console.log('Data Login: '+inputan.email+inputan.password)
      if(data.success == true){

          //Tampung hasil kembalian
          var idPengguna = data.sessionid

          //Deklarasi session
          var sess = req.session
          sess.sessId = idPengguna

          return res.redirect('/dashboard')
      }else{
          var pesan = ""
          console.log("ERROR: "+JSON.stringify(data))
          async.series({
              one: function(callback) {
                for(var i=0;i<data.data.length;i++){
                  pesan += data.data[i].msg+", "
                }
                callback(null, 1);
              },
              two: function(callback){
                req.flash('pesan', pesan);
                return res.redirect('/daftar/siswa')
                callback(null, 2);
              }
          }, function(err, results) {
              // results is now equal to: {one: 1, two: 2}
          })


      }

    });

}
