package com.demo.magic.server;


import com.demo.magic.game.GameWinnerException;
import com.demo.magic.server.model.ErrorBean;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;

@Singleton
@Requires(classes = {GameWinnerException.class})
public class MagicWinnerExceptionHandler implements ExceptionHandler<GameWinnerException, HttpResponse<ErrorBean>> {
  @Override
  public HttpResponse<ErrorBean> handle(HttpRequest request, GameWinnerException exception) {
    ErrorBean errorBean = new ErrorBean(exception.getMessage());
    return HttpResponse.serverError(errorBean);
  }
}
