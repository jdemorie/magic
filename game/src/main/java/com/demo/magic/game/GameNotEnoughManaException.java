package com.demo.magic.game;

public class GameNotEnoughManaException extends RuntimeException {
  public GameNotEnoughManaException(String message) {
    super(message);
  }
}
