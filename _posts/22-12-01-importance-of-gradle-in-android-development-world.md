---
layout: post
title: Importance of Gradle in the Android development world
author: Fevzi Ömür Tekin
date: 2022-12-01 04:00 +0800
categories: [Android, Development, Gradle]
tags: [Android]
math: true
image: https://www.linkpicture.com/q/Screenshot-2022-12-01-at-15-44-15-Gradle-User-Manual.png
---
![](https://miro.medium.com/max/1400/1*7GuebgEyhK_MmeepdHVfVw.png)

Hi everyone, 

After a long time, I want to start new article series about Gradle. In this article series, I will try to talk about Gradle tips, new Gradle technologies and Gradle optimizations. Before talking about these, let's talk, about what is the matter of Gradle for the Android development world, how to use it, and why we need to use Gradle.

if you're ready, let's start!

## What is Gradle?

Gradle is an open-source build automation tool focused on flexibility and performance. To use the Gradle build script, we write **Groovy** or **Kotlin DSL**.

## Why we should use Gradle and What are the advantages?

To write a few reasons why we should use Gradle and a few advantages: 

- **High performance**, give high performance due to avoiding unnecessary work. Because only runs that what need to do work. And Gradle uses various caches to reuse outputs from previous builds. 

- **JVM foundation**, Gradle runs on the JVM. This is a bonus for users familiar with Java, since build logic can use the standard Java APIs.

- **Convention**

- **Extensibility**, most builds have special requirements that require custom build logic. For example, they add many new build concepts such as flavors and build types.

- **IDE support**, Gradle is supported by different IDE. Like Android Studio, IntelliJ IDEA, Eclipse, VSCode, and NetBean.

- **Insight**, with Build Scan, provides extensive information about a build that you can use to identify issues.

You can reach [this](https://gradle.org/features) if you want more details about Gradle.

So let's see the basic usage of Gradle both groovy and Kotlin DSL in Android.

## Basic Usage of Gradle on Android

![](https://media.giphy.com/media/llarwdtFqG63IlqUR1/giphy.gif)

> The Android build system compiles app resources and source code and packages them into APKs or Android App Bundles that you can test, deploy, sign, and distribute.

At that point, Android studio is based on Gradle and uses it. Gradle provides several features that are specific to building Android apps. 

As an advanced build toolkit, automate and manage the build process while letting you define flexible, custom build configurations. Each build configuration can define its own set of code and resources while reusing the parts common to all versions of your app. The Android Gradle plugin works with the build toolkit to provide processes and configurable settings that are specific to building and testing Android apps. 

With Gradle, you can use and manage to *build types*, *product flavors*, *build variants*, *manifest entries*, *add/remove dependencies*, *signing*, *code and resource shrinking* and *multiple APK support*.

We'll look at these regulations in more detail in the next articles. However, right now let's review mainly Gradle files. 

When an Android project is created once, this project there will be three different Gradle files and two different properties files. These Gradle files are *settings.gradle*, *build.gradle* (in the top-level), *build.gradle*, and these Gradle properties files are *gradle.properties* and *local.properties*

- **settings.gradle**, *(nit: settings.gradle for groovy/ settings.gradle.kts for kotlin script)* is located in the root project directory. With this settings file can define project-level repository settings and inform Gradle which should be included when building an app. Especially, this feature is important for multi-module applications.

Here let's see how to use it.


```kotlin
pluginManagement {

    /**
     * The pluginManagement {repositories {...}} block configures the
     * repositories Gradle uses to search or download the Gradle plugins and
     * their transitive dependencies. Gradle pre-configures support for remote
     * repositories such as JCenter, Maven Central, and Ivy. You can also use
     * local repositories or define your own remote repositories. The code below
     * defines the Gradle Plugin Portal, Google's Maven repository,
     * and the Maven Central Repository as the repositories Gradle should use to look for its
     * dependencies.
     */

    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}
dependencyResolutionManagement {

    /**
     * The dependencyResolutionManagement {repositories {...}}
     * block is where you configure the repositories and dependencies used by
     * all modules in your project, such as libraries that you are using to
     * create your application. However, you should configure module-specific
     * dependencies in each module-level build.gradle file. For new projects,
     * Android Studio includes Google's Maven repository and the Maven Central
     * Repository by default, but it does not configure any dependencies (unless
     * you select a template that requires some).
     */

    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "My application"
include(":app")
```

- **build.gradle**, *(nit: build.gradle for groovy/ build.gradle.kts for kotlin script)* is located in the root project directory. With this file, can define dependencies that apply to all modules of our project. Thus, this file is common for all modules. 

Here let's see how to use it. 

```kotlin

plugins {

    /**
     * Use `apply false` in the top-level build.gradle file to add a Gradle
     * plugin as a build dependency but not apply it to the current (root)
     * project. Don't use `apply false` in sub-projects. For more information,
     * see Applying external plugins with same version to subprojects.
     */

    id("com.android.application") version "7.3.1" apply false
    id("com.android.library") version "7.3.1" apply false
    id("org.jetbrains.kotlin.android") version "1.7.20" apply false
}

```

- **build.gradle**, *(nit: build.gradle for groovy/ build.gradle.kts for kotlin script)* is located in application modules. 

In this file, we can define the application id, compile SDK, default configs, build types, and dependencies for each module. 

```kotlin

/**
 * The first section in the build configuration applies the Android Gradle plugin
 * to this build and makes the android block available to specify
 * Android-specific build options.
 */

plugins {
    id("com.android.application")
}

/**
 * The android block is where you configure all your Android-specific
 * build options.
 */

android {

    /**
     * The app's namespace. Used primarily to access app resources.
     */

    namespace = "com.example.myapp"

    /**
     * compileSdk specifies the Android API level Gradle should use to
     * compile your app. This means your app can use the API features included in
     * this API level and lower.
     */

    compileSdk = 33

    /**
     * The defaultConfig block encapsulates default settings and entries for all
     * build variants and can override some attributes in main/AndroidManifest.xml
     * dynamically from the build system. You can configure product flavors to override
     * these values for different versions of your app.
     */

    defaultConfig {

        // Uniquely identifies the package for publishing.
        applicationId = "com.example.myapp"

        // Defines the minimum API level required to run the app.
        minSdk = 21

        // Specifies the API level used to test the app.
        targetSdk = 33

        // Defines the version number of your app.
        versionCode = 1

        // Defines a user-friendly version name for your app.
        versionName = "1.0"
    }

    /**
     * The buildTypes block is where you can configure multiple build types.
     * By default, the build system defines two build types: debug and release. The
     * debug build type is not explicitly shown in the default build configuration,
     * but it includes debugging tools and is signed with the debug key. The release
     * build type applies ProGuard settings and is not signed by default.
     */

    buildTypes {

        /**
         * By default, Android Studio configures the release build type to enable code
         * shrinking, using minifyEnabled, and specifies the default ProGuard rules file.
         */

        getByName("release") {
            isMinifyEnabled = true // Enables code shrinking for the release build type.
            proguardFiles(
                getDefaultProguardFile("proguard-android.txt"),
                "proguard-rules.pro"
            )
        }
    }

    /**
     * The productFlavors block is where you can configure multiple product flavors.
     * This lets you create different versions of your app that can
     * override the defaultConfig block with their own settings. Product flavors
     * are optional, and the build system does not create them by default.
     *
     * This example creates a free and paid product flavor. Each product flavor
     * then specifies its own application ID, so that they can exist on the Google
     * Play Store, or an Android device, simultaneously.
     *
     * If you declare product flavors, you must also declare flavor dimensions
     * and assign each flavor to a flavor dimension.
     */

    flavorDimensions += "tier"
    productFlavors {
        create("free") {
            dimension = "tier"
            applicationId = "com.example.myapp.free"
        }

        create("paid") {
            dimension = "tier"
            applicationId = "com.example.myapp.paid"
        }
    }
}

/**
 * The dependencies block in the module-level build configuration file
 * specifies dependencies required to build only the module itself.
 * To learn more, go to Add build dependencies.
 */

dependencies {
    implementation(project(":lib"))
    implementation("androidx.appcompat:appcompat:1.5.1")
    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
}

```

So and now let's look at Gradle properties files. First of all, Gradle properties, located in your root project directory, that you can use to specify settings for the Gradle build toolkit itself.

- **gradle.properties**, This is where you can configure project-wide Gradle settings, such as the Gradle daemon's maximum heap size. Also, you can include these features, _command-line flags_ (such as __--build-cache__. These have precedence over properties and environment variables), _system properties_ (such as **systemProp.http.proxyHost=somehost.org**.), _gradle properties_ (such as **org.gradle.caching=true**) and _environment variables_(such as **GRADLE_OPTS** sourced by the environment that executes Gradle). To reach more information that, can see this [link](https://docs.gradle.org/current/userguide/build_environment.html).
- **local.properties** configures local environment properties for build system, including the following: _ndk.dir_ (Path to the NDK. This property has been deprecated. Any downloaded versions of the NDK are installed in the ndk directory within the Android SDK directory.), _sdk.dir_(Path to the SDK), _cmake.dir_ (Path to CMAKE), _ndk.symlinkdir_ (In Android Studio 3.5 and higher, creates a symlink to the NDK that can be shorter than the installed NDK path.)

## Conclusion

For this articles, I tried to answer the questions, what is Gradle?, what are the advantages of Gradle? and how to use it in Android? So we'll look at Gradle in more detail in the next posts. See you!





