package com.demo.magic.server;


import com.demo.magic.game.GameNotEnoughManaException;
import com.demo.magic.server.model.BadRequestBean;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;

@Singleton
@Requires(classes = {GameNotEnoughManaException.class})
public class MagicNotEnoughManaExceptionHandler implements ExceptionHandler<GameNotEnoughManaException, HttpResponse<BadRequestBean>> {
  @Override
  public HttpResponse<BadRequestBean> handle(HttpRequest request, GameNotEnoughManaException exception) {
    BadRequestBean badRequestBean = new BadRequestBean(exception.getMessage());
    return HttpResponse.badRequest(badRequestBean);
  }
}
