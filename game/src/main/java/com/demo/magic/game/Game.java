package com.demo.magic.game;

public final class Game {
  private final GamePlayer firstPlayer;
  private final GamePlayer secondPlayer;
  private final GameDesk desk;

  public Game(GamePlayer firstPlayer, GamePlayer secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.desk = new GameDesk();
  }

  public GameHealth getPlayerHealth(String name) {
    return getPlayer(name).health();
  }

  public GameManaSlot getPlayerManaSlot(String name) {
    return getPlayer(name).manaSlot();
  }

  public GameDamageCardPack getPlayerDamageCardPack(String player) {
    return getPlayer(player).damageCardPack();
  }

  public void activePlayer(String player) {
    if (getPlayer(player).active()) {
      return;
    }
    if (firstPlayer.name().equals(player)) {
      firstPlayer.active(true);
      desk.giveManaSlotToActivePlayer(firstPlayer);
      desk.giveDamageCardsToPlayer(firstPlayer, 1);
      secondPlayer.active(false);
    } else {
      secondPlayer.active(true);
      desk.giveManaSlotToActivePlayer(secondPlayer);
      desk.giveDamageCardsToPlayer(secondPlayer, 1);
      firstPlayer.active(false);
    }
  }

  public void activePlayerPlaysAManaCard(GameDamageCard damageCard) {
    if (firstPlayer.active()) {
      firstPlayer.plays(damageCard);
      secondPlayer.receivesDamage(damageCard);
    } else {
      secondPlayer.plays(damageCard);
      firstPlayer.receivesDamage(damageCard);
    }
  }

  public void activePlayerPassHisTurn(String player) {
    if (player.equals(firstPlayer.name())) {
      activePlayer(secondPlayer.name());
    } else {
      activePlayer(firstPlayer.name());
    }
  }

  public void giveDamageCardsToPlayer(String player, int numberOfDamageCardToGive) {
    GamePlayer gamePlayer = getPlayer(player);
    desk.giveDamageCardsToPlayer(gamePlayer, numberOfDamageCardToGive);
  }

  public GamePlayer getActivePlayer() {
    if (firstPlayer.active()) {
      return firstPlayer;
    }
    if (secondPlayer.active()) {
      return secondPlayer;
    }
    throw new GameException("No active player found");
  }

  private GamePlayer getPlayer(String name) {
    if (firstPlayer.name().equals(name)) {
      return firstPlayer;
    }
    return secondPlayer;
  }
}
