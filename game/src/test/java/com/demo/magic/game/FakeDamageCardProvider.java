package com.demo.magic.game;

import java.util.List;

public class FakeDamageCardProvider implements GameDamageCardProvider {
  @Override
  public List<GameDamageCard> get() {
    return List.of(
        new GameDamageCard(0),
        new GameDamageCard(0),
        new GameDamageCard(1),
        new GameDamageCard(1),
        new GameDamageCard(2),
        new GameDamageCard(2),
        new GameDamageCard(2),
        new GameDamageCard(3),
        new GameDamageCard(3),
        new GameDamageCard(3),
        new GameDamageCard(3),
        new GameDamageCard(4),
        new GameDamageCard(4),
        new GameDamageCard(4),
        new GameDamageCard(5),
        new GameDamageCard(5),
        new GameDamageCard(6),
        new GameDamageCard(6),
        new GameDamageCard(7),
        new GameDamageCard(8)
    );
  }
}
