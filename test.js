var fs = require('fs');
var mappingTemplate = require('api-gateway-mapping-template')

var vtl = fs.readFileSync(__dirname + '/mapping.vtl', 'utf8');
var payload = fs.readFileSync(__dirname + '/sample2.json', 'utf8');
var apikey = 'test-a792e045f206a52ac0530ed70a1dfab8'
var result = mappingTemplate({template: vtl, payload: payload, params: {header: {name: "x-api-key"}}})
//console.dir(result);


process.stdout.write(result);
