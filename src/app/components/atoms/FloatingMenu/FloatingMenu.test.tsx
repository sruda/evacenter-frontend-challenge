import { render } from '@testing-library/react';
import FloatingMenu from './FloatingMenu';

describe('<FloatingMenu/>', () => {
  test('renders FloatingMenu component', () => {
    const { getByTestId } = render(<FloatingMenu />);
    expect(getByTestId('FloatingMenu')).toBeInTheDocument();
  });
});
