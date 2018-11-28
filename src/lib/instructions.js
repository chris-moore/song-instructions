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
  structureParts,
  texture,
  time,
  wildcard,
} = data;

const getWeightedArray = (arr) => {
  const weightedArr = [];
  arr.forEach(item => {
    const { value, weight } = item;
    for (let i = 0; i < weight; i++) {
      weightedArr.push(value);
    }
  });
  return weightedArr;
};

const getItem = (arr) => {
  const weightedArr = getWeightedArray(arr);
  return shuffle(weightedArr)[0];
};

const getStructures = () => {
  const structureArr = [];
  for (let j = 0; j < 7; j++) {
    const parts = getItem(structureParts);
    const order = ['A'];
    let prev = 'A';
    for (let i = 0; i < parts; i++) {
      let part = getItem(structure);
      if (part === prev) {
        order.push(getItem(structure));
      } else {
        order.push(part);
      }
      prev = part;
    }
    structureArr.push({ value: order.join(''), weight: 1 });
  }
  return structureArr;
};

const getSettings = () => {
  const structArr = getStructures();
  return [
    {
      category: 'ATTRIBUTES',
      items: [
        { title: 'Beats Per Minute', data: bpm, selected: getItem(bpm) },
        { title: 'Key', data: key, selected: getItem(key) },
        { title: 'Scale', data: scale, selected: getItem(scale) },
        { title: 'Structure', data: structArr, selected: getItem(structArr) },
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

const getSummary = (settings) => {
  const summary = [];
  settings.forEach((setting) => {
    const { items } = setting;
    items.forEach(item => summary.push(`${item.title}: ${item.selected}`));
  });
  return summary;
}

const generateSong = () => {
  const song = [];
  Object.keys(data).forEach((key) => {
    song.push(`${key}: ${getItem(data[key])}`);
  });
  return song;
};

export { getSettings, getSummary };
export default generateSong;
