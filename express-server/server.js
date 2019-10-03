// ### writing a server using the [express.js](https://expressjs.com/) framework

// assuming u've already download the expressjs library && all of it's dependencies into the `node_modules` folder (see the repo's [README](https://github.com/net-art-and-cultures/servers) for instructions) we can start by importing the express module just like we did the core modules in the last example
const express = require('express')

// it's SO MUCH easier to create a server using express than doing it from scratch like we did in the last example, we start by using the express module as a function to create our server (we'll call it "app" because that's the convention, unlike the last example where we called it "server")
const app = express()

// just like we did in the last example we'll create a variable to store our port number passed in by the user who runs the server, but we'll have a backup default port value in case they don't specify one.
const port = Number(process.argv[2]) || 8000

// in our last example we had to create all our responses from scratch, figuring out what file the client was requesting based on the request URI, then checking to see if that file existed on our hard drive, then creating a respnose from sratch with the right headers (which included the status codes && file types) and body data. but express can handle all of tha for us! we can do this by using the express module's `static()` method which takes a path to the directory we have all our static files stored in (which is the www folder just like the last example), here again we're using JavaScript [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) as well as the global node variable `__dirname` introduced in the last example. another important note here: in the last example we wrote our logic so that it could handle sending 3 types of files in the response, html, css && javascript. but there are lots of other types of files we might use in a website, like font files, images, videos, 3D objects, etc. the server we wrote from scratch wouldn't be able to handle those requests (unless we updated it of course), but our express server is ready for any/all filetypes.
const staticFiles = express.static(`${__dirname}/www`)
// then we'll need to tell our server (which we called "app") to "use" the staticFiles directory we specified in the previous line
app.use(staticFiles)

// now we're ready to start listening for requests using our server's `listen()` method (very similar to our last example)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
})
