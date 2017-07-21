var angularModule = angular.module('dashboardApp',[])

angularModule.controller('controllerDashboard', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()
  var base_api_url = 'http://apigeneral.vidyanusa.id';
  //var base_api_url = 'http://127.0.0.1:3500';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_url+'/profil',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    console.log("Responsenya: "+JSON.stringify(response))


    $scope.username = response.data.data[0].profil.username
    $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    $scope.foto = response.data.data[0].profil.foto
    $scope.bio = response.data.data[0].profil.bio


  }, function(data){
    console.log(data)
  });


})
