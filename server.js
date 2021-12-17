var https = require('follow-redirects').https;
var fs = require('fs');
var apiKey = 'd156c699edcc98186dae8e6f9562d838';
var pass   = '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';
let data = apiKey + ":" + pass;
let buff = new Buffer.from(data);
let hash = buff.toString('base64');
var options = {
  'method': 'GET',
  'hostname': 'devtestrecruitte.myshopify.com',
  'path': '/admin/api/2021-10/products.json',
  'headers': {
    'Authorization': 'Basic '+hash
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    let productArr = JSON.parse(body.toString());
    let products = (productArr.products);
    var newArr = {};
    for (var cont=0; cont< products.length; cont++) {
        var title = products[cont]['title'];
        newArr[title] = {};
        newArr[title]['price'] = products[cont]['variants'][0]['price'];
        newArr[title]['status'] = products[cont]['status'];
        newArr[title]['created_at'] = ((products[cont]['created_at']).substring(0, 10));
    }
    console.log(newArr);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
