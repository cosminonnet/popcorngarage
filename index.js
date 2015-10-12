/**
 * Created by cmolea on 12/10/2015.
 */

var _ = require('lodash');
var async = require('async');
var querystring = require('querystring');
var colors = require('colors');
var parseString = require('xml2js').parseString;
var request = require('./request');
var movies = require('./movies500');

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
                        console.log(movie.content.green);
                        results.push(data.xml.badgeid + ' - ' + data.xml.movie);
                    } else {
                        console.log(movie.content.red);
                    }
                    seriesCallback(null);
                });
            })
            .fail(function (err) {
                console.log(movie.content.black);
                seriesCallback(null);
            });
        }, 500);
    });
});

async.series(seriesArray, function (err) {
    results = _.uniq(results);

    console.log();
    console.log('PopCorn Garage Movies :'.green);
    console.log('-----------------------'.green);

    for (var i = 0; i < results.length; i++) {
        var result = (i + 1) + '. ' + results[i];
        console.log(result.green);
    }
});