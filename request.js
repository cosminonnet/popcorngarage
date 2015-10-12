/**
 * Created by cmolea on 12/10/2015.
 */

/**
 * Module dependencies.
 */
var http = require('http'),
    q = require('q');

module.exports = {

    send: function (options, parameters) {
        var data = '',
            deferred = q.defer(),
            request = http
                .request(options, function (res) {
                    res.on("data", function (chunk) {
                        data += chunk;
                    });

                    res.on("end", function () {
                        deferred.resolve(data);
                    });
                })
                .on('error', function (error) {
                    deferred.reject(error);
                });


        if (parameters) request.write(parameters);
        request.end();

        return deferred.promise;
    }

};
