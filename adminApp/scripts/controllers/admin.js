app.controller('AdminCtrl', function ($scope, registrationService) {

    var readAll = function () {
        registrationService.readAll().then(function (receivedRegistrationList) {
            $scope.registrationList = receivedRegistrationList;
        });
    }

    readAll();

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.canConfirm = false;
    $scope.canUregister = false;
    $scope.canCheckin = false;
    $scope.canEmail = false;
    $scope.canUnselect = false;

    $scope.updateLegalActions = function (registrations) {
        var unique = {};
        var distinct = [];
        for (var i in registrations) {
            if (typeof(unique[registrations[i].state]) == "undefined") {
                distinct.push(registrations[i].state);
            }
            unique[registrations[i].state] = 0;
        }

        if (distinct.length != 1) {
            $scope.canConfirm = false;
            $scope.canUnregister = false;
            $scope.canCheckIn = false;
        }
        else if (distinct[0] == "confirmed") {
            $scope.canUnregister = true;
            $scope.canCheckIn = true;
        }
        else if (distinct[0] == "registered") {
            $scope.canUnregister = true;
            $scope.canConfirm = true;
        }

        if (registrations.length > 0) {
            $scope.canEmail = true;
            $scope.canUnselect = true;
        }
        else {
            $scope.canEmail = false;
            $scope.canUnselect = false;
        }
    }

    $scope.gridOptions = {
        data: 'registrationList',
        selectedItems: [],
        columnDefs: [
            {field: 'state', displayName: 'Status', enableCellEdit: false},
            {field: 'person.name', displayName: 'Navn', enableCellEdit: true},
            {field: 'person.phone', displayName: 'Telefon', enableCellEdit: true},
            {field: 'person.email', displayName: 'Email', enableCellEdit: true, resizable: true},
            {field: 'created', displayName: 'Opprettet', cellFilter: 'date:\'dd.MMM.yy HH:mm\'', enableCellEdit: false},
            {field: 'updated', displayName: 'Oppdatert', cellFilter: 'date:\'dd.MMM.yy HH:mm\'', enableCellEdit: false}
        ],
        showGroupPanel: true,
        jqueryUIDraggable: true,
        filterOptions: $scope.filterOptions,
        showFooter: true,
        enableColumnResize: true,
        sortInfo: {
            fields: ['updated'], directions: ['desc']
        },
        i18n: 'nb',
        afterSelectionChange: function () {
            $scope.updateLegalActions($scope.gridOptions.selectedItems);
        }
    };

    $scope.unselect = function () {
        $scope.gridOptions.selectAll(false);
    };

    $scope.filterNephi = function () {
        var filterText = 'name:Nephi';
        if ($scope.filterOptions.filterText === '') {
            $scope.filterOptions.filterText = filterText;
        }
        else if ($scope.filterOptions.filterText === filterText) {
            $scope.filterOptions.filterText = '';
        }
    };

    $scope.confirm = function (registrations) {
        registrationService.confirm(registrations[0]._id).then(function (result) {
            readAll();
            console.log(result)
            alert(result)
        });


    };
});