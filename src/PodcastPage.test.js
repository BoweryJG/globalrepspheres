import { render, screen } from '@testing-library/react';
import PodcastPage from './PodcastPage';

test('renders podcast title', () => {
  render(<PodcastPage />);
  const titleElement = screen.getByText(/RepSpheres Podcast/i);
  expect(titleElement).toBeInTheDocument();
});
