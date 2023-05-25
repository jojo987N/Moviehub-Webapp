import { JSDOM } from 'jsdom';
import LocalStorageMock from './localStorageMock.js';
import data from './dataMock.js';
import { DEFAULT_NB_ITEMS } from '../modules/global.js';
import display from './utilsMock.js';
import ContentMock from './contentMock.js';

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = new LocalStorageMock();

document.body.innerHTML = ContentMock.render();

const app = localStorage.getItem('app') || Math.random().toString(36).slice(2, 15);
localStorage.setItem('app', app);

display(data, DEFAULT_NB_ITEMS);

export default window;
