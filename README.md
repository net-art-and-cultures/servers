# WWWeb (HTTP) Servers written in JavaScript (Nodejs)

this repo contains a couple (i'll try to make some more soon) examples of some basic web servers written in JavaScript. below is a breakdown of what's contained in each. email me to request other examples.

## node-server

in the `node-server` directory of this repo is a basic web server written entirely from scratch. which means it doesn't use any third party libraries or frameworks, it uses only "core" node modules. **I would generally advice against creating a server from scratch this way**. it's best to use a framework like express.js (see following example). the purpose of this repo is to *understand* how a server works at a more fundamental level. doing things "from scratch" is always a great way to understand how things work, but it's not a practical way to develop complex applications (for that it's always best to find the right library or framework).

the `node-server` directory consists of 3 files:
- `server.js` which is the server itself
- `www/index.html` which is the website's html file
- `www/css/styles.css` which is the website's css stylesheet

to **run** this server make sure u `cd` into the `node-server` directory && then run `node server.js`

[the documentation page for this server can be found here.](https://net-art-and-cultures.github.io/servers/docs/node-server/server.html)
