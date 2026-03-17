package com.demo.magic.game;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class GameDamageCardPack {
  private final List<GameDamageCard> damageCardList;
  private static final List<GameDamageCard> initial = List.of(
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

  public GameDamageCardPack() {
    damageCardList = new ArrayList<>();
    damageCardList.addAll(initial);
  }

  public List<GameDamageCard> getDamageCardList() {
    return Collections.unmodifiableList(damageCardList);
  }

  public void receives(List<GameDamageCard> damageCards) {
    damageCardList.addAll(damageCards);
  }

  public int numberOfDamageCards() {
    return damageCardList.size();
  }

  public void remove(GameDamageCard damageCard) {
    boolean remove = damageCardList.remove(damageCard);
    if (!remove) {
      throw new GameException("Damage card not found in the pack: " + damageCard);
    }
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GameDamageCardPack that = (GameDamageCardPack) o;
    return Objects.equals(damageCardList, that.damageCardList);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(damageCardList);
  }
}
