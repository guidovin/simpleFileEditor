import React from 'react';
import { render } from '@testing-library/react';
import { fileTreeData, filesData } from "./mocks/dataMocks"


// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
// the component to test

import CustomTextEditor from './components/CustomTextEditor';

test('renders file editor with data', () => {
  const { getByText } = render(<CustomTextEditor file={filesData[0]}/>);
  const linkElement = getByText(filesData[0].name);
  expect(linkElement).toBeInTheDocument();
});
