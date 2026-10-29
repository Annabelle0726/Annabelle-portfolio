import React from 'react';
import logo from '../assets/agency-bloom-logo.png';

export default function ArticleFooter({ originalUrl }) {
  return <footer className="article-footer"><div className="article-footer-brand"><img src={logo} alt="" /><span>Agency Bloom</span></div><a href={originalUrl} target="_blank" rel="noopener noreferrer">阅读公众号原文 ↗</a></footer>;
}
