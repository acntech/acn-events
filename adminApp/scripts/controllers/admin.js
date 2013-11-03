app.controller('AdminCtrl', function ($scope, registrationService) {
    registrationService.readAll().then(function (receivedRegistrationList) {
        $scope.registrationList = receivedRegistrationList;
    });

    $scope.gridOptions = {
        data: 'registrationList',
        columnDefs: [
            {field: 'state', displayName: 'Status'},
            {field: 'person.name', displayName: 'Navn'},
            {field: 'person.phone', displayName: 'Telefon'},
            {field: 'person.email', displayName: 'Email'},
            {field: 'created', displayName: 'Opprettet'},
            {field: 'updated', displayName: 'Oppdatert'}
        ],
        showGroupPanel: true,
        jqueryUIDraggable: true
    };
});