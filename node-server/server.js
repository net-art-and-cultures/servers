// ### writing a server in nodejs from scratch (ie. using only "core" modules)

// the way u include libraries in node is through the `require()` function. in node libraries are typically called "modueles" (sometimes also "packages"). when u installed node, the installer also installed a tool a command line tool called "npm" (node pacakge manager), this is primarily used to download other modules (ie libraries) as well as organize/manage a project (more on that in the next example). when u installed node it also came w/a few modules by default which include the four we're using here ([http](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_http), [url](https://nodejs.org/dist/latest-v10.x/docs/api/url.html#url_url), [path](https://nodejs.org/dist/latest-v10.x/docs/api/path.html#path_path), [fs](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_file_system)), u can read more about these (&& the other "core" modules) on the node [documentation page](https://nodejs.org/dist/latest-v10.x/docs/api/)

const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

// u might recall from a few weeks back that every application that needs access to the Internet needs to run on a "port" that isn't being used. this is b/c every app shares the same IP address which is assigned to the computer, so the computer needs some way to know where to send traffic it receives from the router.

const port = Number(process.argv[2]) || 8000

// a typical web server usually runs on port 80, however because this port requires root privleage (meaning u have to run ur command w/"sudo"), during development most programmers choose a port like 8000 or 8888, or sometimes also 3000 or something like that.

// this port can be hard coded into the server itself, but it's usually a good idea to make this variable. one way would be to pass the port in as an argument like we did in class: node server.js 8888 && then we can grab that number using process.argv[2] && assign it to a variable.

// but what if the user running the server forgets to pass in a port number? in JavaScript the || (ie "or") operator can be used to set a default value, where u say let y = x || 10 (read "let y equal x or 10"), if the variable x is undefined, then y will be 10, otherwise y will be x. (also worth noting that we're using the `Number()` function here to convert the String passed in by the user into an actual Number type)

// the point of a server is to wait, always on && patiently running on a computer connected to the Internet. it sits there listening for "requests" from "clients", like browsers "visiting" the website the server is hosting (our website is inside the www directory which is inside the node-server directory along side this server.js file). when we write a server, it's up to us to decide how to "handle" these incomming requests, by parsing out the information that comes in that request packet && deciding what to send in our "response". we write this logic inside of a function, we can call it whatever we want, i'm calling mine "requestListener" (b/c that's what it's doing).

function requestListener (req, res) {
  // inside this function we have access to the request (which i'm calling "req" for short) && the response (which i'm calling "res" for short). the first thing we want to do is use the `url` module we imported above to parse out the pahtname from the request object's url property (if the client requested "website.com/pizza/party" then the pathname would be "/pizza/party" we need this info to know which files to send back to them)
  const uri = url.parse(req.url).pathname
  // everytime a client requests something from our server, this funciton will run. here i'm logging to my terminal the value of uri so that i can see everytime the client requests a file. (note: i'm using JavaScript [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) here so i can pass variables into a string)
  console.log(`URI requested: ${uri}`)

  // here i'm writing the path to the file they're looking for. in node there is a global variable called `__dirname`, this is the path to the directory ur server is in, for example `/Users/nick/Documents/node-server/`, here i'm using JavaScript template strings again to combine variables into a string, after the dirname path i've added `/www` (which is where my website files are) && then the uri (which if they visited my home page would just be "/" ). so an example of what the data stored in this filepath variable might look like would be "/Users/nick/Documents/node-server/www/" or if they requested the CSS page it would be "/Users/nick/Documents/node-server/www/css/styles.css"
  let filepath = `${__dirname}/www${uri}`

  // when the users requests a website, i'm likely to send them back an .html file, but that .html file might itself be referencing other fils (like .js files or .css files), if that is the case, the browser will automatically create subsequent requests for these other files. here i'm creating an object which maps file extentions to their file types, so for example contentType['.html'] would return 'text/html', we will need this later.
  const contentTypesByExtension = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
  }

  // now it's time to find the file they requestd && send it back in the response. the file system `fs` module we imported above can be used to "read" (ie load/open) && "write" (create/save) files to/from our hard drive. we'll use the `.stat()` method to check if there is the filepath actually exists.
  fs.stat(filepath, (err) => {
    // ...if we get an "err" then it means this path doesn't actually exist, so we'll create an error response to send back to the client. in the "head" of our response packet we'll specify the classic web error code "404" (which means we couldn't find any files at the requested path), in the "body" of our response we'll write the message "404 not found" && then send it back.
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('404 Not Found\n')
      res.end()
      // by calling "return" here we eseentially jump out of our requestListenerfunction && skip the rest of the code below.
      return
    }

    // if we did not get an error, than the next thing we need to check && see is whether or not the `uri` they requested has a file a the end of it, for example website.com/css/styles.css requests a specific file, but if they did website.com/pizza or website.com then they're requesting a folder, not a file. we'll assume they want a file in that folder called "index.html" && add that to the end of the filepath variable (index.html is we call the default file in a web directory by convention)
    if (fs.statSync(filepath).isDirectory()) filepath += '/index.html'

    // now that we're guarenteed to have a path to a specific file stored in our `filepath` variable we can use the `.readFile()` method of the `fs` module to open up the actual file, we need to pass this method 3 arguments, first the path to the file we want to open, then the encoding type (this is optional) && then a [callback function](https://www.learn-js.org/en/Callbacks).
    fs.readFile(filepath, 'binary', (err, file) => {
      // ...if we get an error in the callback function we should send a response explaing that the server had an error. this is very simiar to the response we crafted above, except we'll send a 500 error code (which are used for server errors) && we'll pass the error message along directly into the response
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.write(err + '\n')
        res.end()
        return
      }

      // if there was no error && we were able to open the file, then we'll send the data in this file back as our response. unlike our previous responses which specified in their headers that the response contained 'text/plain' type of file, here we'll use the contentTypesByExtension object we made before to specify in the header the type of file we're sending back (text/html, text/css or text/javascript). we'll also use a different status code, in this case "200" which means everything worked out "OK"
      let headers = {}
      let contentType = contentTypesByExtension[path.extname(filepath)]
      if (contentType) headers['Content-Type'] = contentType
      res.writeHead(200, headers)
      res.write(file, 'binary')
      res.end()
    })
  })
}

// so now that we have a function ready to handle any requests coming from a client we can finally create our server. we'll use the `http` modules `.createServer()` method to create a new server variable. the createServer function requires that we pass it a function that can handle requests (so we'll send it the one we made called requestListener)
const server = http.createServer(requestListener)
// once we've got our server we'll run it's `.listen()` method passing in our port variable so that it starts listening on that port
server.listen(port)

// lastly we'll log a message to the console (making use of JavaScript template strings again) noting what port we're running the server on as well as a message for how to quit the server in the terminal.
console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
