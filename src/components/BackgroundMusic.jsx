import React, { useEffect, useRef, useState } from 'react';
import track from '../assets/music/dream-culture.mp3';
import { createMusicPlayback } from './music-playback';
import './background-music.css';

export default function BackgroundMusic({ language = 'zh' }) {
  const audio = useRef(null), player = useRef(null);
  const [status, setStatus] = useState('loading');
  const en = language === 'en';
  const enabled = ['playing','waiting','loading'].includes(status);
  const labels = en ? { playing:'Music playing · Pause',waiting:'Next play in 15 seconds · Pause',loading:'Loading music · Pause',paused:'Music paused · Play',blocked:'Play background music',error:'Music unavailable · Retry' } : {playing:'音乐播放中 · 点击暂停',waiting:'等待 15 秒后重播 · 点击暂停',loading:'音乐加载中 · 点击暂停',paused:'音乐已暂停 · 点击播放',blocked:'点击播放背景音乐',error:'音乐暂时无法播放 · 点击重试'};
  useEffect(() => {
    audio.current.volume = .2;
    const playback = createMusicPlayback(audio.current, setStatus);
    player.current = playback;
    playback.play();
    return () => { playback.dispose(); player.current = null; };
  }, []);
  return <div className="background-music" data-status={status}>
    <audio ref={audio} src={track} preload="auto" />
    <button type="button" className="music-toggle" onClick={() => player.current?.toggle()} aria-label={labels[status]} aria-pressed={enabled}>
      <svg className="music-gramophone" viewBox="0 0 48 48" aria-hidden="true">
        <rect className="gramophone-base" x="4" y="28" width="39" height="14" rx="4"/>
        <g className="music-record">
          <circle className="record-body" cx="20" cy="30" r="13"/>
          <circle className="record-groove" cx="20" cy="30" r="10"/>
          <circle className="record-groove" cx="20" cy="30" r="7"/>
          <path className="record-shine" d="M11 27a10 10 0 0 1 6-6M23 39a10 10 0 0 0 6-6"/>
          <circle className="record-label" cx="20" cy="30" r="4"/>
          <circle className="record-hole" cx="20" cy="30" r="1.4"/>
        </g>
        <path className="gramophone-pipe" d="M37 31V20q0-5-6-7"/>
        <path className="gramophone-horn" d="M31 16C23 17 17 12 14 6c9 3 16 0 24-2-4 4-7 7-7 12Z"/>
        <path className="gramophone-rim" d="M14 6Q26 10 38 4"/>
        <g className="gramophone-arm"><path d="M38 27v7l-8 2"/><rect x="27" y="34" width="5" height="3" rx="1"/></g>
      </svg>
    </button>
    <div className="music-credit"><span aria-live="polite">{labels[status]}</span><strong>Dream Culture</strong><span>Kevin MacLeod · <a href="https://incompetech.com/music/royalty-free/index.html?Search=Search&isrc=USUAN1300046" target="_blank" rel="noopener noreferrer">incompetech.com</a></span><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></div>
  </div>;
}
