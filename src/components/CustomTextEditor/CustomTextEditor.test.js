import React from 'react';
import { render } from '@testing-library/react';
import { filesData } from "../../mocks/dataMocks"
import '@testing-library/jest-dom/extend-expect'
// the component to test
import CustomTextEditor from './CustomTextEditor';

// simple example test
test('renders file editor with data', () => {
  const { getByText } = render(<CustomTextEditor file={filesData[0]}/>);
  const linkElement = getByText(filesData[0].name);
  expect(linkElement).toBeInTheDocument();
});
