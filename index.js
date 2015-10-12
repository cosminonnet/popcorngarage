/**
 * Created by cmolea on 12/10/2015.
 */

var _ = require('lodash');
var async = require('async');
var querystring = require('querystring');
var request = require('./request');
var movies = require('./movies');


var seriesArray = [];

_.forEach(movies, function (movie) {
    seriesArray.push(function (seriesCallback) {
        var params = querystring.stringify({
            title: movie.content,
            lang: 'en'
        });
        request.send({
            host: 'popcorngarage.com',
            path: '/scripts/lookup.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': params.length
            }
        }, params)
        .then(function (result) {
            console.log(result);
            seriesCallback(null);
        })
        .fail(function (err) {
            seriesCallback(err);
        });
    });
});

async.series(seriesArray, function (err) {
    console.log("FINISH");
});