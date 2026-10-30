import React, { useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { dataProjects, localize } from './data-projects';
import './data-projects.css';
import './data-ribbon.css';

function EnergyCover({ en }) {
 return <div className="data-energy-cover"><span className="data-cover-label">ENERGY / PLACE / POSSIBILITY</span><div className="data-energy-orbits" aria-hidden="true"><i/><i/><i/><span>↗</span></div><div className="data-energy-factors">{(en ? ['Energy','Location','Cost'] : ['能源条件','地域差异','成本约束']).map((label,i)=><span key={label}><small>0{i+1}</small>{label}</span>)}</div><small>{en ? 'Analytical framework' : '分析框架'}</small></div>;
}
function Cover({ project, en }) {
 return project.cover ? <div className="data-cover"><img src={project.cover} alt={localize(project.coverAlt,en?'en':'zh')}/><span className="data-cover-label">{en ? 'FROM THE ORIGINAL ANALYSIS' : '原始分析图表'}</span></div> : <EnergyCover en={en}/>;
}
function Figure({ figure, language }) {
 const dialog=useRef(null), en=language==='en', label=localize(figure.label,language);
 return <figure className="data-figure"><button type="button" onClick={()=>dialog.current.showModal()} aria-label={en?'Enlarge: '+label:'放大：'+label}><img loading="lazy" src={figure.src} alt={label}/></button><figcaption>{label}<button type="button" onClick={()=>dialog.current.showModal()}>{en?'Enlarge ↗':'放大查看 ↗'}</button></figcaption><dialog className="data-image-dialog" ref={dialog} aria-label={label} onClick={event=>{if(event.target===event.currentTarget)dialog.current.close();}}><div><span>{label}</span><button type="button" autoFocus onClick={()=>dialog.current.close()}>{en?'Close ×':'关闭 ×'}</button></div><img src={figure.src} alt={label}/></dialog></figure>;
}
export default function Projects({language='zh',projectId='services',onNavigate}) {
 const en=language==='en', t=value=>localize(value,language), project=dataProjects.find(item=>item.id===projectId);
 return <section id={project?project.id:'services'} className={"data-page"+(project?" data-detail":"")} lang={en?'en':'zh-CN'}>
 {!project && <div className="data-ribbon-art" aria-hidden="true"><div className="data-brand-ribbon" /></div>}
 <div className="data-inner">
 {!project && <SectionHeader as="h1" eyebrow="PROJECTS / DATA & AI" title={en?'Data & AI':'数据与 AI'}/>}
 {project ? <>
 <nav className="data-breadcrumb" aria-label={en?'Breadcrumb':'面包屑导航'}><a href="#services" onClick={onNavigate}>{en?'← All three projects':'← 返回精选项目'}</a><span>{project.number} / 03</span></nav>
 <header className="data-detail-heading"><p className="data-kicker">{t(project.category)}</p><h1>{t(project.title)}</h1><p>{t(project.summary)}</p><span className="data-tools">{project.tools}</span></header>
 <div className={"data-detail-opening"+(!project.cover?" data-opening-energy":"")}><div className="data-opening-copy"><p>{t(project.intro)}</p><a className="data-source" href={project.source} target="_blank" rel="noopener noreferrer">{t(project.sourceLabel)} <span aria-hidden="true">↗</span></a></div>{!project.cover&&<EnergyCover en={en}/>}</div>
 <div className="data-chapters">{project.chapters.map(([heading,body],i)=><section key={heading[1]}><span className="data-number">0{i+1}</span><h2>{t(heading)}</h2><p>{t(body)}</p></section>)}</div>
 {project.figures.length>0&&<div className="data-gallery"><div className="data-gallery-heading"><h2>{en?'Inside the analysis':'走进分析'}</h2><p>{en?'Original figures · Select an image to enlarge':'原始图表 · 点击可放大阅读'}</p></div><div className="data-figure-grid">{project.figures.map(figure=><Figure key={figure.src} figure={figure} language={language}/>)}</div></div>}
 <nav className="data-related" aria-label={en?'Other data projects':'其他数据项目'}>{dataProjects.filter(item=>item.id!==project.id).map(item=><a key={item.id} href={'#'+item.id} onClick={onNavigate}><small>{en?'EXPLORE NEXT':'继续浏览'} / {item.number}</small><strong>{t(item.title)} <span aria-hidden="true">↗</span></strong></a>)}</nav>
 </> : <>
 <div className="data-intro"><p>{en?'Questions worth exploring. Evidence worth examining.':'从问题出发，让数据有迹可循。'}</p></div>
 <div className="data-project-grid">{dataProjects.map((item,i)=><article key={item.id} className={'data-card'+(i===0?' data-featured':'')}>
   <header className="data-card-heading"><p className="data-kicker">{item.number} / {t(item.category)}</p><h2><a href={'#'+item.id} onClick={onNavigate}>{t(item.title)}</a></h2></header>
   <a className="data-card-visual" href={'#'+item.id} onClick={onNavigate} aria-label={(en?'Explore ':'查看')+t(item.title)}><Cover project={item} en={en}/></a>
   <div className="data-card-body"><p>{t(item.summary)}</p><span className="data-tools">{item.tools}</span><a className="data-link" href={'#'+item.id} onClick={onNavigate}>{en?'Explore the case':'查看项目介绍'} <span aria-hidden="true">→</span></a></div>
 </article>)}</div>
 </>}
 </div></section>;
}
