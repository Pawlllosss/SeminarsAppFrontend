import React from 'react';
import ReactDOM from 'react-dom';
import CoursesView from "./components/course/CoursesView";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoursesView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
