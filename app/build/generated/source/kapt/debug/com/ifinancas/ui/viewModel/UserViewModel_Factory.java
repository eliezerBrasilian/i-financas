// Generated by Dagger (https://dagger.dev).
package com.ifinancas.ui.viewModel;

import com.ifinancas.services.UserService;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.inject.Provider;

@ScopeMetadata
@QualifierMetadata
@DaggerGenerated
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava"
})
public final class UserViewModel_Factory implements Factory<UserViewModel> {
  private final Provider<UserService> userServiceProvider;

  public UserViewModel_Factory(Provider<UserService> userServiceProvider) {
    this.userServiceProvider = userServiceProvider;
  }

  @Override
  public UserViewModel get() {
    return newInstance(userServiceProvider.get());
  }

  public static UserViewModel_Factory create(Provider<UserService> userServiceProvider) {
    return new UserViewModel_Factory(userServiceProvider);
  }

  public static UserViewModel newInstance(UserService userService) {
    return new UserViewModel(userService);
  }
}