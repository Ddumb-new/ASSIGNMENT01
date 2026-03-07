**IMPORTANT - CD INTO YOUR APP -> demo**
**https://www.mongodb.com/resources/products/compatibilities/using-typescript-with-mongodb-tutorial#setting-up-your-project**
`cd demo`

`npm install -g degit`

clone my code from last week, but degit downloads the latest version of a repo as a tarball and extracts it, without the .git folder.

`npx degit https://github.com/benvanarragon/comp2068_w26_week4`

**IMPORTANT - if you haven't already - CD INTO YOUR APP -> demo**
`cd demo`

==Step 1
Set up a new account at MongoDB

Paste your connection string below

**mongodb+srv://<db_username>:<db_password>@benscluster.lh9npfd.mongodb.net/?appName=BensCluster**

##### Adding the MongoDB NodeJS Driver

==Step 2 - Install the dependencies for mongodb, and the type dependencies as we are using TypeScript
`npm install mongodb`
`npm install dotenv`
`npm install -D @types/mongodb`

##### Adding MongoDB Atlas Connection String

==Step 3 - Setup .env and .gitignore
**Create a new file in your project folder called `.env` and if you don't already have a `.gitignore`**

==Step 4 - Edit the contents of .env and .gitignore

Inside of `.gitignore` add a line for `.env`, by doing this, the file .env is never committed, protects passwords

Inside of `.env` add the following 2 lines of code

```ts
DB_CONN_STRING = ;
DB_NAME = ;
COLLECTION_NAME = ;
```

Replace the values in your `.env` file with the connection string values above so it looks like

**Create a NEW DATABASE AND COLLECTION ON MONGO ATLAS HERE**
**Database will be called `myFirstDatabase`**
**Collection will be called `sushiMenu`**

**IMPORTANT - DO NOT PUT YOUR ENV VARIABLES IN DOUBLE QUOTES, THEY WON'T BE RECOGNIZED**

```ts
DB_CONN_STRING =
  mongodb+srv://<db_username>:<db_password>@benscluster.lh9npfd.mongodb.net;
DB_NAME = myFirstDatabase;
COLLECTION_NAME = sushi;
```

##### Creating Models with TypeScript

==Step 5 - We will no longer store mock data, so update folder names

rename the folder data - `src/data` to `src/models` and accept 'yes' to update the imports

Inside of `models/sushi.ts`

Delete all the code and add

```ts
import { ObjectId } from "mongodb"; //allows us to have an id value from mongodo

export default interface Sushi {
  //now an interface, instead of type
  _id?: ObjectId; // optional because MongoDB adds it
  name: string;
  price: number;
}
```

Here we are adding properties for our model and their data types, to take advantage of TypeScript. This allows the objects to be created, while also defining the properties. The id property has a ? after it to denote that it’s optional. Although every document in MongoDB has an id, it won’t always exist at code level, such as when you are creating a document. In this instance, the ‘\_id’ field is auto-generated at creation time.

Notice there is no static JSON data here, this will come from MongoDB

###### Step 6 Creating Services

Now we need to create our service that will talk to the database. This class will be responsible for configuring the connection.

**Create a new folder under src/ called `services` and inside that, create a `database.service.ts` file and paste the following outline:**

```ts
// External Dependencies

// Global Variables

// Initialize Connection
```

As this service will be connecting to the database, it will need to use the MongDB NodeJS driver and .env config. Paste the following under the “External Dependencies” heading:

```ts
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
```

We want to access our collection from outside our service, so, under the “Global Variables” heading, add:

`export const collections: { sushiMenu?: mongoDB.Collection } = {}`

Now we are ready to start coding in the key functions in this service. We want to have a function that can be called to initialize the connection to the database so it’s ready for when we want to talk to the database later in the code. Under “Initialize Connection,” paste the following:

