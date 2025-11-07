import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StudySync header', () => {
  render(<App />);
  const headerElement = screen.getByText(/StudySync/i);
  expect(headerElement).toBeInTheDocument();
});
