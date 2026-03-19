package com.demo.magic.game;

import java.util.List;

public class EmptyDamageCardProvider implements GameDamageCardProvider {
  @Override
  public List<GameDamageCard> get() {
    return List.of();
  }
}
