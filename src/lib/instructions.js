import clone from 'lodash/clone';
import shuffle from 'lodash/shuffle';
import data from './instructions-data';

const {
  bpm,
  harmony,
  key,
  lyricDelivery,
  lyricMetaphor,
  lyricSubject,
  melody,
  rhythm,
  scale,
  structure,
  texture,
  time,
  wildcard,
} = data;

const getItem = (arr) => {
  const weightedArr = [];
  arr.forEach(item => {
    const { value, weight } = item;
    for (let i = 0; i < weight; i++) {
      weightedArr.push(value);
    }
  });
  return shuffle(weightedArr)[0];
};

const getSettings = () => {
  return [
    {
      category: 'ATTRIBUTES',
      items: [
        { title: 'Beats Per Minute', data: clone(bpm), selected: getItem(bpm) },
        { title: 'Key', data: key, selected: getItem(key) },
        { title: 'Scale', data: scale, selected: getItem(scale) },
        { title: 'Structure', data: structure, selected: getItem(structure) },
        { title: 'Time Signature', data: time, selected: getItem(time) },
      ],
    },
    {
      category: 'LYRICS',
      items: [
        { title: 'Subject', data: lyricSubject, selected: getItem(lyricSubject) },
        { title: 'Metaphor', data: lyricMetaphor, selected: getItem(lyricMetaphor) },
        { title: 'Delivery', data: lyricDelivery, selected: getItem(lyricDelivery) },
      ],
    },
    {
      category: 'RHYTHM & HARMONY',
      items: [
        { title: 'Harmony', data: harmony, selected: getItem(harmony) },
        { title: 'Melody', data: melody, selected: getItem(melody) },
        { title: 'Rhythm', data: rhythm, selected: getItem(rhythm) },
        { title: 'Texture', data: texture, selected: getItem(texture) },
      ],
    },
    {
      category: 'OPTIONAL',
      items: [
        { title: 'Wild card', data: wildcard, selected: getItem(wildcard) },
      ],
    },
  ];
}

const generateSong = () => {
  const song = [];
  Object.keys(data).forEach((key) => {
    song.push(`${key}: ${getItem(data[key])}`);
  });
  return song;
};

export { getSettings };
export default generateSong;
