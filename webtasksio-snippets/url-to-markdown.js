var request = require('request');
var qs = require('querystring');
var mongoc = require('mongodb').MongoClient;

function save(url, text, db, callback) {

    var address = { 
        url: url
    };
    var doc = {
        $setOnInsert: { 
            markdown: text,
            $currentDate: { firstsaved: true }
        },
        $inc: { saved: 1},
        $set: { $currentDate: { lastsaved: true }}
    };
    var opts = {
        upsert: true
    };

    db
        .collection('mdpages')
        .update(address, doc, opts, function(error) {
            if(error) return callback(error);
            console.log('Saved URL: ' + url);
            callback(null);
        });
};

module.exports = function (ctx, cb) {

    var targeturl = qs.escape(ctx.data.url);

    var markdownurl = 'http://fuckyeahmarkdown.com/go/?output=markdown&u='
    var url = markdownurl + targeturl;
    request.get({url: url}, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            mongoc.connect(ctx.data.MONGO_URL, function(error, db) {
                if(error) return cb(error);
                console.log('MUR: ' + ctx.data.MONGO_URL);
                return function(cb) {
                    save(targeturl, body, db, function(error) {
                        if(error) return cb(error);
                        cb(null, "Success.");
                    });
                };
            });
        } else {
            console.log('Error: ' + error + 'Url: ' + url + ' Response code: ' + response.statusCode);
            return cb(error);
        };
    });

};
