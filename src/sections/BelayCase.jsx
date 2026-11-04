import React, { useEffect, useRef, useState } from 'react';
import BelaySessionDemo from './BelaySessionDemo';
import SectionHeader from '../components/SectionHeader';
import ProjectPagination from '../components/ProjectPagination';
import successImage from '../assets/belay-case/success.webp';
import errorImage from '../assets/belay-case/error.webp';
import ribbonImage from '../assets/belay-case/ribbon.webp';
import './belay-case.css';

const screenshots = {
  success: { src: successImage, width: 1900, height: 1460 },
  error: { src: errorImage, width: 1783, height: 2048 },
};
const crops = {
  result: [.012, .76, .481, .224],
  feedback: [.529, .46, .435, .226],
  error: [.018, .866, .475, .119],
  errorFeedback: [.531, .538, .434, .151],
  glass: [.531, .697, .434, .15],
  quote: [.522, .866, .463, .118],
};

function GemArrow({ direction = 'diagonal', className = '' }) {
  const paths = {
    diagonal: 'M7 17 17 7M7 7h10v10',
    left: 'M17 12H7m0 0 5-5m-5 5 5 5',
    right: 'M7 12h10m0 0-5-5m5 5-5 5',
    down: 'M12 7v10m0 0-5-5m5 5 5-5',
    up: 'M12 17V7m0 0-5 5m5-5 5 5',
  };
  return <span className={`belay-gem ${className}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d={paths[direction]} /></svg></span>;
}

function Screen({ asset = 'success', crop, label, onZoom, eager = false, showZoom = true, className = '' }) {
  const { src, width, height } = screenshots[asset];
  const [x, y, w, h] = crop || [0, 0, 1, 1];
  return <figure className={`belay-screen ${className}`}>
    <button type="button" onClick={() => onZoom({ src, label })} aria-label={label}>
      <span className="belay-crop" style={{ aspectRatio: `${width * w} / ${height * h}` }}>
        <img src={src} width={width} height={height} alt={label} loading={eager ? 'eager' : 'lazy'} decoding="async"
          style={{ width: `${100 / w}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} />
      </span>
      {showZoom && <GemArrow className="belay-zoom" />}
    </button>
    <figcaption>{label}</figcaption>
  </figure>;
}

function ImageDialog({ image, onClose, en }) {
  const dialog = useRef(null);
  const [actual, setActual] = useState(false);
  useEffect(() => {
    if (!image) return;
    const node = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    setActual(false);
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (node.open) node.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [image]);
  return <dialog ref={dialog} className="belay-dialog" aria-label={image?.label || (en ? 'Screenshot' : '界面截图')} onClose={onClose} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
  }}>
    <div className="belay-dialog-toolbar"><span>{image?.label}</span><button type="button" aria-pressed={actual} onClick={() => setActual(value => !value)}>{actual ? (en ? 'Fit image' : '适应窗口') : (en ? 'Original size' : '查看细节')}</button><button type="button" autoFocus onClick={() => dialog.current.close()}>{en ? 'Close ×' : '关闭 ×'}</button></div>
    <div className={`belay-dialog-image${actual ? ' is-actual' : ''}`}>{image && <img src={image.src} alt={image.label} />}</div>
  </dialog>;
}

function Ribbon({ host }) {
  const layer = useRef(null);
  useEffect(() => {
    const target = host.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let next = [0, 0];
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0;
      layer.current?.style.removeProperty('--belay-dx');
      layer.current?.style.removeProperty('--belay-dy');
    };
    const move = event => {
      if (reduced.matches || !pointer.matches || event.pointerType === 'touch' || event.target.closest('dialog')) return;
      const box = target.getBoundingClientRect();
      next = [((event.clientX - box.left) / box.width - .5) * 10, ((event.clientY - box.top) / box.height - .5) * 7];
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        layer.current?.style.setProperty('--belay-dx', `${next[0]}px`);
        layer.current?.style.setProperty('--belay-dy', `${next[1]}px`);
      });
    };
    const visibility = () => { if (document.hidden) reset(); };
    target.addEventListener('pointermove', move, { passive: true });
    target.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      reset(); target.removeEventListener('pointermove', move); target.removeEventListener('pointerleave', reset);
      reduced.removeEventListener('change', reset); document.removeEventListener('visibilitychange', visibility);
    };
  }, [host]);
  return <div ref={layer} className="belay-ribbon" aria-hidden="true"><img src={ribbonImage} alt="" width="1200" height="675" /></div>;
}

