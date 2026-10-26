const { test, before, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
let handler, axios, originalGet, originalKey, originalPlace;
before(async () => {
  ({ default: axios } = await import('axios'));
  ({ default: handler } = await import('../pages/api/reviews.js'));
});
beforeEach(() => {
  originalGet = axios.get;
  originalKey = process.env.GOOGLE_PLACES_API_KEY;
  originalPlace = process.env.PLACE_ID;
  delete process.env.GOOGLE_PLACES_API_KEY;
  delete process.env.PLACE_ID;
});
afterEach(() => {
  axios.get = originalGet;
  for (const [name, value] of [['GOOGLE_PLACES_API_KEY', originalKey], ['PLACE_ID', originalPlace]]) {
    if (value === undefined) delete process.env[name]; else process.env[name] = value;
  }
});
function response() {
  return { headers: {}, setHeader(k,v) {this.headers[k]=v;}, status(code) {this.code=code;return this;}, json(body) {this.body=body;return this;} };
}
function configure() {
  process.env.GOOGLE_PLACES_API_KEY = 'test-only-key';
  process.env.PLACE_ID = 'test-only-place';
}
test('missing configuration returns a safe unavailable response without calling Google', async () => {
  axios.get = () => assert.fail('Must not call Google');
  const res = response(); await handler({method:'GET'}, res);
  assert.equal(res.code,503);
  assert.equal(res.headers['Cache-Control'],'no-store');
  assert.deepEqual(res.body,{error:'Reviews are temporarily unavailable.'});
});
test('only accepts GET', async () => {
  const res = response(); await handler({method:'POST'}, res);
  assert.equal(res.code,405); assert.equal(res.headers.Allow,'GET');
});
test('normalizes Google review attribution and strips unsafe links and invalid ratings', async () => {
  configure();
  axios.get = async (url, options) => {
    assert.equal(url,'https://places.googleapis.com/v1/places/test-only-place');
    assert.equal(options.headers['X-Goog-Api-Key'],'test-only-key');
    assert.equal(options.timeout,8000);
    return {data:{rating:4.7,userRatingCount:23,googleMapsUri:'https://maps.google.com/',reviews:[
      {name:'review/1',rating:4,text:{text:'Fixture review for testing only.'},authorAttribution:{displayName:'Fixture author',uri:'https://maps.google.com/contrib/1'},relativePublishTimeDescription:'A week ago',googleMapsUri:'https://maps.google.com/review/1'},
      {rating:5,authorAttribution:{uri:'javascript:alert(1)'}},
      {rating:100,text:{text:'Invalid rating'}}
    ]}};
  };
  const res=response();await handler({method:'GET'},res);
  assert.equal(res.code,200);assert.equal(res.body.rating,4.7);assert.equal(res.body.reviewCount,23);
  assert.equal(res.body.reviews.length,2);
  assert.equal(res.body.reviews[0].author,'Fixture author');
  assert.equal(res.body.reviews[0].text,'Fixture review for testing only.');
  assert.equal(res.body.reviews[1].authorUrl,null);
});
test('Google failures return a safe response without exposing credentials', async () => {
  configure();axios.get=async()=>{throw new Error('upstream test-only-key');};
  const res=response();await handler({method:'GET'},res);
  assert.equal(res.code,502);assert.equal(JSON.stringify(res.body).includes('test-only-key'),false);
});
