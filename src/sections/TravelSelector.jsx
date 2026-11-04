import React, { useRef, useState } from 'react';
import { destinationsFor } from './uxui-demo';
import './travel-selector.css';

const filters = [
  ['all', '全部', 'All'],
  ['beach', '海滩', 'Beach'],
  ['city', '城市', 'City'],
  ['mountains', '山野', 'Mountains'],
];

const regions = {
  Italy: '意大利', Portugal: '葡萄牙', Georgia: '美国 · 佐治亚州',
  Indonesia: '印度尼西亚', Turkey: '土耳其', California: '美国 · 加州',
};

export default function TravelSelector({ en, compact = false }) {
  const [preference, setPreference] = useState('all');
  const [expanded, setExpanded] = useState(null);
  function selectPreference(id) {
    setPreference(id);
    setExpanded(null);
  }
  const firstFilter = useRef(null);
  const places = destinationsFor(preference);
  return <section className="travel-selector uxui-demo" aria-labelledby="travel-question">
    <div className="travel-live">
      <p className="uxui-kicker">{en ? 'COURSE PROTOTYPE · INTERACTION DEMO' : '课程原型 · 交互演示'}</p>
      <h2 id="travel-question">{en ? 'Where would you like to go?' : '你更想去哪里？'}</h2>
      <div className={compact ? 'travel-filters' : 'travel-filters travel-theme-cards'} role="group" aria-labelledby="travel-question">
        {filters.filter(([id]) => compact || id !== 'all').map(([id, zh, english]) => <button key={id} type="button"
          ref={id === (compact ? 'all' : 'beach') ? firstFilter : undefined}
          aria-pressed={preference === id} onClick={() => selectPreference(id)}>
          {!compact && <img alt="" src={import.meta.env.BASE_URL + 'PortfolioDigitalProduct/assets/images/popular-destinations/' + destinationsFor(id)[0].name.toLowerCase() + '.jpg'} />}
          <span aria-hidden="true">{preference === id ? '✓ ' : ''}</span>{en ? english : zh}
        </button>)}
      </div>
      <p className="travel-count" role="status" aria-atomic="true">
        {places.length} {en ? 'destinations' : '个目的地'}
        <span className="travel-sr">{filters.find(([id]) => id === preference)[en ? 2 : 1]}</span>
      </p>
      <ul className="travel-results" key={preference}>
        {places.map((place, index) => {
          const src = import.meta.env.BASE_URL + 'PortfolioDigitalProduct/assets/images/popular-destinations/' + place.name.toLowerCase().replaceAll(' ', '-') + '.jpg';
          const open = expanded === place.name;
          return <li key={place.name} style={{ '--row': index }}>
            <button type="button" className="travel-place" aria-expanded={open}
              onClick={() => setExpanded(open ? null : place.name)}>
              <img alt="" width="96" height="54" src={src} />
              <strong>{place.name}</strong><span>{en ? place.location : regions[place.location]}</span>
              <span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            {open && <figure className="travel-postcard">
              <img src={src} alt={en ? 'Destination photograph of ' + place.name : place.name + ' 的目的地照片'} />
              <figcaption>{place.name} · {en ? place.location : regions[place.location]}</figcaption>
            </figure>}
          </li>;
        })}
      </ul>
      {preference !== 'all' && <button className="travel-reset" type="button"
        onClick={() => { selectPreference('all'); firstFilter.current.focus(); }}>
        <span aria-hidden="true">↺ </span>{en ? 'View all' : '查看全部'}
      </button>}
    </div>
    {!compact && <aside className="travel-guide">
      <p className="uxui-kicker">{en ? 'DESIGN NOTE' : '设计手记'}</p>
      <h3>{en ? 'From a preference to a place' : '从一种偏好，到一个去处'}</h3>
      <p>{en
        ? 'I worked on the preference selector and destination cards. Try Beach, then City to see how the selection and results respond together.'
        : '我参与了偏好选择和目的地卡片的交互实现。试试先选「海滩」，再换成「城市」，看看同一处的列表如何回应两次选择。'}</p>
    </aside>}
  </section>;
}
