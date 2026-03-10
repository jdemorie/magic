package com.demo.magic.game;

import java.util.List;
import java.util.Objects;

public final class GamePlayer {
  private final String name;
  private final GameHealth health;
  private final GameManaSlot manaSlot;
  private final GameDamageCardPack damageCardPack;
  private boolean active;

  public GamePlayer(String name) {
    this.name = name;
    this.health = new GameHealth(30);
    this.manaSlot = new GameManaSlot(0);
    this.damageCardPack = new GameDamageCardPack();
  }

  public String name() {
    return name;
  }

  public GameHealth health() {
    return health;
  }

  public GameManaSlot manaSlot() {
    return manaSlot;
  }

  public GameDamageCardPack damageCardPack() {
    return damageCardPack;
  }

  public boolean active() {
    return active;
  }

  public void receivesDamageCards(List<GameDamageCard> damageCards) {
    this.damageCardPack.receives(damageCards);
  }

  public void receivesManaSlot(GameManaSlot slot) {
    manaSlot.increment(slot.value());
  }

  public void active(boolean active) {
    this.active = active;
  }

  public void plays(GameDamageCard damageCard) {
    damageCardPack.remove(damageCard);
    manaSlot.decrement(damageCard.manaCost());
  }

  public void receivesDamage(GameDamageCard damageCard) {
    health.decrement(damageCard.manaCost());
    if (health.value() == 0) {
      throw new GameWinnerException("Player " + name + " is defeated.");
    }
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GamePlayer that = (GamePlayer) o;
    return Objects.equals(name, that.name);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(name);
  }

  @Override
  public String toString() {
    return "GamePlayer{" +
           "name='" + name + '\'' +
           ", health=" + health +
           ", manaSlot=" + manaSlot +
           ", damageCardPack=" + damageCardPack +
           ", active=" + active +
           '}';
  }
}
