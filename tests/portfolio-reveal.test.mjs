import test from 'node:test';
import assert from 'node:assert/strict';
import { revealReply } from '../src/portfolio-reveal.js';

const reply={status:'answer',text:'第一条：先介绍项目。\n\n第二条：再解释交互，让答案逐步出现。',sources:[{id:'belay-overview',href:'#web-belay'}]};

test('a visible thinking interval precedes multiple incremental updates and the exact final answer',async()=>{
  const events=[];
  const result=await revealReply(reply,{onUpdate:update=>events.push(update),wait:async ms=>events.push(ms)});
  assert.ok(events[0]>=200);
  const frames=events.filter(event=>typeof event==='object');
  assert.ok(frames.length>1);
  assert.equal(frames[0].status,'generating');
  assert.ok(frames[0].text.length<reply.text.length);
  assert.ok(frames.every((frame,index)=>index===0||frame.text.startsWith(frames[index-1].text)));
  assert.ok(frames.every(frame=>frame.sources.length===0));
  assert.equal(frames.at(-1).text,reply.text);
  assert.deepEqual(result,reply);
});

test('reset aborts progressive output before any stale completion can be returned',async()=>{
  const controller=new AbortController();
  let count=0;
  await assert.rejects(revealReply(reply,{signal:controller.signal,onUpdate:()=>{count++;controller.abort();},wait:async()=>{}}),{name:'AbortError'});
  assert.equal(count,1);
});

test('reduced motion retains the thinking phase without repeated text animation',async()=>{
  let count=0;
  const waits=[];
  const result=await revealReply(reply,{reducedMotion:true,onUpdate:()=>count++,wait:async ms=>waits.push(ms)});
  assert.deepEqual(result,reply);
  assert.equal(count,0);
  assert.ok(waits[0]>=200);
});

test('progressive output never splits emoji graphemes and caps the number of updates for long replies',async()=>{
  const text='👩🏽‍💻'.repeat(2000);
  let count=0;
  await revealReply({...reply,text},{onUpdate:update=>{count++;assert.equal(update.text.replaceAll('👩🏽‍💻',''),'');},wait:async()=>{}});
  assert.ok(count<=100);
});
