import React, { useState } from 'react';
import { localize } from './data-projects';
import './data-overview-preview.css';

const figureNotes = {
  'data-athub': [
    ['先看不同模型的基线表现，再比较阈值和预测窗口。', 'Start with the model baselines, then explore thresholds and forecast horizons.'],
    ['异常定义改变后，F1 分数也随之变化。', 'Changing the anomaly definition also changes the F1 score.'],
    ['抓到更多异常的同时，也要看正常日期被误报了多少。', 'Catching more anomalies also calls for checking false alarms on normal days.'],
  ],
  'data-visualization': [
    ['行业与死亡原因之间的连线，展示记录中的数量分布。', 'Links between industries and causes show the distribution of recorded counts.'],
    ['沿着同一时间轴，比较进口与出口的变化。', 'Compare imports and exports on a shared time axis.'],
    ['按水体汇总累计泄漏量，用对数轴呈现数量级差异。', 'Spill volumes are summed by water body and shown on a logarithmic scale.'],
  ],
};
const factors = [
  { label:['能源条件','Energy'], title:['持续运行的基础','The basis for continuous operation'], text:['比较能源供给条件时，需要把可持续性与可用性一起考虑。','Energy supply needs to be considered in terms of both sustainability and availability.'] },
  { label:['地域差异','Location'], title:['地点与需求的适配','A location that fits the need'], text:['不同地点的条件各有优势和限制，需要放回同一个选址问题里比较。','Locations have different strengths and constraints. Compare them against the same siting needs.'] },
  { label:['成本约束','Cost'], title:['结合条件看成本','Cost in context'], text:['单项价格低不等于整体最优，成本需要结合能源和地域条件一起看。','One low price does not establish the best overall choice. Consider costs alongside energy and geography.'] },
];

export default function DataOverviewPreview({ project, language, onNavigate }) {
  const [selected, setSelected] = useState(0);
  const en = language === 'en';
  const t = pair => localize(pair,language);
  const id = project.id + '-preview';
  if (project.id === 'data-energy') {
    const factor = factors[selected];
    return <div className="data-card-visual data-preview data-factor-preview">
      <div className="data-preview-topline"><span>ENERGY / PLACE / POSSIBILITY</span><span>0{selected + 1} / 03</span></div>
      <div className="data-energy-cover">
        <div className={'data-energy-orbits factor-' + selected} aria-hidden="true"><i/><i/><i/><span>↗</span></div>
        <div className="data-energy-factors" role="group" aria-label={en ? 'Explore siting factors' : '探索选址维度'}>
          {factors.map((item,index) => <button type="button" key={item.label[1]} aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}><small>0{index+1}</small>{t(item.label)}</button>)}
        </div>
        <div className="data-factor-copy" id={id} role="status" aria-live="polite" aria-atomic="true"><h3>{t(factor.title)}</h3><p>{t(factor.text)}</p></div>
        <small>{en ? 'Explore the decision framework' : '点选维度，看看选址中的取舍'}</small>
      </div>
    </div>;
  }
  const figure = project.figures[selected];
  const labels = project.id === 'data-athub' ? [['基线','Baseline'],['阈值','Thresholds'],['预测窗口','Horizons']] : [['职业安全','Safety'],['贸易','Trade'],['水体泄漏','Spills']];
  return <div className="data-card-visual data-preview">
    <div className="data-preview-topline"><span>{en ? 'INSIDE THE ANALYSIS' : '翻看原始分析图表'}</span><span>0{selected+1} / 03</span></div>
    <div className="data-preview-options" role="group" aria-label={en ? 'Choose an analysis figure' : '选择分析图表'}>
      {project.figures.map((item,index) => <button type="button" key={item.src} aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}>{t(labels[index])}</button>)}
    </div>
    <div id={id}>
      <a className="data-preview-image" href={'#'+project.id} onClick={onNavigate} aria-label={(en ? 'View case: ' : '查看项目：')+t(figure.label)}><img key={figure.src} src={figure.src} alt={t(figure.label)} loading="lazy"/></a>
      <div className="data-preview-caption" role="status" aria-live="polite" aria-atomic="true"><h3>{t(figure.label)}</h3><p>{t(figureNotes[project.id][selected])}</p></div>
    </div>

  </div>;
}
