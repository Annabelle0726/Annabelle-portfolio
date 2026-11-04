import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { portfolioApi } from '../server/qa-http.mjs';

const input = {question:'再短一点',page:'portfolio',language:'zh',history:[
  {question:'帮我写一句欢迎语',answer:'欢迎来逛我的作品集。',status:'chat',sources:[]},
]};
async function request(payload, handler = async () => ({status:'chat',text:'欢迎来逛。',sources:[]})) {
  const key = process.env.DEEPSEEK_API_KEY;
  process.env.DEEPSEEK_API_KEY = 'test-only-not-a-credential';
  try {
    const req = Readable.from([Buffer.from(JSON.stringify(payload))]);
    Object.assign(req,{url:'/api/portfolio-qa',method:'POST',headers:{'content-type':'application/json',host:'localhost'}});
    let code, body;
    await portfolioApi(handler)(req,{writeHead(value){code=value;},end(value){body=JSON.parse(value);}},()=>assert.fail('API was not handled'));
    return {code,body};
  } finally {
    if (key === undefined) delete process.env.DEEPSEEK_API_KEY;
    else process.env.DEEPSEEK_API_KEY = key;
  }
}

test('API passes ordinary conversation and full answer history to the assistant', async () => {
  const response = await request(input, async payload => {
    assert.equal(payload.history[0].answer, '欢迎来逛我的作品集。');
    return {status:'chat',text:'欢迎来逛。',sources:[]};
  });
  assert.equal(response.code,200);
  assert.equal(response.body.status,'chat');
});

test('malformed and oversized history is rejected before model use', async () => {
  for (const history of [
    [null], [{question:'q',sources:'bad'}], [{question:'q',sources:['forged']}],
    [{question:'q',answer:'x'.repeat(6001),sources:[]}], Array(7).fill({question:'q',sources:[]}),
  ]) {
    const response = await request({...input,history}, () => assert.fail('invalid history reached model'));
    assert.equal(response.code,400);
  }
});

test('data overview and details accept the same conversation API',async()=>{
  for(const page of ['services','data-athub','data-visualization','data-energy'])
    assert.equal((await request({...input,page})).code,200);
});

test('UI design overview and details accept conversation requests',async()=>{
  for(const page of ['XD','XD-cupcakes','XD-reverie','XD-travel'])
    assert.equal((await request({...input,page})).code,200);
});
