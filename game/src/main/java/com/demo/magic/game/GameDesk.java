package com.demo.magic.game;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GameDesk {
  public void giveDamageCardsToPlayer(GamePlayer player, int numberOfDamageCardToGive) {
    List<GameDamageCard> damageCards = new ArrayList<>();
    Random random = new Random();
    for (int i = 0; i < numberOfDamageCardToGive; i++) {
      int randomIndex = random.nextInt(0, 8);
      damageCards.add(new GameDamageCard(randomIndex));
    }
    player.receivesDamageCards(damageCards);
  }

  public void giveManaSlotToActivePlayer(GamePlayer player) {
    GameManaSlot currentManaSlot = player.manaSlot();
    if (currentManaSlot.value() == 0) {
      player.receivesManaSlot(new GameManaSlot(10));
    } else {
      player.receivesManaSlot(new GameManaSlot(1));
    }
  }
}
