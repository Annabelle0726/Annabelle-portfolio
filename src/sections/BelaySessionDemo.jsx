import React, { useState } from 'react';
import './belay-session-demo.css';

const storageKey = 'portfolio.belay.lab.v2';
const initialSession = { file: 'other.csv', result: 'idle', question: false, closed: false };
function readDemo() {
  try {
    const data = JSON.parse(sessionStorage.getItem(storageKey));
    if (['other.csv', 'practice.csv'].includes(data?.file) &&
        ['idle', 'error', 'success'].includes(data.result) &&
        typeof data.question === 'boolean' && typeof data.closed === 'boolean') return data;
  } catch { /* Keep the example usable when browser storage is unavailable. */ }
  return initialSession;
}

export default function BelaySessionDemo({ en, detail = false }) {
  const [session, setSession] = useState(readDemo);
  const t = (zh, english) => en ? english : zh;
  const { file, result, question, closed } = session;
  const success = result === 'success';
  function update(changes) {
    setSession(previous => {
      const next = { ...previous, ...changes };
      try { sessionStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Continue in memory. */ }
      return next;
    });
  }
  return <section className={detail ? 'belay-session belay-lab-detail' : 'web-project-cover belay-session'} aria-label={t('Belay 交互练习台', 'Belay interactive workspace')}>
    <div className="belay-session-shell">
      <header><span lang="en"><i aria-hidden="true" /> BELAY / LEARNING LAB</span><small>{t('作品集交互示例', 'Portfolio demo')}</small></header>
      <ol className="belay-lab-steps" aria-label={t('练习进展', 'Exercise progress')}>
        {[t('运行', 'RUN'), t('修正', 'FIX'), t('理解', 'REFLECT')].map((label, i) => <li key={i} data-active={i === (success ? 2 : result === 'error' ? 1 : 0)}><span>0{i + 1}</span>{label}</li>)}
      </ol>
      <div className="belay-lab-canvas">
        {closed ? <div className="belay-saved-record">
          <span className="lab-record-icon" aria-hidden="true">↳</span>
          <small>{t('最近会话 / 已保存', 'RECENT SESSION / SAVED')}</small>
          <h4>{t('按类别计算平均值', 'Mean by category')}</h4>
          <p>{t('代码、运行结果和追问都留在这里。', 'Your code, result and follow-up are kept here.')}</p>
          <code>{file}</code>
          <div className="lab-record-tags"><span>{success ? t('检查通过', 'Checks passed') : result === 'error' ? t('等待修正', 'Needs a fix') : t('准备运行', 'Ready to run')}</span><span>{question ? t('已展开追问', 'Follow-up opened') : t('尚未追问', 'No follow-up yet')}</span></div>
        </div> : <>
          <div className="belay-session-editor">
            <div className="belay-editor-bar"><span>practice.py</span><span>PYTHON</span></div>
            <div className="lab-code" aria-label={t('示例代码', 'Example code')}>
              <span className="lab-line"><em>1</em><code><b>import</b> pandas <b>as</b> pd</code></span>
              <span className="lab-line" data-error={result === 'error'}><em>2</em><code>df = pd.read_csv(<mark>"{file}"</mark>)</code></span>
              <span className="lab-line"><em>3</em><code>means = df.groupby(<mark>"category"</mark>)</code></span>
              <span className="lab-line"><em>4</em><code>means[<mark>"value"</mark>].mean().to_dict()</code></span>
            </div>
            <div className="lab-run-bar"><span>{t('示例数据 · A: 2, 4 / B: 6, 10', 'Sample data · A: 2, 4 / B: 6, 10')}</span><button type="button" className="lab-run" onClick={() => update({ result: file === 'practice.csv' ? 'success' : 'error', question: false })}>▷ {t('运行', 'Run')}</button></div>
            <div className="lab-terminal" data-result={result} role="status" aria-atomic="true">
              <small>{success ? '✓ OUTPUT' : result === 'error' ? '× TRACEBACK' : '› TERMINAL'}</small>
              <samp>{success ? "{'A': 3.0, 'B': 8.0}" : result === 'error' ? "FileNotFoundError: 'other.csv'" : t('点「运行」，看看会发生什么。', 'Select Run to inspect the result.')}</samp>
            </div>
          </div>
          <div className="belay-lab-coach">
            <p className="lab-coach-label"><span aria-hidden="true">✦</span> {t('学习反馈', 'LEARNING FEEDBACK')}</p>
            <p>{success ? t('通过检查了。现在试着解释，结果为什么长这样？', 'Checks passed. Now explain why the result has this structure.') : result === 'error' ? t('第二行指向了另一份文件。当前练习提供的是 practice.csv，先核对文件名。', 'Line 2 points to another file. This exercise provides practice.csv. Check the file name first.') : t('目标：按类别求平均值，再把结果组织成字典。', 'Goal: calculate the mean for each category and return a dictionary.')}</p>
            <button type="button" className="lab-next" disabled={result === 'idle'}
              onClick={() => success ? update({ question: !question }) : update({ file: 'practice.csv', result: 'idle', question: false })}>
              {success ? t(question ? '收起解释' : '为什么 category 是键？', question ? 'Close explanation' : 'Why is category the key?') : t('改为 practice.csv', 'Use practice.csv')} <span aria-hidden="true">↳</span>
            </button>
            {question && success && <p className="lab-answer">{t('groupby 把同一类别的值分到一起。A 的平均值是 3，B 是 8；to_dict() 保留类别作为键，对应的平均值作为值。', 'groupby gathers values by category. A averages 3 and B averages 8. to_dict() keeps each category as a key and its mean as the value.')}</p>}
          </div>
        </>}
      </div>
      <footer>
        <button type="button" className="lab-reset" onClick={() => update(initialSession)}>{t('重新体验', 'Start again')}</button>
        <button type="button" className="lab-save" onClick={() => update({ closed: !closed })}>{closed ? t('继续上次学习', 'Resume session') : t('收起并保存', 'Save & close')} <span aria-hidden="true">→</span></button>
      </footer>
    </div>
  </section>;
}
