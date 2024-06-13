buildscript {
    dependencies {
        classpath(libs.gms.google.services)
        classpath ("com.google.dagger:hilt-android-gradle-plugin:2.38.1")
    }
}
// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.androidApplication) apply false
    alias(libs.plugins.jetbrainsKotlinAndroid) apply false


    id("com.google.dagger.hilt.android") version "2.50" apply false
}