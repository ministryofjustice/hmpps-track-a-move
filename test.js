var fs = require('fs');
var mappingTemplate = require('api-gateway-mapping-template')


var vtl = fs.readFileSync(__dirname + '/mapping.vtl', 'utf8');
console.log(vtl);

var payload = fs.readFileSync(__dirname + '/sample.json', 'utf8');
console.log(payload);

var result = mappingTemplate({template: vtl, payload: payload})
console.dir(result);

