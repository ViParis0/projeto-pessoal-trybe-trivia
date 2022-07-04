import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { tokenResponse } from '../../cypress/mocks/token';


const VALID_EMAIL = 'email@email.com';
const VALID_USER = 'test';
const INVALID_EMAIL = '123.com';
const INVALID_USER = '';

describe('Testes da página Login', () => {
  // beforeAll(()=>{
  //   global.fetch = jest.fn(async()=>({
  //     json: async () => tokenResponse
  //   }))
  // })
  it('Verifica se a página contém os inputs de email e nome', () => {
    renderWithRouterAndRedux(<App />);
    const inputNameEl = screen.getByRole('textbox', { name: /nome/i });
    const inputEmailEl = screen.getByRole('textbox', { name: /email/i });

    expect(inputNameEl).toBeInTheDocument();
    expect(inputEmailEl).toBeInTheDocument();
  });
  it('Verifica se o botão está desabilitado quando for digitado nome e email invalidos', () => {
    renderWithRouterAndRedux(<App />);
    const inputNameEl = screen.getByRole('textbox', { name: /nome/i });
    const inputEmailEl = screen.getByRole('textbox', { name: /email/i });
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputNameEl, INVALID_USER);
    userEvent.type(inputEmailEl, INVALID_EMAIL);

    expect(playBtn).toBeDisabled();
  });

  it('Verifica se o botão está habilitado quando for digitado nome e email válidos', () => {
    renderWithRouterAndRedux(<App />);
    const inputNameEl = screen.getByRole('textbox', { name: /nome/i });
    const inputEmailEl = screen.getByRole('textbox', { name: /email/i });
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputNameEl, VALID_USER);
    userEvent.type(inputEmailEl, VALID_EMAIL);

    expect(playBtn).toBeEnabled();
  });
  jest.setTimeout(10000);

  it('Verifica se o botão "config" aparece na tela e ao ser clicado, redireciona para a rota "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: /config/i });

    expect(configBtn).toBeInTheDocument();

    userEvent.click(configBtn);

    const url = history.location.pathname;

    expect(url).toBe('/settings');
  });

  it('Verifica se ao clicar no botão "Play", redireciona para a rota "/game" ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputNameEl = screen.getByRole('textbox', { name: /nome/i });
    const inputEmailEl = screen.getByRole('textbox', { name: /email/i });
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputNameEl, VALID_USER);
    userEvent.type(inputEmailEl, VALID_EMAIL);

    userEvent.click(playBtn);

    await waitFor(() => screen.getByRole('heading', {  name: /test/i}));

    const url = history.location.pathname

    expect(url).toBe('/game');
    // history.push('/game')
    expect(screen.getByRole('heading', {  name: /test/i})).toBeInTheDocument()
  });
});
