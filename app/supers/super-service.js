"use strict";
var config_1 = require('../config');
var SuperService = (function () {
    function SuperService() {
    }
    SuperService.extractData = function (response) {
        var headers = response.headers;
        localStorage.setItem(config_1.Config.JWT_FIELD_NAME, headers.get('Authorization').split(" ", 2)[1]);
    };
    return SuperService;
}());
exports.SuperService = SuperService;
//# sourceMappingURL=super-service.js.map