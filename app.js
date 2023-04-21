const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./app/models");
const helmet = require('helmet');
require('dotenv').config();
const session = require('express-session');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

app.use(bodyParser.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
    cookie: { secure: true }
}));

require("./app/routes/auth.routes")(app);
require("./app/routes/notification.routes")(app);

db.mongoose
    .connect(`${process.env.DB_URL_DEVELOPEMENT}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB....");
        //  roleCedar();
    })
    .catch(err => {
        console.log({ err }, "error")
        console.error("Connection error", err);
        process.exit();
    });



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});