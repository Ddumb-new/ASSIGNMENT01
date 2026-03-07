**IMPORTANT - CD INTO YOUR APP -> demo**
`cd demo`

`npm install -g degit`

clone my code from last week, but degit downloads the latest version of a repo as a tarball and extracts it, without the .git folder.

`degit https://github.com/benvanarragon/comp2068_w26_express_starter.git`

**IMPORTANT - if you haven't already - CD INTO YOUR APP -> demo**
`cd demo`

-- inspect .gitignore file, notice node_modules here

-- now we need to structure the app in a scaffolded way,

--We want a structure that:
#separates server setup from API logic
#matches how real Express apps grow
#doesn’t introduce folders we aren’t using yet

-- this is our **CURRENT STRUCTURE**

demo/
├─ dist/
├─ node_modules/
├─ index.ts
├─ package.json
├─ tsconfig.json
├─ readme.md

**OUR DESIRED STRUCTURE**

demo/
├─ src/ # source code lives here
│ ├─ index.ts # App entry point (Express setup)
│ ├─ routes/ # API endpoints
│ │ └─ posts.routes.ts
│ └─ data/ # fake “database”
│ └─ posts.ts # Synthetic data array
├─ dist/
├─ node_modules/
├─ package.json
├─ tsconfig.json
└─ readme.md

==Step 1
delete the server examples folder

==Step 2
Create a new folder called `src` inside of your root project, in my example this is `demo`
Move `index.ts` into it

==Step 3
uncomment this line `"rootDir": "./src",` of code in `tsconfig.json` - this tells our app where the source code lives

==Step 4
create 2 NEW folders `routes` and `data` inside of the newly created `src` folder

==Step 5
save all your changes, and run either of the following commands
`npm run start`
OR
`npm run dev`

BEGNINNING OF BUILDING API

**IMPORTANT CONCEPT** - A REST API is just URLs that return data instead of pages.
Pages → HTML
APIs → JSON
Frontend frameworks like React consume APIs
Today, Express is not a website — it’s a backend

==STEP 1 `index.ts`== Add the following lines of code under `const port = 3000;`

`// Middleware: lets us read JSON bodies`
`app.use(express.json());`

We can also **delete** all of the old page routes from last week
**delete** any `app.get("/)`
We will build front end pages later with React, express will be API only

This turns JSON into req.body

==STEP 2 `src/data/` ADDING DATA==
Create a **NEW** file called `sushi.ts`
This is a static file, with .json structure data, and a defined type of Sushi

==STEP 3 `src/routes` == Creating new routes to access sushi data
Create a **NEW** file called `sushi.routes.ts`

```ts
// Import Router so we can create a mini "sub-app" for routes.
// Request and Response are used for typing the handler function.
import { Router, type Request, type Response } from "express";

// Import our sample data and the Sushi type definition.
import { sushiMenu, type Sushi } from "../data/sushi.js"; //has to be .js for compilation purposes when ts -> js

// Create a router instance (a small group of routes).
const router = Router();

//ROUTES WILL GO HERE

// Export the router so it can be mounted in the main server file (index.ts).
export default router;
```

==STEP 4 `src/routes/sushi.routes.ts` ==
create a GET request that fetches the sushiMenu data

```ts
// GET all sushi
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(sushiMenu);
});
```

==STEP 5 `index.ts` ==

import the newly created router into index.ts, after `import express`
`import sushiRouter from "./routes/sushi.routes.js";`

mount the route - connects the router to your main Express app and defines the base URL path where that router will respond.
`app.use("/api/sushi", sushiRouter);`

**app.get("/about") defines a single route that typically returns an HTML/text page, while app.use("/api/sushi", router) mounts a group of routes that return JSON data for an API.**

==STEP 5 ==

Go to **POSTMAN** and add a new route for a GET request at `http://localhost:3000/api/sushi`

It should return all sushi

==STEP 6 **GET A SINGLE RECORD** ==

Inside of `sushi.routes.ts` add code for retrieving a single record by ID

```ts
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sushi = sushiMenu.find((item) => item.id === id);

  if (!sushi) {
    return res.status(404).json({ error: "Sushi not found" });
  }

  res.status(200).json(sushi);
});
```

==STEP 7 ==

Go to **POSTMAN** and add a new route for a GET Request at `http://localhost:3000/api/sushi/1`

It should return one sushi

==STEP 8 **USING POST TO create a new resource** ==

```ts
// POST new sushi
router.post("/", (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      error: "Name and price are required",
    });
  }

  const newSushi: Sushi = {
    id: sushiMenu.length + 1,
    name,
    price,
  };

  sushiMenu.push(newSushi);

  res.status(201).json(newSushi);
});
```

==STEP 9 **TEST IN POSTMAN WITH POST** ==
Using POST, test at `http://localhost:3000/api/sushi/` and select `raw` and ensure `JSON` is the type, then type the following

```json
{
  "name": "Dragon Roll",
  "price": 14
}
```

Hit **SEND**

Now test with a GET request and see if your sushi was successfully added.

==STEP 10 **UPDATE A RECORD** ==

```ts
// PUT update sushi
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  const sushi = sushiMenu.find((item) => item.id === id);

  if (!sushi) {
    return res.status(404).json({ error: "Sushi not found" });
  }

  if (name !== undefined) sushi.name = name;
  if (price !== undefined) sushi.price = price;

  res.status(200).json(sushi);
});
```

==STEP 11 **TEST IN POSTMAN WITH PUT** ==
Test with a **PUT** at `http://localhost:3000/api/sushi/1` and in raw body pass

```json
{
  "name": "Spicy California Roll",
  "price": 9
}
```

Run a GET request to test if the new sushi updated.

==STEP 12 **DELETE A RESOURCE BY ID** ==

```ts
// DELETE sushi
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = sushiMenu.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Sushi not found" });
  }

  sushiMenu.splice(index, 1);

  res.status(204).send();
});
```

==STEP 13 **TEST IN POSTMAN** ==

Test in postman with **DELETE** at `http://localhost:3000/api/sushi/1`

Then test with a GET all and see if the record is deleted

== STEP 14 **ADD SWAGGER FOR API DOCS**==

run this command in your terminal,
`npm i swagger-ui-express swagger-jsdoc`

`npm i --save-dev @types/swagger-ui-express`
`npm i --save-dev @types/swagger-jsdoc`

restart your server
`npm run dev`

== STEP 15 **ADD IMPORTS AND SWAGGER SCRIPT**==

Inside of `index.ts` add these imports at the top of the file

```ts
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
```

add the follwing code **BEFORE** we call `app.use(express.json());`

```ts
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Sushi API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.ts"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

==STEP 16 **ADD OPEN API COMMENTS TO EACH ROUTE FOR SWAGGER TO PICKUP**==

//GET

```ts
/**
 * @openapi
 * /api/sushi:
 *   get:
 *     summary: Get all sushi
 *     responses:
 *       200:
 *         description: List of sushi
 */
```

//GET/:ID

````ts
/**
 * @openapi
 * /api/sushi/{id}:
 *   get:
 *     summary: Get sushi by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: sushi ID
 *     responses:
 *       200:
 *         description: Sushi item
 *       404:
 *         description: Not found
 */```
````
