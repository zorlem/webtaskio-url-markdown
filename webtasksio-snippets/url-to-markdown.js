var request = require('request');

module.exports = function (ctx, cb) {

    var targeturl = ctx.data.url;

    var markdownurl = 'http://fuckyeahmarkdown.com/go/?output=json&u='
    var url = markdownurl + targeturl;
    request.get({url: url}, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            cb(null, JSON.parse(body));
        } else {
            console.log('Url: ' + url + 'Error: ' + error + ' Response code: ' + response.statusCode);
            return cb(error);
        };
    });
};
