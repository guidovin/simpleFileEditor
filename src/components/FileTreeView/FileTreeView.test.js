import React from 'react';
import { render } from '@testing-library/react';
import { fileTreeData } from "../../mocks/dataMocks"
import '@testing-library/jest-dom/extend-expect'
// the component to test
import FileTreeView from './FileTreeView';

// simple example test
test('renders file tree with fetched data', () => {
  const { getByText } = render(<FileTreeView files={fileTreeData}/>);
  const linkElement = getByText("editor");
  expect(linkElement).toBeInTheDocument();
});
