`mkdir demo`

`cd demo`

`npm init -y`

`type nul > index.js`

`npm install express`

-- add code for express in index.js

`node index.js`

-- to incorporate typescript
-- install typescript
-- write typescript in a .ts file
-- transpile those .ts files -> .js
-- serve the .js files

-- in addition - add a 'watch' mode so .ts files are auto transpiled
-- automatically 'serve' the files using nodemon on file changes

`npm install typescript`

-- if we make it a .ts file, the types aren't recognized.
-- now at the moment, every thing is of the 'any' type
-- (Parameter 'res' implicitly has an 'any' type.)

-- we need to install type declarations for typescript
`npm install @types/express @types/node`

-- now change 'require' to keyword 'import'
-- import express from "express";

-- types are now automatically inferred, we can name them specifically in type annotations if needed
-- app.get, or app.post now are automatically filled

-- we can't run the file at this point, as a .ts file, because we need to transpile it to js first

-- in order to do this we need a typescript config file

`npx tsc --init`

-- uncomment "outDir": "./dist" - so now when we transpile the code from .ts -> .js it will show in the distribution directory

-- because we are using `IMPORT` instead of `require` we have to add "type": "module" to the package.json file to tell Node to treat your project files as ESM modules, so you can use import/export instead of require

--multiple ways to do this, type it manually
add `"type": "module",` under the description in `package.json` , or try running

-- now run the tsc (typescript compiler)
`npx tsc`

-- we will get a new 'dist' folder, with the compiled .js code
-- inspect the dist/index.js code

--if we get an error on the .ts file, stating 'ECMAScript imports and exports cannot be written in a CommonJS file' then that means we are missing

--we have to add "type": "module" to the package.json file to tell Node to treat your project files as ESM modules, so you can use import/export instead of require

--multiple ways to do this, type it manually
add `"type": "module",` under the description in `package.json` , or try running

`npm init --type=module` -- this MAY work, if not do the steps above

-- now we can transpile it without errors, if you have not already, run
`npx tsc`

-- once the code is transpiled, and in a /dist folder, we can run
`node dist/index.js`

--the server should now be running fine

-- now to automate some SCRIPTS
-- add a 'watch' mode so .ts files are auto transpiled
-- automatically 'serve' the files using nodemon on file changes

-- add the following lines of code to the `package.json` file
-- these are custom scripts that are easier to run as a developer

```js

"scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js"
  },

```

-- make a change to your `res.send` text, save, and now we can run the following commands in the terminal, we should see some updates

`npm run build`

`npm run start`

-- NOW, lets get a dev server going that will automate this process,
-- anytime .ts file changes, .js files will be rebuilt, using typescripts watchmode,
-- and nodemon wil auto restart the server

-- install nodemon as a dev dependency - because it automatically restarts the server during development and isn’t needed in production

`npm install -D nodemon`

-- we also need to install a package called `concurrently`
-- this will allow us to run to commands in parallel from one script

`npm install -D concurrently`

-- now we can add another script to our `package.json` to the scripts section, under our `build` and `run` commands
-- this will set typescript to watch mode, and auto restart the index.js server when a change is made

` "dev": "concurrently \"npx tsc -w\" \"nodemon dist/index.js\""`

-- now that it is watching for changes, make a change to a file
-- add a new route

--in index.ts, add a new route below `app.get("/")` block

```ts
app.get("/about", (req, res) => {
  res.send("About page");
});
```

-- now save the file, and DON'T RESTART THE SERVER, JUST REFRESH YOUR PAGE
-- and vist the new /about page

-- one last issue we have, is that we MAY have old files in our /dist folder, that are no longer used if we don't have them in the transpilation...so we should remove the rimraf package

`npm install rimraf`

-- we will delete the entire dist folder, each time we build a new transpiled version of the .ts code to -> .js

change the `build` script in `package.json` to

`"build": "rimraf dist && npx tsc",`

-- now if i add a brand new file to dist, and then run

`npm run build`

-- that unused file will be deleted, and a new dist folder is compiled.

--the last step is adding some PRE SCRIPTS
-- THESE WILL RUN BEFORE THE START AND DEV SCRIPT AUTOMATICALLY, I DON'T HAVE TO CALL THEM

-- in the scripts section add a script before `start` called `prestart`

`"prestart": "npm run build",`

-- as well as add a script before `dev` called `predev`

`"predev": "rimraf dist",`
