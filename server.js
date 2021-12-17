var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'devtestrecruitte.myshopify.com',
  'path': '/admin/api/2021-10/products.json',
  'headers': {
    'Authorization': 'Basic ZDE1NmM2OTllZGNjOTgxODZkYWU4ZTZmOTU2MmQ4Mzg6c2hwcGFfM2FiNjA3OTdiMzQyNjIzNjIwOTc2M2ZjNjk5YWQ5OTI='
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
        // newArr.push({
        //     title: products[cont]['title'],
        //     price: products[cont]['variants'][0]['price'],
        //     status: products[cont]['status'],
        //     created_at: ((products[cont]['created_at']).substring(0, 10))
        // });
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