// A small, local demonstration using six entries from the course's places.js.
// This does not run or alter the original booking prototype.
const destinations = [
  { name: 'Dolomites', location: 'Italy', type: 'mountains' },
  { name: 'Algarve', location: 'Portugal', type: 'beach' },
  { name: 'Atlanta', location: 'Georgia', type: 'city' },
  { name: 'Bali', location: 'Indonesia', type: 'beach' },
  { name: 'Istanbul', location: 'Turkey', type: 'city' },
  { name: 'Bass Lake', location: 'California', type: 'mountains' },
];
export function destinationsFor(preference) {
  return preference === 'all' ? destinations : destinations.filter(place => place.type === preference);
}
