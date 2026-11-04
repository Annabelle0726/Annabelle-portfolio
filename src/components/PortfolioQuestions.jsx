import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { interviewCards, localAnswer, suggestions } from '../portfolio-search';
import { caseIntroduction } from '../../server/portfolio-conversation.mjs';
import { restoreSession, conversationHistory } from '../portfolio-session';
import { revealReply } from '../portfolio-reveal';
import './portfolio-questions.css';

const storeKey = 'portfolio.questions.v1';
const pageNames = {portfolio:['全栈项目','Full-stack projects'],'web-agency-bloom':['Agency Bloom'],'web-belay':['Belay'],'web-somnia':['Somnia Library']};
const shortPrompts = {
  portfolio:[['比较回应方式','Compare response styles'],['留给用户的选择','Choices for the user'],['她负责了什么','Annabelle’s role']],
  'web-agency-bloom':[['先倾听，还是给建议','Listening before advice'],['从纠结到小小行动','From dilemma to action'],['改变主意之后呢','What if I change my mind?']],
  'web-belay':[['成功和报错怎么回应','Feedback after a code run'],['为什么可以引用回复','Why quote a reply?'],['看看 Glass Box','Explore Glass Box']],
  'web-somnia':[['不知道读什么时','When you’re unsure what to read'],['卡片里的小交互','Explore card interactions'],['她参与了哪些部分','Where did she contribute?']],
};
const api = import.meta.env.VITE_PORTFOLIO_QA_URL || (import.meta.env.DEV ? '/api/portfolio-qa' : '');
function restore() {
  try { return restoreSession(sessionStorage.getItem(storeKey)); }
  catch { return {turns:[], draft:''}; }
}
function Avatar({small = false}) {
  return <span aria-hidden="true" className={small ? 'qa-avatar qa-avatar-small' : 'qa-avatar'}><span><i/><i/></span></span>;
}
function Icon({name}) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {name === 'new' ? <><path d="M19 11v7a3 3 0 0 1-3 3H6l-3 2V7a3 3 0 0 1 3-3h7"/><path d="M18 2v6m-3-3h6"/></>
      : name === 'close' ? <path d="m6 6 12 12M18 6 6 18"/>
      : name === 'send' ? <path d="M12 19V5m-6 6 6-6 6 6"/>
      : <path d="M5 12h14m-5-5 5 5-5 5"/>}
  </svg>;
}

