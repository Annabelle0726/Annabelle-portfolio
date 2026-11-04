import test from 'node:test';
import assert from 'node:assert/strict';
import { restoreSession, conversationHistory } from '../src/portfolio-session.js';

test('broken stored data cannot crash the assistant', () => {
  for (const value of ['{', 'null', '{"turns":[null,{}],"draft":12}']) {
    assert.deepEqual(restoreSession(value), {turns:[],draft:''});
  }
});

test('refreshing an in-flight question restores a retryable question instead of a stuck spinner', () => {
  const restored = restoreSession(JSON.stringify({draft:'next thought', turns:[{
    question:'translate this', reply:{status:'pending',text:'',sources:[]}, origin:{page:'portfolio',language:'en'},
  }]}));
  assert.equal(restored.turns[0].question, 'translate this');
  assert.equal(restored.turns[0].reply.status, 'unavailable');
  assert.equal(restored.turns[0].reply.offline, true);
  assert.equal(restored.draft, 'next thought');
});

test('only completed recent answers enter model history and no arbitrary source URLs are forwarded', () => {
  const turns = Array.from({length:8}, (_, index) => ({question:'q'+index,
    reply:{status:'chat',text:'answer '+index,sources:[{id:'belay-access',href:'https://invalid.example'}]},
  }));
  turns.push({question:'pending',reply:{status:'pending',sources:[]}});
  const history = conversationHistory(turns);
  assert.equal(history.length,6);
  assert.equal(history.at(-1).answer,'answer 7');
  assert.deepEqual(history.at(-1).sources,['belay-access']);
  assert.equal('href' in history.at(-1),false);
});

test('stored citations are rebuilt from registered sources and malformed source entries are removed', () => {
  const restored = restoreSession(JSON.stringify({draft:'',turns:[{question:'q',reply:{status:'answer',text:'answer',sources:[
    null,{id:'forged',href:'javascript:alert(1)'},{id:'belay-access',href:'https://invalid.example'},
  ]}}]}));
  assert.deepEqual(restored.turns[0].reply.sources,[{id:'belay-access',title:'Belay',href:'#web-belay'}]);
});

test('long Chinese conversations stay below the HTTP body limit and keep the newest answer', () => {
  const turns = Array.from({length:6}, (_, index) => ({question:'问'.repeat(2000),
    reply:{status:'chat',text:'答'.repeat(5999)+index,sources:[]},
  }));
  const history = conversationHistory(turns);
  assert.ok(new TextEncoder().encode(JSON.stringify(history)).length <= 48000);
  assert.ok(history.at(-1).answer.endsWith('5'));
});
