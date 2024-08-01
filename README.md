winds-mobi-client-js
====================

This is the current [winds.mobi](https://winds.mobi) web client but this project uses deprecated frameworks and tools like [AngularJS](https://angularjs.org) and is **no more actively maintained**. If you would like to share your own version that will eventually replace this client, please open an issue that presents your project.

### Requirements

- Installed [caddy](https://github.com/caddyserver/caddy) server

### How to build

```sh
docker run --platform=linux/amd64 --volume=./:/app node:4 npm --prefix=/app install
docker run --platform=linux/amd64 --volume=./:/app node:4 npm --prefix=/app run gulp --production
caddy run --config Caddyfile
```

Licensing
---------

Please see the file called [LICENSE.txt](https://github.com/winds-mobi/winds-mobi-client-js/blob/master/LICENSE.txt)
