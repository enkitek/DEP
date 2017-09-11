var MongoClient = require('mongodb').MongoClient
    , assert = require('assert'),
    f = require('util').format;
var dconfig = require('./config.json');


/*database:数据库
collection
operation:操作类型
operateJson:传入数据
soperateJson:第二个传入数据*/
exports.OperatToMongoDB = function (database, collection, operation, operateJson, soperateJson, callback) {
    var user = encodeURIComponent(dconfig.username);
    var password = encodeURIComponent(dconfig.psw);
    var authMechanism = 'DEFAULT';

// Connection URL
    var url = f('mongodb://%s:%s@localhost:' + dconfig.port + '/' + database + '?authMechanism=%s',
        user, password, authMechanism);

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");


        switch (operation) {
            case "insertOne": {
                insertDocument(db, collection, operateJson, callback);

                break;
            }
            case "insertMany": {
                insertDocuments(db, collection, operateJson, callback);

                break;
            }
            case "query": {
                //console.log("start");
                findDocuments(db, collection, operateJson, soperateJson, callback);

                break;
            }
            case "queryLength": {
                //console.log("start");
                findDocumentsLength(db, collection, operateJson, callback);

                break;
            }

            case "queryForTables": {
                findDocumentForTable(db, collection, operateJson, soperateJson, callback);

                break;
            }


            case "modify": {
                //console.log("start");
                updateDocument(db, collection, operateJson,soperateJson, callback);

                break;
            }
            case "delete": {
                //console.log("start");
                findLastOneDocument(db, collection, operateJson, soperateJson, callback);

                break;
            }


            default: {
                break;
            }

        }

        db.close();
        console.log("disconnected");
    });


}


var insertDocument = function (db, collection, operateJson, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insertOne(operateJson, function (err, result) {
        if (err) {
            console.log("insert into collection error:" + err.toString());
            callback(err);
        }
        console.log("insert into collection");


        var rresult = {};
        rresult.data = result.ops;
        rresult.status = 1;
        /*  result.result = result.ops;*/
        console.log(rresult);
        callback(rresult);
    });
}

var insertDocuments = function (db, collection, operateJson, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insertMany(operateJson, function (err, result) {
        if (err) {
            console.log("insert into collection error:" + err.toString());
            callback(err);
        }
        console.log("insert into collection");

        var rresult = {};
        rresult.data = result.ops;
        rresult.status = 1;
        /*  result.result = result.ops;*/
        console.log(rresult);
        callback(rresult);
    });
}

var findDocuments = function (db, collection, operateJson, oprateJsonAppend, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    if (oprateJsonAppend == null) {
        collection.find(operateJson).toArray(function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            }
            //console.log("Found the following records");
            // console.dir(docs);
            console.log(docs);
            var rresult = {};
            rresult.data = docs;
            rresult.status = 1;
            callback(rresult);
        });
    } else {
        var curlimit = oprateJsonAppend.limit == null ? null : Number(oprateJsonAppend.limit);
        var curskip = oprateJsonAppend.skip == null ? null : Number(oprateJsonAppend.skip);
        var cursort = oprateJsonAppend.csort == null ? null : oprateJsonAppend.csort;
        if (curlimit == null && curskip == null && cursort == null)//全为空
        {
            collection.find(operateJson).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
        else if (curlimit != null && curskip == null && cursort == null)//1不为空
        {
            collection.find(operateJson).limit(curlimit).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
        else if (curlimit == null && curskip != null && cursort == null)//2不为空
        {
            collection.find(operateJson).skip(curskip).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }

        else if (curlimit == null && curskip == null && cursort != null)//3不为空
        {
            collection.find(operateJson).sort(cursort).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
        else if (curlimit != null && curskip != null && cursort == null)//12不为空
        {
            collection.find(operateJson).skip(curskip).limit(curlimit).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
        else if (curlimit != null && curskip == null && cursort != null)//13不为空
        {
            console.log(cursort);
            collection.find(operateJson).limit(curlimit).sort(cursort).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
        else if (curlimit == null && curskip != null && cursort != null)//23不为空
        {
            collection.find(operateJson).skip(curskip).sort(cursort).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
        else if (curlimit != null && curskip != null && cursort != null)//123不为空
        {
            collection.find(operateJson).skip(curskip).limit(curlimit).sort(cursort).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                //console.log("Found the following records");
                // console.dir(docs);
                console.log(docs);
                var rresult = {};
                rresult.data = docs;
                rresult.status = 1;
                callback(rresult);
            });
        }
    }


}


var findDocumentsLength = function (db, collection, operateJson, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    console.log('read this');
    collection.count(operateJson, function (err, count) {

        if (err) {
            console.log(err);
            callback(err);
        }
        console.log(count);
        callback({"length": count});
    });


}


var findDocumentForTable = function (db, collection, operateJson, oprateJsonAppend, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    var rresult = {};
    var numtotal ;
    collection.count(operateJson, function (err, count) {

        if (err) {
            console.log(err);
            callback(err);
        }
        numtotal =count;
        console.log(count);

    });

    var curlimit = oprateJsonAppend.limit == null ? null : Number(oprateJsonAppend.limit);
    var curskip = oprateJsonAppend.skip == null ? null : Number(oprateJsonAppend.skip);
    var cursort = oprateJsonAppend.csort == null ? null : oprateJsonAppend.csort;
    console.log(curskip);
    console.log(curlimit);
    console.log(cursort);
    collection.find(operateJson).skip(curskip).limit(curlimit).sort(cursort).toArray(function (err, docs) {
        if (err) {
            console.log('dddd');
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        console.log(docs);

        rresult.data = docs;
        rresult.status = 1;
        rresult.recordsTotal = numtotal;
        rresult.recordsFiltered = numtotal;
        callback(rresult);
    });


}

var updateDocument = function (db, collection, operateJson, oprateJsonAppend, callback) {
    var rresult = {};
    // Get the documents collection
    var collection = db.collection(collection);
// Update multiple documents
    collection.updateMany(operateJson,oprateJsonAppend, function (err, r) {
        if (err) {
            console.log(err);
            callback(err);
        }
        rresult.data = r;
        rresult.status = 1;
        callback(rresult);
    })
}


