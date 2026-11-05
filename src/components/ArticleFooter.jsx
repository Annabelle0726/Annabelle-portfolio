import React from 'react';
import WebProjectNav from './WebProjectNav';
import { articlePageLinks } from './article-pagination';

export default function ArticleFooter({ routeId, language = 'zh', onNavigate }) {
  const en = language === 'en';
  const links = articlePageLinks(routeId, en);
  return links && <WebProjectNav {...links} en={en} onNavigate={onNavigate} ariaLabel={en ? 'Article navigation' : '文章翻页'} />;
}
