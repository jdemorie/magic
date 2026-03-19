package com.demo.magic.game;

import java.util.Arrays;
import java.util.List;

public class ManaListToDamageCardProvider implements GameDamageCardProvider {
  private final int[] manaList;

  public ManaListToDamageCardProvider(int... manaList) {
    this.manaList = manaList;
  }

  @Override
  public List<GameDamageCard> get() {
    return Arrays.stream(manaList).mapToObj(GameDamageCard::new).toList();
  }
}
