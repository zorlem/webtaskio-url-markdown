var request = require('request');
var qs = require('querystring');
var mongoc = require('mongodb').MongoClient;

function save(mongouri, url, text, callback) {

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

    mongoc.connect(mongouri, function(error, db) {
        if(error) return callback(error);
        db.collection('mdpages')
            .update(address, doc, opts, (error, result) => {
                if(error) return callback(error);
                console.log('Saved URL: ' + url);
                db.close();
                callback(null, result);
            });
    });
};

module.exports = function (ctx, cb) {

    var targeturl = qs.escape(ctx.data.url);

    var markdownurl = 'http://fuckyeahmarkdown.com/go/?output=markdown&u='
    var url = markdownurl + targeturl;
    request.get({url: url}, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log('Success getting text for url:' + url);
            save(ctx.data.MONGO_URL, targeturl, body, cb);
        } else {
            console.log('Error: ' + error + 'Url: ' + url + ' Response code: ' + response.statusCode);
            return cb(error);
        };
    });

};
