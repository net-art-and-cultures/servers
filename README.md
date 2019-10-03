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


## express-server

in the `express-server` directory of this repo is a basic web server, like the last example this is a "static" web server, which means it serves static websites (ie. HTML, CSS && JavaScript) but does no other fancy server stuff. the difference is that rather than writing it from scratch, this server uses the [express.js](https://expressjs.com/) framework (which means there's a lot less code to write).

the `express-server` directory consists of:
- `pacakge.json` this is the projet's 'meta-data' file, most nodejs projects use this file to store info about the project like the author, version as well as any libraries/modules it depends on.
- `server.js` which is the server itself
- `node_modules/` this is where any/all third-party modules (libraries) get stored.
- `www/index.html` which is the website's html file
- `www/css/styles.css` which is the website's css stylesheet

to **run** this server make sure u `cd` into the `node-server` directory && then run `node server.js`. **NOTE:** ur server will fail if u don't have the dependencies downloaded, so u need to downloaded first (u only need to do this once) by running `npm install` (the npm command will check ur `pacakge.json` file for any dependencies && then downloaded them into a `node_modules` folder one by one)

[the documentation page for this server can be found here.](https://net-art-and-cultures.github.io/servers/docs/express-server/server.html)

# a note on dependencies

there are LOADS && LOADS of third-party libraries out there u could use in ur nodejs projects && the vast majority of them can all be found on the [npm (node package manager) website](https://www.npmjs.com/). to download libraries (called "modules" in node) from npm all u have to do is run `npm install library` (replacing the word "library" w/the name of the module u want to download) && then npm will download the module && save it in a folder called `node_modules`. but if u're going to be using libraries, it's best to create a `package.json` first.

in general, when u create a nodejs project (whether its a server or anything else) it's a good idea to create a `pacakge.json` file to store the projects meta-data in. u can use the **npm** command to create one, first make sure u `cd` into ur project folder && then run `npm init`, npm will then ask u a few questions (whose the author? what's the name of the project? what kind of license are u uisng?) u can answer as many as u want or just hit the enter key to set the default value.

once u have a `package.json` file u can download modules this way: `npm install library --save`, the addition of the `--save` option means npm will not only download the library u requested, but it will also note that dependency in ur `package.json` file. this is useful b/c when folks share their open source node project on sites like GitHub they will usually always add the `node_modules` folder to their `.gitignore` (like i've done in this repo) which means if u clone their projects it won't include those third party libraries (this is done for a few good reasons, including keep the size of ur repo no larger than it needs to be). && as long as the dependencies are listed in the `package.json` file then all u have to do to download them all is run `npm install`
