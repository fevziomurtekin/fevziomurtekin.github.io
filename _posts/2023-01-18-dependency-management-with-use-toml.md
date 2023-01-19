---
layout: post
title: Dependency management with the use of TOML
author: Fevzi Ömür Tekin
date: 2023-01-18 11:00 +0800
categories: [Android, Development, Gradle, TOML]
tags: [Android]
math: true
image: https://www.linkpicture.com/q/Twitter-post-1.png
---

![](https://www.linkpicture.com/q/Twitter-post-1.png)

Hello everyone, In my previous article, I said that *"I want to start new article series about Gradle"*. And this article will be the second article of that series. In this article, I'll try to explain the new feature a.k.a *version catalog* which is developed by Gradle and providing to declare a conventional file. 

Firstly, let's start with what is TOML?

## What is TOML?
![](https://raw.githubusercontent.com/toml-lang/toml/main/logos/toml-200.png)

According to its website, *TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.*
So thanks to its feature which is mapped to a hash table make it is easier to couple it with a Gradle script.

Also, you can see this [link](https://github.com/toml-lang/toml) for more detail.

So what should we know while developing with TOML?

## Things to should we know 
The TOML file consists of 4 major sections

- **version**, this section is used to declare versions that can be referenced by dependencies
- **libraries**, this section is used to declare the aliases to coordinates
- **bundles**, this section is used to declare dependency bundles
- **plugins**, this section is used to declare plugins

So, what to consider before implementing this feature? Let's see about it now.

## Things to consider
- Make sure your gradle version is at least `7.4.2`
- Make sure that adding `enableFeaturePreview("VERSION_CATALOGS")` in **settings.gradle**
- Create a `libs.versions.toml` file inside your **gradle** folder

If you have followed these points, we can move on to the step-by-step use of this feature.

## Usage

1) First, open the `libs.versions.toml` and then add the version of each library we would use.

```toml
[versions]
kotlin = "1.7.20"
mockito = "4.3.1"
gradlePlugins = "7.2.0" //We mentioned that it should be at least 7.2.0
```

2) Then, we can include these libraries which are declared version

```toml
[libraries]
kotlinBom = { module = "org.jetbrains.kotlin:kotlin-bom", version.ref = "kotlin" }
mockitoCore = { module = "org.mockito:mockito-core", version.ref = "mockito" }
mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockito" }
mockitoJupiter = { module = "org.mockito:mockito-junit-jupiter", version.ref = "mockito" }
```

3) Now as you can see examples above, We have three libraries that we can bundles.

```toml
[bundles]
mockito = ["mockitoCore", "mockitoInline", "mockitoJupiter"]
```

4) We can declare the plugins that we use, under to plugins sections.

```toml
[plugins]
android = { id = "com.android.application", version.ref = "gradlePlugins-agp" }
kotlinAndroid = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
```

Let's look at the final form of our `libs.versions.toml` file.

```toml
[versions]
kotlin = "1.7.20"
mockito = "4.3.1"
gradlePlugins = "7.2.0" //We mentioned that it should be at least 7.2.0

[libraries]
kotlinBom = { module = "org.jetbrains.kotlin:kotlin-bom", version.ref = "kotlin" }
mockitoCore = { module = "org.mockito:mockito-core", version.ref = "mockito" }
mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockito" }
mockitoJupiter = { module = "org.mockito:mockito-junit-jupiter", version.ref = "mockito" }

[bundles]
mockito = ["mockitoCore", "mockitoInline", "mockitoJupiter"]

[plugins]
android = { id = "com.android.application", version.ref = "gradlePlugins-agp" }
kotlinAndroid = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
```

6) As you can see, we have declared libraries that we'll use. So, let's see how we'll use them in Gradle files.

```kotlin
plugins {
    claspath(libs.plugins.android)
    claspath(libs.plugins.kotlinAndroid)
    claspath(libs.plugins.kapt)
}

...
implementation(libs.bundles.mockito)

```

## Conclusion
In conclusion, we've talked about TOML language, how we use TOML with Gradle and how to create and use `libs.versions.toml`.
I hope this blog post has been helpful to you. See you in the next posts.

![](https://media.giphy.com/media/10mzF0YmVmZNuw/giphy.gif)

