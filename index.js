/**
 * Created by cmolea on 12/10/2015.
 */

var _ = require('lodash');
var async = require('async');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;
var request = require('./request');
var movies = require('./movies');

var seriesArray = [];
var results = [];

_.forEach(movies, function (movie) {
    seriesArray.push(function (seriesCallback) {
        setTimeout(function () {
            var params = querystring.stringify({
                title: movie.content,
                lang: 'en'
            });
            request.send({
                host: 'www.popcorngarage.com',
                path: '/scripts/lookup.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': params.length
                }
            }, params)
            .then(function (result) {
                parseString(result, function (err, data) {
                    if (data && data.xml && data.xml.badgeid) {
                        results.push(data.xml.badgeid + ' - ' + data.xml.movie);
                    }
                    seriesCallback(null);
                });
            })
            .fail(function (err) {
                seriesCallback(null);
            });
        }, 500);
    });
});

async.series(seriesArray, function (err) {
    results = _.uniq(results);

    for (var i=0; i<results.length; i++) {
        console.log((i+1) + '. ' + results[i]);
    }
});