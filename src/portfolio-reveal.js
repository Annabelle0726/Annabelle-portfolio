function waitForFrame(milliseconds, signal) {
  signal?.throwIfAborted();
  return new Promise((resolve,reject) => {
    const abort = () => { clearTimeout(timer); reject(signal.reason); };
    const timer = setTimeout(() => { signal?.removeEventListener('abort',abort); resolve(); },milliseconds);
    signal?.addEventListener('abort',abort,{once:true});
  });
}

// Present only validated replies. References appear with the completed answer.
export async function revealReply(reply, {
  signal, onUpdate, wait = waitForFrame, thinkingMs = 220, reducedMotion = false,
} = {}) {
  signal?.throwIfAborted();
  await wait(thinkingMs,signal);
  signal?.throwIfAborted();
  if (reducedMotion) return reply;
  const characters = Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(reply.text),part => part.segment);
  const size = Math.max(2,Math.ceil(characters.length/100));
  for (let end=size;end<characters.length+size;end+=size) {
    signal?.throwIfAborted();
    onUpdate({...reply,status:'generating',kind:reply.status,text:characters.slice(0,end).join(''),sources:[]});
    await wait(24,signal);
  }
  signal?.throwIfAborted();
  return reply;
}
