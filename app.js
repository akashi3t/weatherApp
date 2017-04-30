var app = angular.module("app", []);
var API_URL = 'http://api.openweathermap.org/data/';
var FORECAST_URL = API_URL+'2.5/forecast/daily?'; 
app.controller('fooCtrl', function($scope,$http){
  $scope.dataLoaded=false;
  var mysrclat= 0; 
  var mysrclong = 0;
  function init() {
    get_location(function(position){
      mysrclat = position.coords.latitude; 
      mysrclong = position.coords.longitude;
      get_forecast(mysrclat,mysrclong,function(responce){
        $scope.reports = responce.data;
        $scope.reports.list.forEach((day)=>{
          date = day.dt;
          var theDate = new Date(date * 1000);
          dateString = theDate.toGMTString();
          day.dt = dateString;
        });
        $scope.list = $scope.reports.list;
        console.log($scope.list);
        $scope.date = $scope.list[0].dt;
        $scope.imgSrc = 'https://openweathermap.org/img/w/'+$scope.list[0].weather[0].icon+'.png';
        $scope.temp = $scope.list[0].temp.day+'º';
        $scope.desc = $scope.list[0].weather[0].description;
        $scope.daymax = $scope.list[0].temp.max+'º';
        $scope.daymin = $scope.list[0].temp.min+'º';
        $scope.eve = $scope.list[0].temp.eve+'º';;
        $scope.night = $scope.list[0].temp.night+'º';
        $scope.humid = $scope.list[0].humidity;
        $scope.dataLoaded = true;
      });
    });
    get_city((responce)=>{
      $scope.city = responce.data.city;
    });
  }
  $scope.showFullContent = function (get_index) {
    $scope.date = $scope.list[get_index].dt;
    $scope.imgSrc = 'https://openweathermap.org/img/w/'+$scope.list[get_index].weather[0].icon+'.png';
    $scope.temp = $scope.list[get_index].temp.day+'º';
    $scope.desc = $scope.list[get_index].weather[0].description;
    $scope.daymax = $scope.list[get_index].temp.max+'º';
    $scope.daymin = $scope.list[get_index].temp.min+'º';
    $scope.eve = $scope.list[get_index].temp.eve+'º';;
    $scope.night = $scope.list[get_index].temp.night+'º';
    $scope.humid = $scope.list[get_index].humidity;
  }
  init();
  function get_location(cb){
    if(navigator.geolocation) {
      navigator.geolocation
      .getCurrentPosition(function (position) {
        return cb(position);
      });
    }
  }
  function get_forecast(lat,long,cb){
    FULL_URL = FORECAST_URL+'lat='+lat+'&lon='+long+'&cnt=6&appid=29792cdd815ead79fea5f53f759d13de&units=metric';
    //console.log(FULL_URL);
    $http.get(FULL_URL).then((responce)=>{
      return cb(responce);

    });
  }
  function get_city(cb){
    $http.get('https://ipinfo.io').then((responce)=>{
     return cb(responce);  
    });
  }
});