package com.demo.magic.game;

import java.util.Objects;

public final class GameHealth {
  private int value;

  public GameHealth(int value) {
    this.value = value;
  }

  public void decrement(int value) {
    if (this.value == 0) {
      return;
    }
    this.value = Math.max(0, this.value - value);
  }

  public int value() {
    return value;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    }
    if (obj == null || obj.getClass() != this.getClass()) {
      return false;
    }
    var that = (GameHealth) obj;
    return this.value == that.value;
  }

  @Override
  public int hashCode() {
    return Objects.hash(value);
  }

  @Override
  public String toString() {
    return "GameHealth[" +
           "value=" + value + ']';
  }

}
