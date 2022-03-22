const app = require('./app');
const dbConnection = require('./database');
const config = require('./config');

dbConnection();

app.listen(config.PORT, () => console.log(`Server started! ${config.PORT}`));
