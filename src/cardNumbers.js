import { shuffle } from 'lodash';

// import _ from 'lodash';
// const shuffle = _.shuffle;

// const shuffle = require('lodash').shuffle;

const numbers = shuffle([ 
    { value: 1, id:1},
    { value: 1, id:2},
    { value: 2, id:3},
    { value: 2, id:4},
    { value: 3, id:5},
    { value: 3, id:6},
    { value: 4, id:7},
    { value: 4, id:8},
    { value: 5, id:9},
    { value: 5, id:10},
    { value: 6, id:11},
    { value: 6, id:12},
    { value: 7, id:13},
    { value: 7, id:14},
    { value: 8, id:15},
    { value: 8, id:16},
  ]);

export default numbers;