export default function BelayCase({ language = 'zh', onNavigate }) {
  const en = language === 'en';
  const t = (zh, english) => en ? english : zh;
  const [outcome, setOutcome] = useState('success');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [image, setImage] = useState(null);
  const opening = useRef(null), paths = useRef(null);
  const goToPaths = () => {
    paths.current.focus({ preventScroll: true });
    paths.current.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <section id="web-belay" className="belay-page" lang={en ? 'en' : 'zh-CN'}><div className="belay-inner">
    <div className="belay-opening" ref={opening}>
      <SectionHeader as="h1" eyebrow="AI LEARNING WORKSPACE" title="Belay" subtitle={t("在练习中理解，在反馈中继续", "Understand through practice, keep going with feedback")} />
      <Ribbon host={opening} />
      <div className="belay-hero">
        <div className="belay-hero-copy">
          <p>{t('把练习要求、代码运行与 AI 对话放在一起，让学习者围绕当前问题继续探索。', 'Bring exercise instructions, code execution, and AI conversation into one workspace, so learners can keep exploring the problem in front of them.')}</p>
          <p>{t('从检查结果到解释原理，再到定位错误，界面帮助学习者看清下一步可以做什么。这里展示的是 Sol 数据科学学习工作区的使用场景。', 'From checking results and explaining concepts to investigating errors, the interface helps learners see what to try next. These scenes show the Sol data science learning workspace.')}</p>
          <p className="belay-meta">{t('学习工具 · 协作开发 · 数据科学', 'Learning tools · Collaborative development · Data science')}</p>
          <div className="belay-actions"><button type="button" className="belay-explore" onClick={goToPaths}><GemArrow />{t('探索学习场景', 'Explore the learning scenes')}</button><button type="button" className="belay-text-action" onClick={() => setImage({ src: successImage, label: t('完整学习工作区', 'Full learning workspace') })}><GemArrow />{t('查看完整界面', 'View the full workspace')}</button></div>
        </div>
        <div className="belay-live-stage"><BelaySessionDemo en={en} detail /></div>
      </div>
    </div>

    <section className="belay-paths belay-section" ref={paths} tabIndex={-1} aria-labelledby="belay-paths-title">
      <header className="belay-section-heading"><span aria-hidden="true">01</span><h2 id="belay-paths-title">{t('一次运行，两种学习路径', 'One run, two paths to learning')}</h2><div className="belay-switch" role="group" aria-label={t('运行场景', 'Run scenario')}><button type="button" aria-pressed={outcome === 'success'} aria-controls="belay-outcome" onClick={() => setOutcome('success')}>{t('运行成功', 'Successful run')}</button><button type="button" aria-pressed={outcome === 'error'} aria-controls="belay-outcome" onClick={() => setOutcome('error')}>{t('遇到错误', 'An error occurs')}</button></div></header>
      <div className="belay-path-content" id="belay-outcome" aria-live="polite">
        <div><Screen asset={outcome} crop={outcome === 'success' ? crops.result : crops.error} label={outcome === 'success' ? t('输出与检查结果 · 点击放大', 'Output and checks · Select to enlarge') : t('文件路径错误 · 点击放大', 'File path error · Select to enlarge')} onZoom={setImage} /><Screen asset={outcome} crop={outcome === 'success' ? crops.feedback : crops.errorFeedback} label={t('对应的学习反馈', 'The corresponding learning feedback')} onZoom={setImage} /></div>
        <div className="belay-path-copy"><h3>{outcome === 'success' ? t('通过检查后，继续理解原因', 'After the checks pass, explore why') : t('遇到错误时，先找到下一步', 'When something fails, find the next check')}</h3><p>{outcome === 'success' ? t('练习要求按类别计算平均值，并把结果组织成字典。代码运行通过后，反馈继续追问分组、计算与结果结构，邀请学习者用自己的语言解释代码。', 'The exercise asks learners to calculate a mean for each category and organize the results as a dictionary. After the code passes, the feedback asks about grouping, calculation, and the result structure, inviting learners to explain the code in their own words.') : t('这个示例中，代码读取了另一道练习的数据文件。反馈将报错与当前任务联系起来，引导学习者核对起始代码、文件名，以及预期的输出结构。', 'Here, the code tries to load a data file from a different exercise. The feedback connects the error to the current task and guides the learner to check the starter code, the file name, and the expected output structure.')}</p><p>{outcome === 'success' ? t('“运行成功”成为进一步理解的起点。结果是否正确、为什么得到这个结果，在同一条学习路径中被看见。', 'A successful run becomes a starting point for deeper understanding. The correctness of the result and the reason behind it remain part of the same learning process.') : t('把一次笼统的“我不会”变成可以检查的具体问题，让学习者有机会自己发现遗漏，再继续尝试。', 'A broad “I am stuck” becomes a specific question that can be checked, giving the learner a chance to notice what is missing and try again.')}</p><div className="belay-question"><span aria-hidden="true">↳</span>{outcome === 'success' ? t('为什么 category 会成为字典的键？', 'Why does category become the dictionary key?') : t('这道练习需要读取哪个文件？', 'Which file does this exercise expect?')}</div><p className="belay-caption">{t('来自截图中的反馈问题', 'A question drawn from the feedback shown')}</p></div>
      </div>
    </section>

    <div className="belay-details-grid">
      <section className="belay-section" aria-labelledby="belay-glass-title"><header className="belay-section-heading"><span aria-hidden="true">02</span><h2 id="belay-glass-title">{t('反馈依据，可展开查看', 'A closer look at the feedback')}</h2></header><p>{t('Glass Box 用简短说明呈现本次反馈关注的依据与下一步检查，为学习者提供更多理解回应的线索。', 'Glass Box offers a short explanation of what informed this response and the next check it focuses on, giving learners more context for the feedback.')}</p><details className="belay-glass" open><summary><span>GLASS BOX <small> / {t('反馈说明', 'RESPONSE CONTEXT')}</small></span><span className="belay-plus" aria-hidden="true">+</span></summary><div><p>{t('本次请求提供的代码运行结果报告了一个错误', 'The code run supplied with this request reported an error')}</p><p>{t('回应聚焦于一种可能的原因，以及下一项小范围检查', 'I focused on a possible cause and a small next check')}</p><button type="button" className="belay-text-action" onClick={() => setImage({ src: errorImage, label: t('Glass Box 原始界面', 'Original Glass Box interface') })}><GemArrow />{t('查看原始界面', 'View the original interface')}</button></div></details></section>
      <section className="belay-section" aria-labelledby="belay-quote-title"><header className="belay-section-heading"><span aria-hidden="true">03</span><h2 id="belay-quote-title">{t('沿着具体回复，继续追问', 'Continue from a specific reply')}</h2></header><p>{t('引用一条回复后继续提问，让后续问题保留上下文。学习者可以指出自己仍不理解的地方，把讨论落在具体内容上。', 'Quoting a reply keeps the context close to the next question. Learners can point to what they still do not understand and focus the conversation on that detail.')}</p><Screen asset="error" crop={crops.quote} label={t('引用回复与追问入口', 'Quoted reply and follow-up input')} onZoom={setImage} /><button type="button" className="belay-text-action" aria-expanded={quoteOpen} aria-controls="belay-quote-example" onClick={() => setQuoteOpen(value => !value)}><GemArrow direction={quoteOpen ? 'up' : 'down'} />{quoteOpen ? t('收起追问示例', 'Hide follow-up example') : t('展开追问示例', 'Explore the follow-up example')}</button><div id="belay-quote-example" className="belay-quote-example" hidden={!quoteOpen}><span>{t('截图中的追问', 'FOLLOW-UP FROM THE SCREENSHOT')}</span><blockquote lang="en">I still can't figure it out</blockquote><p>{t('这条追问引用了前面的文件路径说明。继续讨论时，所指向的回复仍然清楚可见。', 'This follow-up quotes the earlier explanation about the file path. The reply being discussed stays visible as the conversation continues.')}</p></div></section>
    </div>

    <section className="belay-work belay-section" aria-labelledby="belay-work-title"><header className="belay-section-heading"><span aria-hidden="true">04</span><h2 id="belay-work-title">{t('我参与的工作', 'My contributions')}</h2></header><div className="belay-work-grid">{[
      [t('学习者的使用体验', 'The learner experience'), t('围绕学习者如何进入工具、展开对话并继续学习，参与界面与使用流程的改进。', 'Contributed to interfaces and flows for entering the tool, starting conversations, and continuing the learning process.')],
      [t('让会话能够继续', 'Conversation continuity'), t('参与会话持久化、保存与恢复，让学习过程中的讨论能够继续，而不必每次重新开始。', 'Worked on conversation persistence, saving, and recovery so discussions can continue across sessions.')],
      [t('使用范围与运行管理', 'Access and operation'), t('围绕班级隔离、访问控制与模型调用预算，参与运行约束和集成方式的梳理。', 'Contributed to class separation, access control, model usage budgets, and integration constraints.')],
    ].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <ProjectPagination routeId="web-belay" en={en} onNavigate={onNavigate} />
    <ImageDialog image={image} onClose={() => setImage(null)} en={en} />
  </div></section>;
}
