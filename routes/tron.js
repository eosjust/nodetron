var express = require('express');
var router = express.Router();
const TronWeb = require('tronweb');

// var node_urls=['https://api.trongrid.io','https://trx.mytokenpocket.vip'];
var node_urls=['https://api.trongrid.io'];
var node_inx=Math.floor(Math.random() * node_urls.length);
var node_url=node_urls[node_inx];

const tronWeb = new TronWeb(
    node_url,
    node_url,
    node_url,
    'C9D85EC4858BFBE9BD38A7DDFF1334FDC058F84BC921C96D9B7B060290057631'
);


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/transfer', function (req, res, next) {
    try {
        var to = req.query.to;
        var amount = req.query.amount;
        var pri = req.query.pri;
        tronWeb.trx.sendTransaction(to,amount,pri).then(resp => {
            res.send(resp);
    }).catch((err) => res.send(err));
    }catch (ex){
        res.send('{}');
    }
});


router.get('/interest', function (req, res, next) {
    try {
        var pri=req.query.pri;
        tronWeb.setPrivateKey(pri);
        tronWeb.contract().at("TE2RzoSV3wFK99w6J9UnnZ4vLfXYoxvRwP").then(resp => {
            var contract = resp;
            let param = {
                feeLimit: 1000000000,
                callValue: 0
            };
            contract.accrueInterest().send(param).then((val) => res.send(val))
                .catch((err) => res.send(err));
        });
    }catch (ex){
        res.send('error')
    }
});

router.get('/lend', function (req, res, next) {
    try {
        var from = req.query.from;
        var amount = req.query.amount;
        var pri=req.query.pri;
        tronWeb.setPrivateKey(pri);
        tronWeb.contract().at("TPgbgZReSnPnJeXPakHcionXzsGk6kVqZB").then(resp => {
            var contract = resp;
            let param = {
                feeLimit: 1000000000,
                callValue: 23
            };
            contract.entrustOrder(amount,3,from).send(param).then((val) => res.send(val))
                .catch((err) => res.send(err));
        });
    }catch (ex){
        res.send('error')
    }

});


module.exports = router;
