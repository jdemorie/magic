package com.demo.magic.server;

import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.runtime.EmbeddedApplication;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@MicronautTest
public class MagicApplicationControllerTest {
  @Inject
  EmbeddedApplication<?> application;
  @Inject
  @Client("/")
  HttpClient client;

  @Test
  void givenAMagicAreaWhenIStartGameThenTheScoreShouldBe() {
    MagicApplicationScenario scenario = new MagicApplicationScenario(client, application);
    scenario.givenAMagicServer()
        .whenIStartGame("Bob", "Alice")
        .thenPlayerShouldHaveHealthAndMana("Alice", 30, 0)
        .thenPlayerShouldHaveHealthAndMana("Bob", 30, 10)
        .thenPlayerShouldHaveDamageCards("Alice", 23)
        .thenPlayerShouldHaveDamageCards("Bob", 24);
  }
}
