// Generated by Dagger (https://dagger.dev).
package com.ifinancas.services.impl;

import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;

@ScopeMetadata
@QualifierMetadata
@DaggerGenerated
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava"
})
public final class DateTimeServiceImpl_Factory implements Factory<DateTimeServiceImpl> {
  @Override
  public DateTimeServiceImpl get() {
    return newInstance();
  }

  public static DateTimeServiceImpl_Factory create() {
    return InstanceHolder.INSTANCE;
  }

  public static DateTimeServiceImpl newInstance() {
    return new DateTimeServiceImpl();
  }

  private static final class InstanceHolder {
    private static final DateTimeServiceImpl_Factory INSTANCE = new DateTimeServiceImpl_Factory();
  }
}