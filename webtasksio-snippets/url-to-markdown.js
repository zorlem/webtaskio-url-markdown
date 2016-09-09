var request = require('request');
var qs = require('querystring');

module.exports = function (ctx, cb) {

    var targeturl = ctx.data.url;

    var markdownurl = 'http://fuckyeahmarkdown.com/go/?output=markdown&u='
    var url = markdownurl + qs.escape(targeturl);
    request.get({url: url}, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            cb(null, body);
        } else {
            console.log('Url: ' + url + 'Error: ' + error + ' Response code: ' + response.statusCode);
            return cb(error);
        };
    });
};
