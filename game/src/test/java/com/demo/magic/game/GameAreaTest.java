package com.demo.magic.game;

import org.junit.jupiter.api.Test;

public class GameAreaTest {
  @Test
  void givenAGameWith2PlayersWhenItStartsThenEachPlayersShouldHave30Health0ManaSlotAnd20DamageCards() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .thenPlayerShouldHaveHealth("Alice", new GameHealth(30))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(0))
        .thenPlayerShouldHaveDamageCards("Alice", new GameDamageCardPack())
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(30))
        .thenPlayerShouldHaveManaSlot("Bob", new GameManaSlot(0))
        .thenPlayerShouldHaveDamageCards("Bob", new GameDamageCardPack());
  }

  @Test
  void givenAGameWhenItStartsAndDeskGivesRandomDamageCardsToAPlayerThenPlayerShouldHave23DamageCards() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenDeskGivesDamageCardsToPlayer("Alice", 3)
        .thenPlayerShouldHaveHealth("Alice", new GameHealth(30))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(0))
        .thenPlayerShouldHaveNumberOfDamageCards("Alice", 23);
  }

  @Test
  void givenAGameWithPlayer1WithZeroManaSlotWhenPlayer1BecomesActiveThenPlayerShouldRefillTo10ManaSlots() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .thenPlayerShouldHaveHealth("Alice", new GameHealth(30))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(0))
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(10));
  }

  @Test
  void givenAGameWithPlayer1ActiveWhenPlayer1BecomesActiveAgainThenPlayerShouldNotReceiveAdditionalMana() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(10))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(1))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(9))
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(9));
  }

  @Test
  void givenAGameWithPlayer1ActiveWhenPlayer1PlaysManaCardThenPlayer2ShouldHave29Health() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(30))
        .whenPlayerBecomeActive("Alice")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(1))
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(29));
  }

  @Test
  void givenAGameWithPlayer1ActiveWhenPlayer1BecomesActiveTenTimesThenPlayerShouldNotReceiveMoreThan10ManaSlots() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(10))
        .whenPlayerBecomeActive("Bob")
        .thenPlayerShouldHaveManaSlot("Bob", new GameManaSlot(10))
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(10));
  }

  @Test
  void givenAGameWhenPlayer1BecomesActiveThenPlayerShouldHaveOneMoreDamageCard() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .thenPlayerShouldHaveNumberOfDamageCards("Alice", 20)
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveNumberOfDamageCards("Alice", 21);
  }

  @Test
  void givenAGameWhenPlayerHasNoHealthThenHeLoseTheGame() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Alice")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(8))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(2))
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(22))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(2))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(0))
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(20))
        .whenPlayerBecomeActive("Bob")
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(10))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(7))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(3))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(0))
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(10))
        .whenPlayerBecomeActive("Bob")
        .whenPlayerBecomeActive("Alice")
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(10))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(6))
        .whenActivePlayerPlaysAManaCardAndWinTheGame(new GameDamageCard(4))
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(0));
  }

  @Test
  void givenAGameWhenActivePlayerPassesHisTurnThenNextPlayerShouldBecomeActive() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Alice")
        .whenPlayerPassHisTurn("Alice")
        .thenPlayerShouldBeActive("Bob");
  }

  @Test
  void givenAGameWhenActivePlayerPlaysCardWithManaCostHigherThanHisManaSlotThenPlayerShouldNotPlayTheCard() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Alice")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(8))
        .thenPlayerShouldHaveManaSlot("Alice", new GameManaSlot(2))
        .thenErrorShouldBeThrownIfActivePlayerPlaysAManaCard(new GameDamageCard(3), "Player Alice does not have enough mana slot to play the card.");
  }

  @Test
  void givenAGameWhenPlayerTwoHasNoHealthThenHeCannotBeActiveAnyMore() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Alice")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(8))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(2))
        .whenPlayerBecomeActive("Bob")
        .whenPlayerBecomeActive("Alice")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(7))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(3))
        .whenPlayerBecomeActive("Bob")
        .whenPlayerBecomeActive("Alice")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(6))
        .whenActivePlayerPlaysAManaCardAndWinTheGame(new GameDamageCard(4))
        .thenPlayerShouldHaveHealth("Bob", new GameHealth(0))
        .thenErrorShouldBeThrownIfPlayerBecomesActive("Bob", "Player Bob has no health left, cannot be active.");
  }

  @Test
  void givenAGameWhenPlayerOneHasNoHealthThenHeCannotBeActiveAnyMore() {
    GameAreaScenario scenario = new GameAreaScenario();
    scenario.givenAGameWithPlayers("Alice", "Bob")
        .whenGameStarts()
        .whenPlayerBecomeActive("Bob")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(8))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(2))
        .whenPlayerBecomeActive("Alice")
        .whenPlayerBecomeActive("Bob")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(7))
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(3))
        .whenPlayerBecomeActive("Alice")
        .whenPlayerBecomeActive("Bob")
        .whenActivePlayerPlaysAManaCard(new GameDamageCard(6))
        .whenActivePlayerPlaysAManaCardAndWinTheGame(new GameDamageCard(4))
        .thenPlayerShouldHaveHealth("Alice", new GameHealth(0))
        .thenErrorShouldBeThrownIfPlayerBecomesActive("Alice", "Player Alice has no health left, cannot be active.");
  }
}
