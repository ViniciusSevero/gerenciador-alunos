var mongoClient = require('mongodb').MongoClient;

const url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017';  
const database = process.env.MONGODB_DATABASE || 'gerenciador_alunos';
var connectionInstance = null;

var connMongoDb = function(callback){
    if(connectionInstance && connectionInstance != null){
        callback(connectionInstance);
        return;
    }

    mongoClient.connect(url, function(error, client) {
        connectionInstance = client.db(database)
        if (error) {
            console.log("error", error);
            throw new Error(error);
        }
        callback(connectionInstance);
        //client.close();
    });
    
}

module.exports = function(){
    return connMongoDb;
}