import { createStore } from 'redux';

import reducers from './root-reducer';

const store = createStore(reducers);

export default store;
