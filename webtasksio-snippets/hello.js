module.exports = function (ctx, cb) {
    cb(null, 'Hello here, ' + ctx.data.user);
}
