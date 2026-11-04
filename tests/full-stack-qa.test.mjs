import test from 'node:test';
import assert from 'node:assert/strict';
import { suggestions, interviewCards, localAnswer } from '../src/portfolio-search.js';
const ask = (question, extra={}) => localAnswer({question,page:'web-agency-bloom',language:'zh',history:[],...extra});
test('all four pages have three evidenced questions in both languages', () => {
  assert.equal(Object.keys(suggestions).length,4);
  for(const [page, rows] of Object.entries(suggestions)){
    assert.equal(rows.length,3);
    for(const row of rows) for(const language of ['zh','en']){
      assert.ok(ask(row[language],{page,language}).sources.length);
    }
  }
});
test('a named project takes precedence, and its budget follow-up survives navigation',()=>{
  assert.equal(ask('Belay 有哪些预算约束？').sources[0].href,'#web-belay');
  assert.equal(ask('那预算呢？',{page:'web-somnia',history:[{sources:['belay-continuity']}]}).sources[0].id,'belay-access');
});
test('unknown facts, ambiguous subjects and unrelated questions do not manufacture evidence',()=>{
  assert.equal(ask('Somnia 转化率提高了多少？').sources.length,0);
  assert.equal(ask('那它呢？',{history:[{sources:['belay-access','somnia-role']}]}).status,'clarify');
  assert.equal(ask('天气预报').sources.length,0);
});

test('greetings, thanks and capability questions work without an AI service', () => {
  for (const question of ['你好', '你好！', 'Hi!', '谢谢', 'Thank you', '你能做什么？']) {
    const reply = ask(question);
    assert.equal(reply.status, 'chat');
    assert.deepEqual(reply.sources, []);
    assert.doesNotMatch(reply.text, /没有找到|No matching/);
  }
  assert.match(ask('Hi!').text, /Hi|Hello/);
});

test('unmatched offline requests explain connectivity instead of claiming absent project evidence', () => {
  const reply = ask('帮我翻译这句话');
  assert.equal(reply.status, 'unavailable');
  assert.match(reply.text, /AI/);
});

test('the reported Belay introduction works from the overview without a model', () => {
  const reply = ask('什么是Belay 介绍一下',{page:'portfolio'});
  assert.equal(reply.status,'matches');
  assert.match(reply.text,/Belay.*AI.*学习/);
  assert.equal(reply.sources[0].id,'belay-overview');
  assert.equal(reply.sources[0].href,'#web-belay');
});

test('basic introductions recognize project names and common paraphrases in both languages', () => {
  for (const [question,id] of [
    ['Belay','belay-overview'],['Belay 是做什么的？','belay-overview'],['介绍一下 Bloom','bloom-overview'],
    ['请介绍一下 Somnia Library','somnia-overview'],['What is Belay?','belay-overview'],
    ['Tell me about Agency Bloom.','bloom-overview'],['Give me an overview of Somnia.','somnia-overview'],
  ]) {
    const reply=ask(question,{page:'portfolio'});
    assert.equal(reply.sources[0]?.id,id,question);
    if (/^(What|Tell|Give)/.test(question)) assert.match(reply.text,/workspace|program|reading/i);
  }
});

test('page context and a single-project follow-up can supply the subject of an introduction', () => {
  assert.equal(ask('介绍一下这个项目',{page:'web-belay'}).sources[0]?.id,'belay-overview');
  assert.equal(ask('那它是什么？',{page:'web-somnia',history:[{sources:['belay-access']}]}).sources[0]?.id,'belay-overview');
  assert.equal(ask('介绍一下',{page:'portfolio'}).status,'clarify');
});

test('an introduction request cannot hide an unsupported metric or misattribute a project', () => {
  assert.equal(ask('介绍一下 Belay 转化率提高了多少',{page:'portfolio'}).sources.length,0);
  assert.equal(ask('介绍一下 UnknownProject',{page:'portfolio'}).sources.length,0);
});
test('technical walkthrough uses the current case flow and states its evidence boundary', () => {
  const bloom = ask('介绍一下这个项目的代码逻辑');
  assert.equal(bloom.sources[0]?.id, 'bloom-flow');
  assert.match(bloom.text, /决策卡/);
  assert.match(bloom.text, /接口/);
  assert.equal(ask('Explain the implementation logic of Somnia',{page:'portfolio'}).sources[0]?.id,'somnia-flow');
  assert.equal(ask('Belay 的技术架构是什么？',{page:'web-somnia'}).sources[0]?.id,'belay-flow');
  assert.equal(ask('介绍一下这个项目的代码逻辑',{page:'portfolio'}).status,'clarify');
  assert.match(ask('Bloom 用的是哪个数据库？').text,/SQLite.*PostgreSQL/);
});

test('introductions explain a concrete interaction as well as the project purpose', () => {
  assert.match(ask('介绍一下这个项目').text,/决策卡/);
  assert.match(ask('What is Belay?').text,/file path/i);
  assert.match(ask('介绍一下 Somnia').text,/书架/);
});

test('given a selected case, a greeting continues there in either language without asking for another selection', () => {
  for (const [page,title] of [['web-agency-bloom','Agency Bloom'],['web-belay','Belay'],['web-somnia','Somnia Library']]) {
    for(const [question,language] of [['你好','zh'],['Hello','en']]){
      const reply = ask(question,{page,language});
      assert.ok(reply.text.includes(title));
      assert.doesNotMatch(reply.text,/想先看项目|want to explore a project/i);
    }
  }
});

test('interviewer framework questions answer the named or selected project, in both languages', () => {
  const belay = ask('作者用了什么框架实现的？',{page:'web-belay'});
  assert.match(belay.text,/FastAPI/);
  assert.match(belay.text,/JavaScript/);
  assert.equal(belay.sources[0].href,'#web-belay');
  assert.match(ask('Which tech stack does Agency Bloom use?',{page:'web-belay'}).text,/uni-app/);
  assert.equal(ask('用了什么框架？',{page:'portfolio'}).status,'clarify');
  assert.match(ask('Somnia 用的是 React 吗？').text,/未核实/);
});

test('each interview prompt retrieves its own authored answer in either language', () => {
  for (const [page, cards] of Object.entries(interviewCards)) {
    assert.equal(cards.length,3);
    for (const card of cards) {
      for (const [index,language] of ['zh','en'].entries()) {
        const reply = ask(card.questions[index],{page,language});
        assert.equal(reply.sources[0]?.id,card.id,card.questions[index]);
        assert.equal(reply.text,card[language]);
      }
    }
  }
});
