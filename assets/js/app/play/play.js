var canvas = function (ng, module, presentation) {
    var timeStamp = new Date(presentation.recordingStarted).getTime();
    var resume = _.find(presentation.script, function (instruction) {
        return ng.equals(instruction.fnName, "resume");
    });
    ng.module(module, [
            'ui.router',
            'ui.bootstrap',
            'templates-app',
            'templates-common',
            'sokratik.atelier.player'
        ])
        .run([ "$rootScope", function ( $rootScope) {
            $rootScope.$on('$stateChangeStart',
                function () {
                    $rootScope.loading = true;

                });
            $rootScope.$on('$stateChangeSuccess',
                function () {
                    $rootScope.loading = false;

                });
        }])
        .controller('AppCtrl', ["$state",  function ($state) {
            $state.go("play.init", {presentationId: presentation._id, scriptIndex: 0, timeStamp: timeStamp, pausedInterval: 0});

        }]);
};

(function (ng) {
    ng.element(document).ready(function () {
        var presentation = JSON.parse(ng.element(document).find("presentation").attr("value"));
        atelierPlayer(ng, "sokratik.atelier.player", presentation);
        canvas(ng, "sokratik.canvas", presentation);
        ng.bootstrap(document, ["sokratik.canvas"]);
    });
})(angular);

