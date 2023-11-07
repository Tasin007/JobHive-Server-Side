const express = require('express')
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send({message: "JobHive server is Running"})
})

app.listen(port,() => {
    console.log(`JobHive Server is running on port:${port}`);
})