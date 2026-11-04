import React, { useState } from 'react';

// Same Sunday-first rotation as the original Cupcakes flavor-of-the-day page.
const week = [
  ['Sun', '日', 'Blueberry Pie', '蓝莓派', 'blueberry-pie'],
  ['Mon', '一', 'Matcha', '抹茶', 'matcha'],
  ['Tue', '二', 'Reeses', '花生酱巧克力', 'reeses'],
  ['Wed', '三', 'Strawberry Shortcake', '草莓奶油蛋糕', 'strawberry'],
  ['Thu', '四', 'S’mores', 'S’mores', 'smores'],
  ['Fri', '五', 'Banana Split', '香蕉船', 'banana-split'],
  ['Sat', '六', 'Cannoli', '意式奶油卷', 'cannoli'],
];

export default function FlavorWeek({ en }) {
  const [day, setDay] = useState(() => new Date().getDay());
  const [english, zh, name, localized, photo] = week[day];
  return <div className="flavor-week">
    <p className="week-edition">SPRINKLES / FLAVOR CALENDAR</p>
    <h3>{en ? 'A week of cupcakes' : '一周口味日历'}</h3>
    <div className="week-days" role="group" aria-label={en ? 'Choose a weekday' : '选择星期'}>
      {week.map(([label, short], i) => <button type="button" key={label} aria-pressed={day === i}
        aria-label={en ? label : '星期' + short} onClick={() => setDay(i)}>{en ? label : short}</button>)}
    </div>
    <figure>
      <img src={import.meta.env.BASE_URL + 'Cupcakes/assets/' + photo + '.jpg'} alt="" />
      <figcaption role="status"><small>{en ? english : '星期' + zh}</small><strong>{en ? name : localized}</strong></figcaption>
    </figure>
  </div>;
}
