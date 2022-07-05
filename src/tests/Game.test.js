import React from 'react';
import { getAllByTestId, getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { MD5 } from 'crypto-js';
import { questionsResponse } from '../../cypress/mocks/questions';

const VALID_EMAIL = 'email@email.com';
const VALID_USER = 'test';
const INVALID_EMAIL = '123.com';
const INVALID_USER = '';

const INITIAL_STATE = {
  user:{
    token: 'c554a5211ecaabeb9dd024534c42ff3d27c5c8652928366feac14113129bb466',
  },
 player: {  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],}
};

describe('Testes da página Game', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse)
    })
  })

  it('Verifica se o header é renderizado com as informações corretas: imagem do gravatar, nome do usuário e o placar zerado inicialmente', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const gravatarEl = screen.getByRole('img', {  name: /profile/i})
    const scoreEl = screen.getByTestId("header-score")   

    expect(gravatarEl).toBeInTheDocument();
    expect(gravatarEl).toHaveAttribute('src', `https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e`);
    expect(gravatarEl).toHaveAttribute('alt', 'profile');
    expect(scoreEl.innerHTML).toBe('0');    
    })

    it('Verifica se a pergunta é renderizadas na tela corretamente', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

      const categoryEl = screen.getByTestId('question-category');
      const questionEl = screen.getByTestId('question-text');

      const endPoint = 'https://opentdb.com/api.php?amount=5&token=c554a5211ecaabeb9dd024534c42ff3d27c5c8652928366feac14113129bb466'

      expect(fetch).toHaveBeenCalledWith(endPoint)

      await waitFor(() => {
        expect(categoryEl.innerHTML).toBe('Geography')
        expect(questionEl.innerHTML).toBe('The Republic of Malta is the smallest microstate worldwide.')
      });  
    })

    it('Verifica se os pontos são somados corretamente', async () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

      await waitFor(() => {
        screen.getByRole('img', {  name: /profile/i})
      });

      for(let index = 1; index <= 5; index += 1) {
        const correctBtn = screen.getByTestId('correct-answer');
        userEvent.click(correctBtn);
        const nextBtn = screen.getByRole('button', {  name: /next/i});
        userEvent.click(nextBtn)
      }

      const pointsEl = screen.getByTestId('feedback-total-score')
      expect(pointsEl.innerHTML).toBe('350')
    })

    it('Verifica se os pontos não são somados quando erra a resposta', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

      await waitFor(() => {
        screen.getByRole('img', {  name: /profile/i})
      });
      const incorrectBtn = screen.getByTestId('wrong-answer-0');
      userEvent.click(incorrectBtn)
      const scoreEl = screen.getByTestId('header-score')
      expect(scoreEl.innerHTML).toBe('0')
    })

    it('Verifica se é redirecionado para pág principal ao entrar com token inválido', async () => {
      const INITIAL_STATE_WITH_INVALID_TOKEN = {
        user:{
          token: 'INVALID_TOKEN',
        },
       player: {  name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
        questions: [],}
      };
      const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE_WITH_INVALID_TOKEN, '/game');
      const url = history.location.pathname
      expect(url).toBe('/')
    })

    it('Verifica se o timer é iniciado ao entrar na pág e para ao chegar em 0', async ()=> {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
      const timerEl = screen.getByTestId('countdown-timer');
      expect(timerEl.innerHTML).toBe('30');

      jest.setTimeout(32000);
      await new Promise((r) => setTimeout(r, 32000));

      const correcBtn = screen.getByTestId('correct-answer')

      expect(timerEl.innerHTML).toBe('0');
      expect(correcBtn).toBeDisabled()
    })

})