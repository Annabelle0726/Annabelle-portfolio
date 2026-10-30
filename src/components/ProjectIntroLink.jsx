import React from 'react';
import './project-intro-link.css';

export default function ProjectIntroLink({ href, onNavigate, en = false, projectName }) {
  return <a className="project-intro-link" href={href} onClick={onNavigate}>
    <span className="project-intro-label">{en ? 'Explore the project' : '查看项目介绍'}</span>
    <span className="project-intro-gem" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
    <span className="visually-hidden"> · {projectName}</span>
  </a>;
}
