import test from 'node:test';
import assert from 'node:assert/strict';
import { createMusicPlayback, REPLAY_DELAY } from '../src/components/music-playback.js';

function fixture(reject = false) {
  const audio = new EventTarget(); let plays = 0, pending, delay; const states=[];
  audio.play = () => { plays++; return reject ? Promise.reject(Object.assign(new Error(), { name:'NotAllowedError' })) : Promise.resolve(); };
  audio.pause = () => {}; audio.currentTime=214;
  const player=createMusicPlayback(audio,s=>states.push(s),{setTimeout(fn,ms){pending=fn;delay=ms;return 1;},clearTimeout(){pending=undefined;}});
  return {audio,player,states,get plays(){return plays;},get delay(){return delay;},get pending(){return pending;}};
}
test('replay waits fifteen seconds after completion, then starts from zero',async()=>{
  const f=fixture();await f.player.play();f.audio.dispatchEvent(new Event('playing'));
  assert.equal(f.states.at(-1),'playing');f.audio.dispatchEvent(new Event('ended'));
  assert.equal(f.states.at(-1),'waiting');assert.equal(f.delay,REPLAY_DELAY);assert.equal(f.plays,1);assert.equal(f.audio.currentTime,0);
  f.pending();assert.equal(f.plays,2);f.player.dispose();
});
test('pause cancels a queued replay and allows manual resume',async()=>{
  const f=fixture();await f.player.play();f.audio.dispatchEvent(new Event('ended'));f.player.toggle();
  assert.equal(f.pending,undefined);assert.equal(f.states.at(-1),'paused');await f.player.toggle();assert.equal(f.plays,2);f.player.dispose();
});
test('blocked autoplay never reports playing',async()=>{
  const f=fixture(true);await f.player.play();assert.equal(f.states.at(-1),'blocked');assert.equal(f.pending,undefined);f.player.dispose();
});
test('unmount cancels timers and ignores late events',async()=>{
  const f=fixture();await f.player.play();f.audio.dispatchEvent(new Event('ended'));f.player.dispose();const count=f.states.length;
  assert.equal(f.pending,undefined);f.audio.dispatchEvent(new Event('playing'));assert.equal(f.states.length,count);
});
