import athubOverview from '../assets/data-projects/athub-4.png';
import athubThreshold from '../assets/data-projects/athub-11.png';
import athubForecast from '../assets/data-projects/athub-8.png';
import sankey from '../assets/data-projects/viz-3.png';
import trade from '../assets/data-projects/viz-0.png';
import water from '../assets/data-projects/viz-1.png';
import { dataProjectContent } from './data-project-content.mjs';

const images = {athubOverview, athubThreshold, athubForecast, sankey, trade, water};
export const dataProjects = dataProjectContent.map(project => ({
  ...project,
  cover: images[project.cover] ?? null,
  figures: project.figures.map(figure => ({...figure, src: images[figure.src]})),
}));
export const localize = (value, language) => value[language === 'en' ? 1 : 0];
