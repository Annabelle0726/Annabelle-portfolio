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

export default function TravelSelector({ en }) {
  const [preference, setPreference] = useState('all');
  const firstFilter = useRef(null);
  const places = destinationsFor(preference);
  return <section className="travel-selector uxui-demo" aria-labelledby="travel-question">
    <div className="travel-live">
      <p className="uxui-kicker">{en ? 'COURSE PROTOTYPE · INTERACTION DEMO' : '课程原型 · 交互演示'}</p>
      <h2 id="travel-question">{en ? 'Where would you like to go?' : '你更想去哪里？'}</h2>
      <div className="travel-filters" role="group" aria-labelledby="travel-question">
        {filters.map(([id, zh, english]) => <button key={id} type="button"
          ref={id === 'all' ? firstFilter : undefined}
          aria-pressed={preference === id} onClick={() => setPreference(id)}>
          <span aria-hidden="true">{preference === id ? '✓ ' : ''}</span>{en ? english : zh}
        </button>)}
      </div>
      <p className="travel-count" role="status" aria-atomic="true">
        {places.length} {en ? 'destinations' : '个目的地'}
        <span className="travel-sr">{filters.find(([id]) => id === preference)[en ? 2 : 1]}</span>
      </p>
      <ul className="travel-results">
        {places.map(place => <li key={place.name}>
          <img alt="" width="96" height="54" src={import.meta.env.BASE_URL + 'PortfolioDigitalProduct/assets/images/popular-destinations/' + place.name.toLowerCase().replaceAll(' ', '-') + '.jpg'} />
          <strong>{place.name}</strong><span>{en ? place.location : regions[place.location]}</span>
        </li>)}
      </ul>
      {preference !== 'all' && <button className="travel-reset" type="button"
        onClick={() => { setPreference('all'); firstFilter.current.focus(); }}>
        <span aria-hidden="true">↺ </span>{en ? 'View all' : '查看全部'}
      </button>}
    </div>
    <aside className="travel-guide">
      <p className="uxui-kicker">{en ? 'DESIGN NOTE' : '设计手记'}</p>
      <h3>{en ? 'From a preference to a place' : '从一种偏好，到一个去处'}</h3>
      <p>{en
        ? 'I worked on the preference selector and destination cards. Try Beach, then City to see how the selection and results respond together.'
        : '我参与了偏好选择和目的地卡片的交互实现。试试先选「海滩」，再换成「城市」，看看同一处的列表如何回应两次选择。'}</p>
    </aside>
  </section>;
}
