import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }): JSX.Element => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: React.ReactElement, options?: any): any =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
