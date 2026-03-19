package com.demo.magic.game;

public class GameArea {
  private final GamePlayer firstPlayer;
  private final GamePlayer secondPlayer;
  private final GameDamageCardProvider cardProvider;

  public GameArea(GamePlayer firstPlayer, GamePlayer secondPlayer, GameDamageCardProvider cardProvider) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.cardProvider = cardProvider;
  }

  public Game start() {
    return new Game(firstPlayer, secondPlayer, cardProvider);
  }
}
