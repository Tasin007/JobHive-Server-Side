const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cit9nsb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // connect collection
    const collection = client.db("JobHiveDB").collection("jobs");

    app.get("/api/v1/jobs", async (req, res) => {
        try {
  
          
          const jobs = await collection.find().toArray();
          res.send(jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

      app.post("/api/v1/jobs", async (req, res) => {
        const job = req.body;
        const result = await collection.insertOne(job);
        res.send(result);
      })

       // single job by job id
    app.get("/api/v1/jobs/:jobId", async (req, res) => {
      const id = req.params.jobId;
      const query = { _id: new ObjectId(id) };
      const result = await collection.findOne(query);
      res.send(result);
  });
  app.get("/api/v1/applications", async (req, res) => {
    const cursor = applicationCollection.find();
    const jobs = await cursor.toArray();
    res.send(jobs);
  })

  app.post("/api/v1/applications", async (req, res) => {
    const job = req.body;
    const result = await applicationCollection.insertOne(job);
    res.send(result);
  })

  app.delete('/api/v1/jobs/:title', async (req, res) =>{
    const title = req.params.title;
    const query = {title: title};
    const result = await collection.deleteOne(query);
    res.send(result);
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("JobHive server is Running" );
});

app.listen(port, () => {
  console.log(`JobHive Server is running on port:${port}`);
});
