var mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://localhost:27017/test", function(err,db){
    const MyDB = db.db("data");

if (err){
        console.log(err);
    }
    var collection = MyDB.collection("users");
    var user = {name: "tema" , pwd: 123};
    collection.insertOne(user, function(err, result){
        if (err){
            console.log(err);
        }
        
        console.log("\n"+result.ops);
        db.close();
    });
})