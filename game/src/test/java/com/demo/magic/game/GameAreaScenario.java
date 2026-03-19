package com.demo.magic.game;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GameAreaScenario {
  private GameArea gameArea;
  private Game game;

  public GameAreaScenario givenAGameWithPlayers(String firstPlayer, String secondPlayer, GameDamageCardProvider cardProvider) {
    gameArea = new GameArea(new GamePlayer(firstPlayer), new GamePlayer(secondPlayer), cardProvider);
    return this;
  }

  public GameAreaScenario whenGameStarts() {
    game = gameArea.start();
    return this;
  }

  public GameAreaScenario whenDeskGivesDamageCardsToPlayer(String player, int numberOfDamageCardToGive) {
    game.giveDamageCardsToPlayer(player, numberOfDamageCardToGive);
    return this;
  }

  public GameAreaScenario whenPlayerBecomeActive(String player) {
    game.activePlayer(player);
    return this;
  }

  public GameAreaScenario whenPlayerPassHisTurn(String player) {
    game.activePlayerPassHisTurn(player);
    return this;
  }

  public GameAreaScenario whenActivePlayerPlaysAManaCard(GameDamageCard damageCard) {
    game.activePlayerPlaysAManaCard(damageCard);
    return this;
  }

  public GameAreaScenario whenActivePlayerPlaysAManaCardAndWinTheGame(GameDamageCard damageCard) {
    assertThrows(GameWinnerException.class, () -> game.activePlayerPlaysAManaCard(damageCard));
    return this;
  }

  public GameAreaScenario thenPlayerShouldHaveHealth(String player, GameHealth expectedHealth) {
    assertEquals(expectedHealth, game.getPlayerHealth(player));
    return this;
  }

  public GameAreaScenario thenPlayerShouldHaveManaSlot(String player, GameManaSlot expectedManaSlots) {
    assertEquals(expectedManaSlots, game.getPlayerManaSlot(player));
    return this;
  }

  public GameAreaScenario thenPlayerShouldHaveDamageCards(String player, List<GameDamageCard> expectedDamageCards) {
    assertArrayEquals(expectedDamageCards.toArray(), game.getPlayerDamageCardPack(player).getDamageCardList().toArray());
    return this;
  }

  public GameAreaScenario thenPlayerShouldHaveNumberOfDamageCards(String player, int expectedNumberOfManaCards) {
    assertEquals(expectedNumberOfManaCards, game.getPlayerDamageCardPack(player).numberOfDamageCards());
    return this;
  }

  public GameAreaScenario thenPlayerShouldBeActive(String player) {
    assertEquals(player, game.getActivePlayer().name());
    return this;
  }

  public GameAreaScenario thenErrorShouldBeThrownIfActivePlayerPlaysAManaCard(GameDamageCard damageCard, String expectedMessage) {
    GameNotEnoughManaException exception = assertThrows(GameNotEnoughManaException.class, () -> game.activePlayerPlaysAManaCard(damageCard));
    assertEquals(expectedMessage, exception.getMessage());
    return this;
  }

  public GameAreaScenario thenErrorShouldBeThrownIfPlayerBecomesActive(String player, String expectedMessage) {
    GameWinnerException exception = assertThrows(GameWinnerException.class, () -> game.activePlayer(player));
    assertEquals(expectedMessage, exception.getMessage());
    return this;
  }
}
