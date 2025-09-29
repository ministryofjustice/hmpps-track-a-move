const fs = require('fs')
const mappingTemplate = require('api-gateway-mapping-template')

// console.dir(result);

function runTemplate(payload) {
  const vtl = fs.readFileSync(`${__dirname}/mapping.vtl`, 'utf8')
  const apikey = 'test-a792e045f206a52ac0530ed70a1dfab8'

  const result = mappingTemplate({ template: vtl, payload, params: { header: { 'x-api-key': apikey } } })
  return result
}

function testRunTemplate() {
  const payload = fs.readFileSync(`${__dirname}/sample2.json`, 'utf8')
  const result = runTemplate(payload)
  console.log(result)
}

testRunTemplate()
