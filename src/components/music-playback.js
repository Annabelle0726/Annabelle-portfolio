export const REPLAY_DELAY = 15000;

export function createMusicPlayback(audio, report, clock = globalThis) {
  let timer, enabled = false, disposed = false, generation = 0;
  const clear = () => { if (timer !== undefined) clock.clearTimeout(timer); timer = undefined; };
  const play = () => {
    if (disposed) return;
    enabled = true;
    clear();
    const request = ++generation;
    report('loading');
    return Promise.resolve(audio.play()).catch(error => {
      if (disposed || request !== generation) return;
      enabled = false;
      report(error.name === 'NotAllowedError' ? 'blocked' : 'error');
    });
  };
  const pause = () => { enabled = false; generation++; clear(); audio.pause(); report('paused'); };
  const ended = () => {
    if (!enabled || disposed) return;
    clear(); audio.currentTime = 0; report('waiting');
    timer = clock.setTimeout(() => { timer = undefined; if (enabled && !disposed) play(); }, REPLAY_DELAY);
  };
  const playing = () => { if (!disposed && enabled) report('playing'); };
  const buffering = () => { if (enabled) report('loading'); };
  const error = () => { enabled = false; generation++; clear(); report('error'); };
  audio.addEventListener('ended', ended);
  audio.addEventListener('playing', playing);
  audio.addEventListener('waiting', buffering);
  audio.addEventListener('error', error);
  return { play, pause, toggle: () => enabled ? pause() : play(), dispose() {
    disposed = true; enabled = false; generation++; clear(); audio.pause();
    audio.removeEventListener('ended', ended); audio.removeEventListener('playing', playing);
    audio.removeEventListener('waiting', buffering); audio.removeEventListener('error', error);
  } };
}
