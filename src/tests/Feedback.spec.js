import React from 'react'
import App from '../App'
import Feedback from '../pages/Feedback'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
};

describe('Testes da página de Feedback', () => {
  it('Verifica se as informações do jogador são renderizadas na tela de Feedback', () => {
    renderWithRouterAndRedux(<Feedback /> , {INITIAL_STATE});

    const player = screen.getByTestId('header-player-name')
    expect(player).toBeInTheDocument();

    const image = screen.getByTestId('header-profile-picture')
    expect(image).toBeInTheDocument();

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });

  it('Verifica se o score e os acertos são renderizados na tela de Feedback', () => {
    renderWithRouterAndRedux(<Feedback /> , {INITIAL_STATE});

    const totalScore = screen.getByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();

    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toBeInTheDocument();
  });

  it('Verifica se o botão Play Again redireciona para a tela de Login', () => {
    const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, "/feedback" );

    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(buttonPlayAgain);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se o botão de ranking redireciona para a tela de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, "/feedback" );

    const buttonRanking = screen.getByTestId('btn-ranking');
    userEvent.click(buttonRanking);
    expect(history.location.pathname).toBe('/Ranking');
  });
  
})