const fs = require('fs')
const path = require('path')
const {expect} = require('chai')
const mappingTemplate = require('api-gateway-mapping-template')

const cache = {}
const getTemplate = (templateName) => {
  if (!cache[templateName]) {
    cache[templateName] = fs.readFileSync(path.resolve(__dirname, '..', `${templateName}.vtl`), 'utf8')
  }
  return cache[templateName]
}

const runTemplate = (payloadName, templateName = 'mapping') => {
  const template = getTemplate(templateName)
  const apikey = 'test-a792e045f206a52ac0530ed70a1dfab8'
  const payload = fs.readFileSync(`${__dirname}/input/${payloadName}.json`, 'utf8');

  const output = mappingTemplate({template, payload, params: {header: {"x-api-key": apikey}}})
  const result = JSON.parse(output)
  result.Records = result.Records.map(({Data}) => {
    return {
      Data: JSON.parse(Buffer.from(Data, 'base64').toString())
    }
  })
  return result
}

const runTemplateAgainstSnapshot = (sample, templateName = 'mapping') => {
  const payloadName = `input-${sample}`
  const outputName = `output-${sample}`
  const result = runTemplate(payloadName, templateName)
  const expected = JSON.parse(fs.readFileSync(`${__dirname}/output/${outputName}.json`, 'utf8'))
  return {
    result,
    expected
  }
}
/*
describe.skip('When loading input 1', function() {
  let result

  beforeEach(function() {
    result = runTemplate('input-1')
  })

  it('should have the DeliveryStreamName property', function(){
    // console.log(JSON.stringify({result}, null, 2))
    expect(result).to.have.property('DeliveryStreamName')
  })

  it('should have the expected number of records', function(){
    expect(result.Records.length).to.equal(3)
  })

  it('should output the expected properties for record 1', function() {
    expect(result.Records[0].Data).to.deep.equal({
      "tracking_id": "c27b0ec4-3626-4deb-91e2-34d0af1dc36b",
      "journey_id": "9de29b01-2f8e-476f-a401-86051c45f8b7",
      "tracking_timestamp": "2020-08-13 09:00:02 +0100",
      "vehicle_registration": "JBW-89",
      "vehicle_vin": "VIN-1830",
      "latitude": 55.783333,
      "longitude": -4.005057906994962,
      "precision_hdop": null,
      "precision_vdop": null,
      "speed": 62.3,
      "altitude": 12.4,
      "bearing": null
    })
  })

  it('should output the expected properties for record 2', function() {
    expect(result.Records[0].Data).to.deep.equal({
      "tracking_id": "cb32774f-d813-4ef9-8b7a-3bba7ee3a5ca",
      "journey_id": "9de29b01-2f8e-476f-a401-86051c45f8b7",
      "tracking_timestamp": "2020-08-13 09:01:04 +0100",
      "vehicle_registration": "JBW-89",
      "vehicle_vin": "VIN-1830",
      "latitude": 55.78435888252279,
      "longitude": -4.005057906994962,
      "precision_hdop": null,
      "precision_vdop": null,
      "speed": 10,
      "altitude": 73.9,
      "bearing": null
    })
  })

  it('should output the expected properties for record 3', function() {
    expect(result.Records[0].Data).to.deep.equal({
      "tracking_id": "4f7167f2-66d1-43f4-ae56-ab5b09ef7d76",
      "journey_id": "9de29b01-2f8e-476f-a401-86051c45f8b7",
      "tracking_timestamp": "2020-08-13 09:02:10 +0100",
      "vehicle_registration": "JBW-89",
      "vehicle_vin": "VIN-1830",
      "latitude": 55.78554164311852,
      "longitude": -4.010504853404174,
      "precision_hdop": null,
      "precision_vdop": null,
      "speed": 85.4,
      "altitude": 71.1,
      "bearing": null
    })
  })
})
*/

describe('When payload has only mandatory fields', function() {
  it('should generate the expected output', function(){
    const values = runTemplateAgainstSnapshot('1')
    expect(values.result).to.deep.equal(values.expected)
  })
})


describe('When payload has all optional fields', function() {
  it('should generate the expected output', function(){
    const values = runTemplateAgainstSnapshot('2')
    expect(values.result).to.deep.equal(values.expected)
  })
})
