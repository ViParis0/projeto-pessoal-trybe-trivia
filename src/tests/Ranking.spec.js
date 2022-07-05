import React from 'react'
import App from '../App'
import Ranking from '../pages/Ranking'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

const INITIAL_STATE = {
  player: {
      name: 'Player',
      score: 0,
      assertions: 0,
  }
}

describe('Testes da página de Ranking', () => {
  it('Verifica se a tela possui um header', () => {
    renderWithRouterAndRedux(<Ranking /> , {INITIAL_STATE});

    const headingRanking = screen.getByTestId('ranking-title')
    expect(headingRanking).toBeInTheDocument();
  });

  it('Verifica se a tela possui um heading com nome do player', () => {
    renderWithRouterAndRedux(<Ranking /> , {INITIAL_STATE});

    const headingPlayer = screen.getByTestId('player-name-0');
    expect(headingPlayer).toBeInTheDocument();
  });

  it('Verifica se a tela possui o score do player', () => {
    renderWithRouterAndRedux(<Ranking /> , {INITIAL_STATE});

    const playerScore = screen.getByTestId('player-score-0');
    expect(playerScore).toBeInTheDocument();
  });

  it('Verifica se o botão play again redireciona para a tela de Login', () => {
  const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, '/Ranking')

  const loginButton = screen.getByTestId('btn-go-home')
  userEvent.click(loginButton);
  expect(history.location.pathname).toBe('/')
  })

})