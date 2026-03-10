package com.demo.magic.game;

public class GameArea {
  private final GamePlayer firstPlayer;
  private final GamePlayer secondPlayer;

  public GameArea(GamePlayer firstPlayer, GamePlayer secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
  }

  public Game start() {
    return new Game(firstPlayer, secondPlayer);
  }
}
