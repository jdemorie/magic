package com.demo.magic.server;

import com.demo.magic.server.model.PlayerBean;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.client.HttpClient;
import io.micronaut.runtime.EmbeddedApplication;

import static org.junit.jupiter.api.Assertions.*;

public class MagicApplicationScenario {
  private final HttpClient client;
  private final EmbeddedApplication<?> application;
  private String response;

  public MagicApplicationScenario(HttpClient client, EmbeddedApplication<?> application) {
    this.client = client;
    this.application = application;
  }

  public MagicApplicationScenario givenAMagicServer() {
    assertTrue(application.isRunning());
    return this;
  }

  public MagicApplicationScenario whenIStartGame(String playerOne, String playerTwo) {
    HttpRequest<?> request = HttpRequest.POST("/server/start?playerOneName=" + playerOne + "&playerTwoName=" + playerTwo, "");
    response = client.toBlocking().retrieve(request, String.class);
    assertNotNull(response);
    return this;
  }

  public MagicApplicationScenario thenPlayerShouldHaveHealthAndMana(String player, int expectedHealth, int expectedMana) {
    HttpRequest<?> request = HttpRequest.GET("/server/game/player?playerName=" + player);
    PlayerBean response = client.toBlocking().retrieve(request, PlayerBean.class);
    assertNotNull(response);
    assertEquals(expectedHealth, response.getHealth());
    assertEquals(expectedMana, response.getManaSlots());
    return this;
  }
}
