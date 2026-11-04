import React, { useState } from 'react';
import './cupcake-reveal.css';

const flavors = [
  { photo: 'strawberry', name: ['草莓', 'Strawberry'], clue: ['一抹莓红', 'A little blush'] },
  { photo: 'matcha', name: ['抹茶', 'Matcha'], clue: ['一点青绿', 'A hint of green'] },
  { photo: 'smores', name: ['S’mores', 'S’mores'], clue: ['一层焦香', 'A toasted top'] },
];
const photoUrl = name => import.meta.env.BASE_URL + 'Cupcakes/assets/' + name + '.jpg';

function GiftCard({ flavor, index, en }) {
  const [open, setOpen] = useState(false);
  const name = flavor.name[en ? 1 : 0];
  const clue = flavor.clue[en ? 1 : 0];
  const number = '0' + (index + 1);
  return <button type="button" className="cupcake-card" aria-pressed={open}
    aria-label={en ? `Gift box ${number}, ${open ? name : clue}` : `礼盒 ${number}，${open ? name : clue}`}
    onClick={() => setOpen(value => !value)}>
    <span className="cupcake-turn" aria-hidden="true">
      <span className="cupcake-face cupcake-wrapped">
        <img src={photoUrl('mystery')} alt="" />
        <span className="cupcake-caption"><small>{number} / {en ? 'CLUE' : '线索'}</small><strong>{clue}</strong></span>
      </span>
      <span className="cupcake-face cupcake-unwrapped">
        <img src={photoUrl(flavor.photo)} alt="" />
        <span className="cupcake-caption"><small>{number} / {en ? 'FLAVOR' : '口味'}</small><strong>{name}</strong></span>
      </span>
    </span>
  </button>;
}

export default function CupcakeReveal({ en }) {
  return <section className="cupcake-stage uxui-demo" aria-labelledby="cupcake-title">
    <p className="cupcake-edition" lang="en">CUPCAKES　/　TASTING NOTES</p>
    <h2 id="cupcake-title">{en ? 'Unwrap a little surprise.' : '打开一份甜蜜的小惊喜'}</h2>
    <p className="cupcake-hint">{en ? 'Pick a box to reveal its flavor. Tap it again to wrap it up.' : '挑一只礼盒，点开看看是什么口味。再点一下，就能把它合上。'}</p>
    <div className="cupcake-trio">
      {flavors.map((flavor, index) => <GiftCard key={flavor.photo} flavor={flavor} index={index} en={en} />)}
    </div>
  </section>;
}