```ts
export async function connectToDatabase() {
  dotenv.config();

  const connString = process.env.DB_CONN_STRING;
  if (!connString) {
    throw new Error("DB_CONN_STRING is not defined in environment variables");
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connString);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const collectionName = process.env.COLLECTION_NAME;
  if (!collectionName) {
    throw new Error("COLLECTION_NAME is not defined in environment variables");
  }

  const sushiCollection: mongoDB.Collection = db.collection(collectionName);

  collections.sushiMenu = sushiCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${sushiCollection.collectionName}`,
  );
}
```

There is quite a lot happening here, so let’s break it down. dotenv.config(); pulls in the .env file so the values can be accessed when calling process.env. The .config() call is empty as we use the default location for a .env file, which is the root of the project.

It then creates a new MongoDB client, passing it the connection string, including valid user credentials. Then it attempts to connect to MongoDB, the database, and the collection with the names specified in .env, persisting this to the global collection variable for access externally.

##### Step 7 Creating Routes

The first endpoint we will add is our default GET route:

Now that we have the functionality available to communicate with the database, it’s time to provide endpoints for the client side to communicate using Express and perform CRUD operations.

We already created routes last week in our `sushi.routes.ts` file, now we just need to connect them to MongoDB

Add the following lines of code to the top of `sushi.routes.ts`. Ths brings in our database service, and sushi interface we created earlier.

```ts
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import type Sushi from "../models/sushi.js";
```

**DELETE the old GET route, and replace with the following code**

```ts
router.get("/", async (_req: Request, res: Response) => {
  try {
    if (!collections.sushiMenu) {
      return res.status(500).send("Collection not initialized");
    }
    const sushiMenu = (await collections.sushiMenu
      .find({})
      .toArray()) as Sushi[];

    res.status(200).send(sushiMenu);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(String(error));
    }
  }
});
```

Here we are calling find on the collection. The find function takes an object in the first argument, which is the filter we want to apply to the search. In this case, we want to return every document in the collection so we pass an empty object.

The find function actually returns a special type called a Cursor which manages the results of our query, so we cast it to an array, which is a basic TypeScript data type easier to work with across the codebase. Since we know it will be a document matching our Sushi model, we also add the additional as Sushi[]; to the line so we have an array of specifically Sushi objects.

This array is then sent back to the front end to be displayed on screen. This is where the ‘res’ Response object built into Express is used. We send a status code of 200, which means success, back as well as the array of games documents. This is useful when using API clients such as Postman.

##### Creating a GET for single ID

```ts
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;

    // Cast 'id' to string so ObjectId/findOne accepts it
    const query = { _id: new ObjectId(id as string) };

    // Express types `req.params` as string | undefined
    if (!id) {
      return res.status(400).send("ID is required");
    }

    if (!collections.sushiMenu) {
      return res.status(500).send("Collection not initialized");
    }
    const sushi = (await collections.sushiMenu.findOne(query)) as Sushi;

    if (sushi) {
      res.status(200).send(sushi);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(String(error));
    }
  }
});
```

##### Creating a POST Route

Express and TypeScript make handling POST requests to create a new document in your collection super easy. Paste the following under the ‘POST’ heading:

```ts
router.post("/", async (req: Request, res: Response) => {
  try {
    const newSushi = req.body as Sushi;
    if (!collections.sushiMenu) {
      return res.status(500).send("Collection not initialized");
    }
    const result = await collections.sushiMenu.insertOne(newSushi);

    result
      ? res
          .status(201)
          .send(`Successfully created a new sushi with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new sushi.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(String(error));
    }
  }
});
```

Here we create our new object by parsing the request body. We then use the insertOne method to create a single document inside a collection, passing the new sushi. If a collection does not exist, the first write operation will implicitly create it. The same thing happens when we create a database. The first structure inside a database will implicitly create it.

We then do some simple error handling, returning a status code and message, depending on the outcome of the insert.

Use InsertMany to insert multiple documents at once.

##### Putting it all together

You now have a service that connects to the database and a router that handles requests from the client and passes those through to your service. But there is one last step to pull it all together and that is updating index.ts to reflect our new service and router.

Add the current import statement with the following:

`import { connectToDatabase } from "./services/database.service.js";`

Then underneath `app.use(express.json());` **DELETE** all the code and replace with the following

```ts
connectToDatabase()
  .then(() => {
    app.use("/api/sushi", sushiRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
```
