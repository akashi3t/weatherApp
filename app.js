var app = angular.module("app", []);

app.controller('fooCtrl', function($scope,$http){
  $scope.isLoaded=false;
  var mysrclat= 0; 
  var mysrclong = 0;
  function nearme() {
    if (navigator.geolocation) {
      navigator.geolocation
      .getCurrentPosition(function (position) {
        mysrclat = position.coords.latitude; 
        mysrclong = position.coords.longitude;
        console.log(mysrclat);
        var url ='http://api.openweathermap.org/data/2.5/forecast/daily?lat='+mysrclat+'&lon='+mysrclong+'&cnt=6&appid=29792cdd815ead79fea5f53f759d13de&units=metric';
        //console.log(url);
        $http.get(url).then((responce)=>{
          $scope.reports = responce.data;
          $scope.reports.list.forEach((day)=>{
            date = day.dt;
            var theDate = new Date(date * 1000);
            dateString = theDate.toGMTString();
            day.dt = dateString;

          });
          //console.log($scope.reports);
          $scope.list = $scope.reports.list;
          $scope.date = $scope.list[0].dt;
    //console.log($scope.date);
    $scope.imgSrc = 'http://openweathermap.org/img/w/'+$scope.list[0].weather[0].icon+'.png';
    //console.log($scope.imgSrc);
    $scope.temp = $scope.list[0].temp.day+'º';
    $scope.desc = $scope.list[0].weather[0].description;
    $scope.daymax = $scope.list[0].temp.max+'º';
    $scope.daymin = $scope.list[0].temp.min+'º';
    $scope.eve = $scope.list[0].temp.eve+'º';;
    $scope.night = $scope.list[0].temp.night+'º';
    $scope.humid = $scope.list[0].humidity;
        })
        $http.get('http://ipinfo.io').then((responce)=>{
          $scope.city = responce.data.city;
        });
      });
    }
  }

  $scope.showFullContent = function (get_index) {
    //console.log(get_index);
    $scope.date = $scope.list[get_index].dt;
    //console.log($scope.date);
    $scope.imgSrc = 'http://openweathermap.org/img/w/'+$scope.list[get_index].weather[0].icon+'.png';
    //console.log($scope.imgSrc);
    $scope.temp = $scope.list[get_index].temp.day+'º';
    $scope.desc = $scope.list[get_index].weather[0].description;
    $scope.daymax = $scope.list[get_index].temp.max+'º';
    $scope.daymin = $scope.list[get_index].temp.min+'º';
    $scope.eve = $scope.list[get_index].temp.eve+'º';;
    $scope.night = $scope.list[get_index].temp.night+'º';
    $scope.humid = $scope.list[get_index].humidity;
  }

  nearme();
});