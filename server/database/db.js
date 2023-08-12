const { MongoClient } = require('mongodb');

let dbConnection;
const dbURI = 'mongodb+srv://phaniaditya_ch:phani1234@cluster0.cbpsgqr.mongodb.net/';
console.log(dbURI)
module.exports = {
    connectToDb: (cb) => {
        console.log('initialising connection -->')
        MongoClient.connect(dbURI)
        .then((client) => {
                dbConnection = client.db('BillBuddy')
                console.log('connected to db')
                return cb()
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            })
    },
    getDb: () => {
        return dbConnection;
    }
}




// const { MongoClient } = require('mongodb');

// // Replace 'your-mongodb-uri' with your actual MongoDB URI
// const uri = 'mongodb+srv://phaniaditya_ch:phani1234@cluster0.cbpsgqr.mongodb.net/BillBuddy';

// // Connection options (optional, can be omitted if you don't need any specific options)
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// // Connect to MongoDB
// MongoClient.connect(uri, options)
//   .then((client) => {
//     console.log('Connected to MongoDB successfully!');
//     // Now you can use the 'client' object to interact with your MongoDB database
//     // For example, you can get a reference to a specific database:
//     const db = client.db('BillBuddy');
    
//     // Perform database operations (e.g., query, insert, update, delete)
//     // ...

//     // Don't forget to close the connection when done with it
//     client.close();
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });