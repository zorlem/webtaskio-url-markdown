Saving web pages as Markdown using webtask.io and fuckyeahmarkdown.com
------------------------------

A JS snippet for Auth0's excellent webtask.io service. 

This webtask takes a URL as a parameter and runs the URL through fuckyeahmarkdown.com service. The resulting Markdown of the page is saved to a MongoDB database. The connection string for the database must be specified using a webtask secret token.

See [How it works](https://webtask.io/docs/how) and [If-this-then-nodejs with webtask.io](https://auth0.com/blog/if-this-then-node-dot-js-extending-ifttt-with-webtask-dot-io/) for additional details.
