const express = require('express');
const cors = require('cors');
const port = 9080;

const app = express();

app.use(express.static('build'));
app.use(cors());

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
