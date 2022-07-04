import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { MD5 } from 'crypto-js';

const VALID_EMAIL = 'email@email.com';
const VALID_USER = 'test';
const INVALID_EMAIL = '123.com';
const INVALID_USER = '';
describe('Testes da página Game', () => {
  it('Verifica se o header é renderizado com as informações corretas: imagem do gravatar e nome do usuário', async () => {
    renderWithRouterAndRedux(<App />);
    const inputNameEl = screen.getByRole('textbox', { name: /nome/i });      
    const inputEmailEl = screen.getByRole('textbox', { name: /email/i });
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputNameEl, VALID_USER);
    userEvent.type(inputEmailEl, VALID_EMAIL);

    userEvent.click(playBtn);

    await waitFor(() => screen.getByRole('heading', {  name: /test/i}));

    const gravatarEl = screen.getByRole('img', {  name: /profile/i})

    expect(gravatarEl).toBeInTheDocument()
    expect(gravatarEl).toHaveAttribute('src', `https://www.gravatar.com/avatar/${MD5(VALID_EMAIL)}`)
    expect(gravatarEl).toHaveAttribute('alt', 'profile')
    })
})