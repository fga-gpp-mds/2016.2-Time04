angular.module("app.controllers")

.controller("editPevCtrl", function($scope, $http, factoryEditPEV, $state, $rootScope, $ionicPopup,findPevService, URL){
    var index;
    $http.get(URL+"/pevs/getonepev")
    .success(function(pev){
      $scope.pev = pev;
      findPevService.findIndex(pev);
    })

    .error(function(result){
      console.log("error");
    });

	$scope.confirmEditPEV = function(pev) {
			$ionicPopup.confirm({
			title: 'Edição da PEV',
			template: 'Deseja finalizar a edição desta PEV?'
		})

   	.then(function(res) {
			if(res) {
			    factoryEditPEV.save(pev, function(result){
            index = findPevService.getIndex();
            $rootScope.pevs[index] = pev;
						var alertPopup = $ionicPopup.alert({
  						title: 'PEV editada com sucesso',
  						template: 'Obrigado por contribuir!'
						});
            $state.go("tabs.map")
					}, function(erro){
						console.log(erro);
					})
			} else {
			console.log('não');
			}
		});
	};
})