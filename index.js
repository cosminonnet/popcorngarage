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
var index = 0;

_.forEach(movies, function (movie) {
    seriesArray.push(function (seriesCallback) {
        var movieTitle = movie.content.toLowerCase().replace(/\W/g, '');

        if (movieTitle.length > 1) {
            setTimeout(function () {
                var params = querystring.stringify({
                    title: movieTitle,
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
                            console.log(++index + '. ' + data.xml.badgeid + ' - ' + data.xml.movie);
                        }
                        seriesCallback(null);
                    });
                })
                .fail(function (err) {
                    seriesCallback(err);
                });
            }, 1000);
        } else {
            seriesCallback(null);
        }
    });
});

async.series(seriesArray, function (err) {
    console.log("FINISH");
});