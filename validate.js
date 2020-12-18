var fs = require('fs');
var mappingTemplate = require('api-gateway-mapping-template')

//console.dir(result);


function runTemplate(payload) {
    const vtl = fs.readFileSync(__dirname + '/mapping.vtl', 'utf8');
    const apikey = 'test-a792e045f206a52ac0530ed70a1dfab8';

    const result = mappingTemplate({template: vtl, payload: payload, params: {header: {"x-api-key": apikey}}});
    return result
}

function testRunTemplate() {
    var payload = fs.readFileSync(__dirname + '/sample2.json', 'utf8');
    var result = runTemplate(payload)
    console.log(result);
}

testRunTemplate();
