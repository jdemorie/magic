package com.demo.magic.server;

import com.demo.magic.game.*;
import com.demo.magic.server.api.DefaultApi;
import com.demo.magic.server.model.DamageCardBean;
import com.demo.magic.server.model.PlayerActiveBean;
import com.demo.magic.server.model.PlayerBean;
import com.demo.magic.server.model.ResponseBean;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Controller("/server")
public class MagicApplicationController implements DefaultApi {
  private Game game;

  @Get("/game/player/active")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  @Override
  public Mono<@Valid PlayerActiveBean> getActivePlayer() {
    GamePlayer activePlayer = game.getActivePlayer();
    return Mono.just(new PlayerActiveBean(activePlayer.name()));
  }

  @Get("/game/player/card")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  @Override
  public Mono<@NotNull List<@Valid DamageCardBean>> getPlayerCards(@QueryValue("playerName") @NotNull String playerName) {
    GameDamageCardPack cardPack = game.getPlayerDamageCardPack(playerName);
    List<GameDamageCard> damageCardList = cardPack.getDamageCardList();
    List<DamageCardBean> damageCardBeanList = new ArrayList<>();
    for (GameDamageCard damageCard : damageCardList) {
      damageCardBeanList.add(new DamageCardBean(String.valueOf(damageCard.manaCost())));
    }
    return Mono.just(damageCardBeanList);
  }

  @Get("/game/player")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  @Override
  public Mono<@Valid PlayerBean> getPlayerHealthAndMana(@QueryValue("playerName") @NotNull String playerName) {
    GameHealth playerHealth = game.getPlayerHealth(playerName);
    GameManaSlot playerManaSlot = game.getPlayerManaSlot(playerName);
    @Valid PlayerBean playerBean = new PlayerBean(playerName);
    playerBean.health(playerHealth.value()).manaSlots(playerManaSlot.value());
    return Mono.just(playerBean);
  }

  @Put("/game/player/card")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  @Override
  public Mono<@Valid ResponseBean> playCard(@QueryValue("playerName") @NotNull String playerName,
                                            @QueryValue("cardIndex") @NotNull BigDecimal cardIndex) {
    GameDamageCardPack damageCardPack = game.getPlayerDamageCardPack(playerName);
    List<GameDamageCard> damageCardList = damageCardPack.getDamageCardList();
    game.activePlayerPlaysAManaCard(damageCardList.get(cardIndex.intValue()));
    @Valid ResponseBean responseBean = new ResponseBean("Player " + playerName + " played card at index " + cardIndex);
    return Mono.just(responseBean);
  }

  @Put("/game/player/active")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  @Override
  public Mono<@Valid ResponseBean> setActivePlayer(@Body @NotNull @Valid PlayerActiveBean playerActiveBean) {
    game.activePlayer(playerActiveBean.getName());
    @Valid ResponseBean responseBean = new ResponseBean("Active player set to: " + playerActiveBean.getName());
    return Mono.just(responseBean);
  }

  @Post("/start")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  @Override
  public Mono<@Valid ResponseBean> startGame(@QueryValue("playerOneName") @NotNull String playerOneName,
                                             @QueryValue("playerOneName") @NotNull String playerTwoName) {
    GameArea gameArea = new GameArea(new GamePlayer(playerOneName), new GamePlayer(playerTwoName));
    game = gameArea.start();
    @Valid ResponseBean responseBean = new ResponseBean("Game started with players: " + playerOneName + " and " + playerTwoName);
    return Mono.just(responseBean);
  }
}
