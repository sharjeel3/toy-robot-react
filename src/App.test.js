import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
Workaround for jsdom issue 1695.
Follow https://github.com/jsdom/jsdom/issues/1695
 */
window.HTMLElement.prototype.scrollIntoView = function() {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
