  var App = angular.module("myApp", []);

  App.controller('masterCtrl', function($scope) {

    $scope.selectedfoods = [];
    $scope.caloriecount = 0;

    $scope.nutrition = function(){

      var search = $("#searchinput").val();

      if(search === ""){
        alert("Insert Value");
        return;
      }

      console.log(search);

      var getfoods ="https://api.nutritionix.com/v1_1/search/"  + search + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=10255e71&appKey=b4f75c60500bb906ab03f89ac838b633";
      console.log(getfoods);

      $scope.foodarray = [];

      $.getJSON(getfoods , function(data){



        console.log(data);

        var getfoodinfo = data.hits;

        for(var i = 0; i<getfoodinfo.length; i++){

          var foodinfo = getfoodinfo[i];

          var brandname = foodinfo.fields.brand_name;
          var calories = foodinfo.fields.nf_calories;
          var itemname = foodinfo.fields.item_name;

          $scope.foodarray.push({

            brandname: brandname ,
            calories: calories ,
            itemname: itemname
          });

        }


        $scope.$apply(function(){
          console.log($scope.foodarray);
        });

      });

    };


    $scope.addtocart = function(food){

      console.log(food);
      $scope.selectedfoods.push(food);
  $scope.updatecal();
    };

    $scope.remove = function(food){
      console.log(food);
      var index = $scope.selectedfoods.indexOf(food);
      console.log(index);
      $scope.selectedfoods.splice(index , 1);
      $scope.updatecal();
    };

    $scope.updatecal = function(){

  $scope.caloriecount = 0;

  $.each($scope.selectedfoods , function(index,food){

  console.log(index);
  console.log(food);
  $scope.caloriecount = parseInt($scope.caloriecount) + food.calories;

  });
    };
  });
