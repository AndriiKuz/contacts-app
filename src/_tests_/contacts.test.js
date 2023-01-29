import React from 'react';
import { rest } from 'msw';
import { server } from './mocking';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contacts } from '../pages/Contacts';
// import { users } from '../_fixtures_/users';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Contacts get data success', () => {
  test('Loading', async () => {
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });

  test('Success', async () => {
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
  });

  test('Fail', async () => {
    server.use(
      rest.get('https://randomuser.me/api/?results=10', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: 'Internal server error',
          })
        );
      })
    );
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId('contacts-error')).toBeInTheDocument();
  });
});

describe('Contacts view mode', () => {
  test('Should equal table', async () => {
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-view-mode-table')).toHaveClass(
      'Mui-selected'
    );

    expect(
      screen.queryByTestId('contacts-grid-container')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('toggle-view-mode-grid')).not.toHaveClass(
      'Mui-selected'
    );
    expect(window.localStorage.getItem('viewMode')).toEqual('table');
  });

  test('Should equal grid', async () => {
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    const toggleGrid = screen.getByTestId('toggle-view-mode-grid');
    userEvent.click(toggleGrid);
    expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-view-mode-grid')).toHaveClass(
      'Mui-selected'
    );

    expect(
      screen.queryByTestId('contacts-table-container')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('toggle-view-mode-table')).not.toHaveClass(
      'Mui-selected'
    );
    expect(window.localStorage.getItem('viewMode')).toEqual('grid');
  });

  test('Should equal grid with reload page', async () => {
    window.localStorage.setItem('viewMode', 'grid');
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-view-mode-grid')).toHaveClass(
      'Mui-selected'
    );

    expect(
      screen.queryByTestId('contacts-table-container')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('toggle-view-mode-table')).not.toHaveClass(
      'Mui-selected'
    );

    window.localStorage.clear();
  });
});
