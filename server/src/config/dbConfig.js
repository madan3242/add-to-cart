const mongoose = require('mongoose');

const connectDb = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(console.log(`MONGODB CONNECTED SUCCESSFULLY`))
        .catch(error => {
            console.log(`DB CONNECTION FAILED`);
            console.log(error);
            process.exit(1);
        })
}

module.exports = connectDb;