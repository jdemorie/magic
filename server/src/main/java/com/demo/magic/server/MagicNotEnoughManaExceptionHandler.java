package com.demo.magic.server;


import com.demo.magic.game.GameNotEnoughManaException;
import com.demo.magic.server.model.ErrorBean;
import com.demo.magic.server.model.ErrorBeanErrorCode;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;

@Singleton
@Requires(classes = {ErrorBean.class})
public class MagicNotEnoughManaExceptionHandler implements ExceptionHandler<GameNotEnoughManaException, HttpResponse<ErrorBean>> {
  @Override
  public HttpResponse<ErrorBean> handle(HttpRequest request, GameNotEnoughManaException exception) {
    ErrorBean badRequestBean = new ErrorBean(ErrorBeanErrorCode.BAD_PARAMETER, exception.getMessage());
    return HttpResponse.badRequest(badRequestBean);
  }
}
