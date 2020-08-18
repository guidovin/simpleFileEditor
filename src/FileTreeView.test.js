import React from 'react';
import { render } from '@testing-library/react';
import { fileTreeData, filesData } from "./mocks/dataMocks"


// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
// the component to test

import FileTreeView from './components/FileTreeView';

test('renders file tree with fetched data', () => {

  const { getByText } = render(<FileTreeView files={fileTreeData}/>);
  const linkElement = getByText("editor");
  expect(linkElement).toBeInTheDocument();
});