export default function PortfolioQuestions({page, language, menuOpen, navigate}) {
  const zh = language === 'zh';
  const t = (a,b) => zh ? a : b;
  const [session,setSession] = useState(restore);
  const [open,setOpen] = useState(false);
  const [samples,setSamples] = useState(false);
  const [confirmReset,setConfirmReset] = useState(false);
  const [pending,setPending] = useState(null);
  const [showLatest,setShowLatest] = useState(false);
  const [unread,setUnread] = useState(false);
  const controller = useRef(null);
  const dialog = useRef(null);
  const input = useRef(null);
  const trigger = useRef(null);
  const log = useRef(null);
  const follow = useRef(true);
  const scrollPosition = useRef(0);
  const visibleRef = useRef(false);
  const enabled = Object.hasOwn(suggestions,page);
  const visible = enabled && !menuOpen && open;
  visibleRef.current = visible;

  useEffect(() => {
    try { sessionStorage.setItem(storeKey,JSON.stringify(session)); } catch { /* Storage is optional. */ }
  },[session]);
  useEffect(() => { setOpen(false); setSamples(false); setConfirmReset(false); },[page,menuOpen]);
  useEffect(() => () => controller.current?.abort(),[]);
  useEffect(() => {
    if (confirmReset) dialog.current?.querySelector('.qa-reset button')?.focus({preventScroll:true});
  },[confirmReset]);
  useLayoutEffect(() => {
    if (!visible) return;
    const node = dialog.current;
    const media = matchMedia('(max-width: 900px)');
    const viewport = window.visualViewport;
    const resize = () => {
      node.style.setProperty('--qa-height', (viewport?.height ?? window.innerHeight) + 'px');
      node.style.setProperty('--qa-top', (viewport?.offsetTop ?? 0) + 'px');
    };
    const show = () => {
      resize();
      node.close();
      if (media.matches) node.showModal(); else node.show();
      // Touch users choose when to open the keyboard.
      (media.matches ? node.querySelector('h2') : input.current)?.focus({preventScroll:true});
    };
    viewport?.addEventListener('resize',resize);
    viewport?.addEventListener('scroll',resize);
    show();
    if (log.current) log.current.scrollTop = follow.current ? log.current.scrollHeight : scrollPosition.current;
    setUnread(false);
    media.addEventListener('change',show);
    return () => {
      if (log.current) scrollPosition.current = log.current.scrollTop;
      viewport?.removeEventListener('resize',resize);
      viewport?.removeEventListener('scroll',resize);
      media.removeEventListener('change',show);
      node.close();
    };
  },[visible]);
  useLayoutEffect(() => {
    if (!visible || !log.current) return;
    if (follow.current) log.current.scrollTop = log.current.scrollHeight;
    else setShowLatest(true);
  },[session.turns,visible]);
  useLayoutEffect(() => {
    if (!input.current) return;
    input.current.style.height = 'auto';
    input.current.style.height = Math.min(input.current.scrollHeight,112) + 'px';
  },[session.draft,visible]);

  function close() {
    setOpen(false);
    setConfirmReset(false);
    requestAnimationFrame(() => trigger.current?.focus({preventScroll:true}));
  }
  function latest() {
    follow.current = true;
    setShowLatest(false);
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }
  function reset() {
    controller.current?.abort();
    controller.current = null;
    setPending(null);
    setSession({turns:[],draft:''});
    setConfirmReset(false);
    setSamples(false);
    setShowLatest(false);
    follow.current = true;
    scrollPosition.current = 0;
    (matchMedia('(max-width: 900px)').matches ? dialog.current?.querySelector('h2') : input.current)?.focus({preventScroll:true});
  }
  async function send(raw, retryIndex = null) {
    const question = raw.trim();
    if (!question || controller.current) return;
    const request = new AbortController();
    const startedAt = performance.now();
    controller.current = request;
    const index = retryIndex ?? session.turns.length;
    const origin = retryIndex === null ? {page,language} : session.turns[index].origin || {page,language};
    const payload = {question,...origin,history:conversationHistory(session.turns.slice(0,index))};
    setPending(index);
    setSamples(false);
    setConfirmReset(false);
    follow.current = true;
    setShowLatest(false);
    const turn = {question,reply:{status:'pending',text:'',sources:[]},origin};
    setSession(previous => ({draft:retryIndex === null ? '' : previous.draft,
      turns:retryIndex === null ? [...previous.turns,turn] : previous.turns.map((old,i) => i === index ? turn : old)}));
    if (!matchMedia('(max-width: 900px)').matches) input.current?.focus({preventScroll:true});
    let reply;
    try {
      const local = localAnswer(payload);
      const verifiedStack = local.sources.some(s => s.id.endsWith('-stack'));
      if (['chat','answer'].includes(local.status) || verifiedStack) reply = local;
      else if (api) {
        const response = await fetch(api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.any([request.signal,AbortSignal.timeout(30000)])});
        if (!response.ok) throw new Error('unavailable');
        reply = await response.json();
        if (!reply || typeof reply.text !== 'string' || !Array.isArray(reply.sources) || reply.status === 'unavailable') throw new Error('unavailable');
      } else reply = {...local, offline:true};
    } catch {
      reply = {...localAnswer(payload), offline:true};
    }
    if (controller.current !== request || request.signal.aborted) return;
    try {
      await revealReply(reply,{
        signal:request.signal,
        thinkingMs:Math.max(0,220-(performance.now()-startedAt)),
        reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,
        onUpdate:partial => {
          if (controller.current !== request || request.signal.aborted) return;
          setSession(previous => controller.current !== request ? previous : ({...previous,
            turns:previous.turns.map((old,i) => i === index ? {...old,reply:partial} : old)}));
        },
      });
    } catch {
      if (request.signal.aborted) return;
      // A presentation failure must not discard an otherwise valid answer.
    }
    if (controller.current !== request || request.signal.aborted) return;
    setSession(previous => ({...previous,turns:previous.turns.map((old,i) => i === index ? {...old,reply} : old)}));
    if (!visibleRef.current) setUnread(true);
    controller.current = null;
    setPending(null);
  }
  if (!enabled || menuOpen) return null;
  const lastCompleted = session.turns.findLast(turn => !['pending','generating'].includes(turn.reply.status));
  const mode = !api || lastCompleted?.reply.offline
    ? t('作品资料模式 · 回答附案例出处','Case library · Answers link to the projects')
    : t('作品助手 · 项目事实附出处','Portfolio guide · Sources for project facts');
  return <div className="portfolio-qa">
    {!visible && <button type="button" className="qa-launch" ref={trigger} aria-haspopup="dialog" aria-expanded="false" onClick={() => setOpen(true)}>
      <Avatar small/><span>{t('作品问答','Ask about the work')}</span>{unread && <span className="qa-unread">{t('新回复','New reply')}</span>}
    </button>}
    {visible && <dialog className="qa-panel" ref={dialog} aria-labelledby="qa-heading" onCancel={event => {event.preventDefault();close();}} onKeyDown={event => {
      if (event.key === 'Escape') {event.preventDefault();event.stopPropagation();close();}
    }}>
      <header className="qa-header">
        <Avatar/><div className="qa-heading"><h2 id="qa-heading" tabIndex="-1">{t('一起聊聊作品','Let’s talk about the work')}</h2><span>{mode}</span></div>
        <button type="button" className="qa-icon-button" aria-label={t('新对话','New chat')} title={t('新对话','New chat')} onClick={() => {
          if (session.turns.length || session.draft || pending !== null) setConfirmReset(value => !value); else reset();
        }}><Icon name="new"/></button>
        <button type="button" className="qa-icon-button" aria-label={t('收起问答','Minimize chat')} onClick={close}><Icon name="close"/></button>
      </header>
      <div className="qa-context"><span/>{t('正在看','Viewing')} · {pageNames[page][zh ? 0 : 1] || pageNames[page][0]}</div>
      <div className="qa-log" ref={log} role="log" aria-label={t('对话记录','Conversation')} aria-live="polite" aria-busy={pending !== null} aria-relevant="additions text" onScroll={event => {
        const element = event.currentTarget;
        scrollPosition.current = element.scrollTop;
        follow.current = element.scrollHeight-element.scrollTop-element.clientHeight < 48;
        setShowLatest(!follow.current);
      }}>
        <div className="qa-welcome">
          <Avatar small/><div className="qa-assistant-bubble"><p>{caseIntroduction(page,language) || t('你好呀，欢迎来逛 Annabelle 的作品集。','Hi, welcome to Annabelle’s portfolio.')}</p><p>{t('可以问这个项目怎么运作、Annabelle 负责哪部分，也可以让我比较两个项目。','Ask how this project works, what Annabelle contributed, or how two projects compare.')}</p></div>
        </div>
        {session.turns.map(({question,reply},index) => <article className="qa-turn" key={index}>
          <p className="qa-user"><span className="qa-sr-only">{t('你：','You: ')}</span>{question}</p>
          <div className="qa-assistant"><Avatar small/><div className="qa-response">
            <div className={reply.status === 'pending' ? 'qa-assistant-bubble qa-pending' : 'qa-assistant-bubble'}>
              {reply.status === 'pending' ? <span role="status">{t('思考中…','Thinking…')}<span className="qa-thinking" aria-hidden="true"><i/><i/><i/></span></span> : <>
                {reply.status === 'generating' && <span className="qa-generating-label" role="status">{t('正在生成…','Writing…')}</span>}
                {(reply.kind || reply.status) === 'matches' && <span className="qa-reply-label">{t('找到的相关资料','Related published passages')}</span>}
                {(reply.kind || reply.status) === 'analysis' && <span className="qa-reply-label">{t('我的分析与建议','My analysis and suggestions')}</span>}
                <p className={reply.status === 'generating' ? 'qa-answer qa-answer-generating' : 'qa-answer'}>{reply.text}</p>
              </>}
            </div>
            {reply.offline && api && index === session.turns.length-1 && reply.status !== 'generating' && <button type="button" className="qa-text-button" disabled={pending !== null} onClick={() => send(question,index)}>{reply.interrupted ? t('重新生成','Generate again') : t('重试在线回答','Retry online answer')}</button>}
            {reply.sources.length > 0 && <div className="qa-sources" aria-label={t('回答出处','Answer sources')}>
              {[...new Map(reply.sources.map(source => [source.href,source])).values()].map(source => source.href === '#' + page
                ? <span className="qa-current-source" key={source.href}>{t('本页出处','On this page')} · {source.title}</span>
                : <a key={source.href} href={source.href} onClick={event => {if (navigate(event)) setOpen(false);}}>{source.title}<Icon name="arrow"/></a>)}
            </div>}
          </div></div>
        </article>)}
        {(!session.turns.length || samples) && <div className="qa-suggestions">
          <span className="qa-suggestion-label">{t('可以从这里开始','A few places to start')}</span>
          <div className="qa-samples">{suggestions[page].map((row,index) => <button type="button" key={row.en} disabled={pending !== null} title={row[language]} onClick={() => send(row[language])}>{shortPrompts[page][index][zh ? 0 : 1]}<Icon name="arrow"/></button>)}</div>
          {interviewCards[page] && <details className="qa-interview" key={page}><summary>{t('面试官怎么问 · 技术实现','Interview questions · Implementation')}</summary><div className="qa-samples">{interviewCards[page].map(card => <button type="button" key={card.id} disabled={pending !== null} onClick={() => send(card.questions[zh ? 0 : 1])}>{card.questions[zh ? 0 : 1]}<Icon name="arrow"/></button>)}</div></details>}
        </div>}
      </div>
      {showLatest && <button className="qa-latest" type="button" onClick={latest}>{t('回到最新消息 ↓','Latest messages ↓')}</button>}
      <div className="qa-compose">
        {confirmReset && <div className="qa-reset" role="group" aria-label={t('确认新对话','Confirm new chat')}>
          <p>{t('开始新对话？这段聊天和草稿会被清除。','Start fresh? This chat and draft will be cleared.')}</p><div><button type="button" onClick={reset}>{t('开始新对话','Start fresh')}</button><button type="button" onClick={() => setConfirmReset(false)}>{t('继续聊','Keep chatting')}</button></div>
        </div>}
        {session.turns.length > 0 && <button type="button" className="qa-text-button qa-page-prompts" aria-expanded={samples} onClick={() => {setSamples(value => !value);latest();}}>{samples ? t('收起本页问题','Hide page questions') : t('看看本页问题','Explore page questions')}</button>}
        <form className="qa-input-wrap" onSubmit={event => {event.preventDefault();send(session.draft);}}>
          <textarea ref={input} rows="1" maxLength={2000} aria-label={t('你的问题','Your question')} placeholder={t('你想聊些什么？','What’s on your mind?')} value={session.draft} onChange={event => setSession(previous => ({...previous,draft:event.target.value}))} onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) {event.preventDefault();if (pending === null) send(session.draft);}
          }}/>
          <button type="submit" disabled={pending !== null || !session.draft.trim()} aria-label={t('发送','Send')}><Icon name="send"/></button>
        </form>
      </div>
    </dialog>}
  </div>;
}
