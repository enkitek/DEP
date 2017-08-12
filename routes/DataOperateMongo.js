/**
 * Created by kevin on 2016/10/17.
 */
var express = require('express');
var router = express.Router();
var getDataG = require('../models/mongocls');
var dconfig = require('./../models/config.json');

router.post('/operate', function (req, res) {
//console.log(req.body.operateJsonAppend==null?null:req.body.operateJsonAppend);
    console.log(JSON.stringify(req.body));
    var collectionname = req.body.collectionname;
    var opratetype = req.body.opratetype;
    var postdata = req.body.operateJson;
    var postdatasec = req.body.operateJsonAppend == null ? null : req.body.operateJsonAppend;
    getDataG.OperatToMongoDB(dconfig.dbname, collectionname, opratetype, postdata, postdatasec, function (data) {
        console.log('number:');
        console.log(data);
        res.send(data);
    })

});

router.post('/queryDataForTables/:collection/:opratekey/:opratevalue/:searchTextArr', function (req, res) {
//console.log(req.body.operateJsonAppend==null?null:req.body.operateJsonAppend);
    console.log(req.params);
    console.log(req.body);
    var collectionname = req.params.collection;
    var opratetype = "queryForTables";
    var postdata = '{"' + req.params.opratekey + '":"' + req.params.opratevalue + '"';
    var searcharr = null;
    if (req.body.search.value != '') {
        if (req.params.searchTextArr != null) {
            searcharr = req.params.searchTextArr.split('-');
            postdata = postdata + ", $or:[";
            for (var i = 0; i < searcharr.length; i++) {
                postdata = postdata + '{"' + searcharr[i] + '":/' + req.body.search.value + '\/\},';
            }
            postdata = postdata.substr(0, postdata.length - 1);
            postdata = postdata + "]";
        }
    }
    postdata += '}';
    console.log(postdata);
    postdata = eval("("+postdata+")");
    /*, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]*/
    console.log('convert');
    console.log(postdata);


    var appendJson ={
        skip:req.body.start,
        limit:req.body.length,
        csort:{"_id":-1}
    }


    getDataG.OperatToMongoDB(dconfig.dbname, collectionname, opratetype, postdata, appendJson, function (data) {
        console.log('number:');
        console.log(data);
        data.draw = req.body.draw;
        console.log(data);
        res.send(data);
    })

});


module.exports = router;