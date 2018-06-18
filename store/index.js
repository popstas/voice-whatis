import pjson from '~/package.json';

// mutations
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ANSWERS = 'SET_ANSWERS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const testItems = [
  {
    id: 1,
    questions: ['в желто-зеленом'],
    answer: 'бабл гам'
  },
  {
    id: 2,
    questions: ['в синем', 'в голубом'],
    answer: 'возможно арбуз'
  },
  {
    id: 3,
    questions: ['в черном'],
    answer: 'возможно mix aurora'
  },
  {
    id: 4,
    questions: ['в красном'],
    answer: 'гранат'
  },
  {
    id: 5,
    questions: ['в белом'],
    answer: 'кофе'
  }
];

export const state = () => ({
  // data
  items: [],

  // constants
  name: pjson.name,
  version: pjson.version,
  description: pjson.description,
  homepage: pjson.homepage,

  // app state
  answers: [],
  lastItem: {},
  increment: 0
});

export const mutations = {
  [SET_ITEMS](state, items) {
    state.items = items;
  },

  [SET_ANSWERS](state, answers) {
    state.answers = answers;
  },

  [ADD_ITEM](state, item) {
    console.log('add item: ', item);
    state.items.push(item);
  },

  [DELETE_ITEM](state, item) {
    console.log('delete item: ', item);
    const i = state.items.indexOf(item);
    state.items.splice(i, 1);
  }
};

export const actions = {};

export const strict = process.env.NODE_ENV !== 'production';
