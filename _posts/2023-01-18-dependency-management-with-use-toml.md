---
layout: post
title: Dependency Management with use.toml
title_tr: use.toml ile Bağımlılık Yönetimi
lang: en
lang_tr: tr
content_tr: |
  ![](https://www.linkpicture.com/q/Twitter-post-1.png)

  Merhaba herkese, Önceki yazımda *"Gradle hakkında yeni makale serisi başlatmak istiyorum"* demiştim. Ve bu makale o serinin ikinci makalesi olacak. Bu makalede, Gradle tarafından geliştirilen ve geleneksel bir dosya tanımlamaya olanak sağlayan yeni özellik olan *version catalog*'u açıklayacağım.

  Öncelikle, TOML nedir ile başlayalım?

  ## TOML Nedir?
  ![](https://raw.githubusercontent.com/toml-lang/toml/main/logos/toml-200.png)

  Web sitesine göre, *TOML, açık semantik nedeniyle okunması kolay olan minimal bir yapılandırma dosyası formatı olmayı hedefler. TOML, belirsiz olmayan bir şekilde bir hash tablosuna eşlenmek üzere tasarlanmıştır. TOML, çeşitli dillerde veri yapılarına ayrıştırılması kolay olmalıdır.*
  Bu nedenle, hash tablosuna eşlenen özelliği sayesinde Gradle scripti ile eşleştirmek daha kolaydır.

  Daha fazla detay için [bu linki](https://github.com/toml-lang/toml) görebilirsiniz.

  Peki TOML ile geliştirme yaparken ne bilmemiz gerekiyor?

  ## Bilmemiz Gerekenler
  TOML dosyası 4 ana bölümden oluşur

  - **version**, bu bölüm bağımlılıklar tarafından referans alınabilen versiyonları tanımlamak için kullanılır
  - **libraries**, bu bölüm koordinatlara takma ad tanımlamak için kullanılır
  - **bundles**, bu bölüm bağımlılık paketlerini tanımlamak için kullanılır
  - **plugins**, bu bölüm eklentileri tanımlamak için kullanılır

  Peki, bu özelliği uygulamadan önce ne düşünmeliyiz? Şimdi bunu görelim.

  ## Düşünülmesi Gerekenler
  - Gradle versiyonunuzun en az `7.4.2` olduğundan emin olun
  - **settings.gradle** dosyasına `enableFeaturePreview("VERSION_CATALOGS")` eklediğinizden emin olun
  - **gradle** klasörünüzün içinde `libs.versions.toml` dosyası oluşturun

  Bu noktaları takip ettiyseniz, bu özelliğin adım adım kullanımına geçebiliriz.

  ## Kullanım

  1) İlk olarak, `libs.versions.toml` dosyasını açın ve sonra kullandığımız her kütüphanenin versiyonunu ekleyin.

  ```toml
  [versions]
  kotlin = "1.7.20"
  mockito = "4.3.1"
  gradlePlugins = "7.2.0" # en az 7.2.0 olması gerektiği belirtiliyor
  ```

  2) Sonra, versiyonu tanımlanan bu kütüphaneler dahil edildi

  ```toml
  [libraries]
  kotlinBom = { module = "org.jetbrains.kotlin:kotlin-bom", version.ref = "kotlin" }
  mockitoCore = { module = "org.mockito:mockito-core", version.ref = "mockito" }
  mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockito" }
  mockitoJupiter = { module = "org.mockito:mockito-junit-jupiter", version.ref = "mockito" }
  ```

  3) Şimdi yukarıdaki örneklerden görebileceğiniz gibi, paketleyebileceğimiz üç kütüphanemiz var.

  ```toml
  [bundles]
  mockito = ["mockitoCore", "mockitoInline", "mockitoJupiter"]
  ```

  4) Kullandığımız eklentiler, eklentiler bölümü altında tanımlandı.

  ```toml
  [plugins]
  android = { id = "com.android.application", version.ref = "gradlePlugins-agp" }
  kotlinAndroid = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
  kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
  ```

  `libs.versions.toml` dosyamızın son haline bakalım.

  ```toml
  [versions]
  kotlin = "1.7.20"
  mockito = "4.3.1"
  gradlePlugins = "7.2.0" # en az 7.2.0 olması gerektiği belirtiliyor

  [libraries]
  kotlinBom = { module = "org.jetbrains.kotlin:kotlin-bom", version.ref = "kotlin" }
  mockitoCore = { module = "org.mockito:mockito-core", version.ref = "mockito" }
  mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockito" }
  mockitoJupiter = { module = "org.mockito:mockito-junit-jupiter", version.ref = "mockito" }

  [bundles]
  mockito = ["mockitoCore", "mockitoInline", "mockitoJupiter"]

  [plugins]
  android = { id = "com.android.application", version.ref = "gradlePlugins" }
  kotlinAndroid = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
  kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
  ```

  6) Gördüğünüz gibi, kullanacağımız kütüphaneleri tanımladık. Şimdi Gradle dosyalarında nasıl kullanacağımızı görelim.

  ```kotlin
  plugins {
      claspath(libs.plugins.android)
      claspath(libs.plugins.kotlinAndroid)
      claspath(libs.plugins.kapt)
  }
  ```

  ```kotlin
  implementation(libs.bundles.mockito)
  ```

  ## Sonuç
  Sonuç olarak, TOML dilini, TOML'yi Gradle ile nasıl kullanacağımızı ve `libs.versions.toml` dosyasını nasıl oluşturacağımızı ve kullanacağımızı konuştuk.
  Umarım bu blog yazısı size yardımcı olmuştur. Sonraki yazılarda görüşürüz.

  ![](https://media.giphy.com/media/10mzF0YmVmZNuw/giphy.gif)
---

![](https://www.linkpicture.com/q/Twitter-post-1.png)

Hello everyone, In my previous article, I said that *"I want to start new article series about Gradle"*. And this article will be the second article of that series. In this article, I'll explain the new feature a.k.a *version catalog* which is developed by Gradle and providing to declare a conventional file. 

Firstly, let's start with what is TOML?

## What is TOML?
![](https://raw.githubusercontent.com/toml-lang/toml/main/logos/toml-200.png)

According to its website, *TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.*
So thanks to its feature which is mapped to a hash table make it is easier to match it with a Gradle script.

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

1) First, open the `libs.versions.toml` and then add the version of each library we use.

```toml
[versions]
kotlin = "1.7.20"
mockito = "4.3.1"
gradlePlugins = "7.2.0" # it is mentioned that it should be at least 7.2.0
```

2) Then, it included these libraries which are declared version

```toml
[libraries]
kotlinBom = { module = "org.jetbrains.kotlin:kotlin-bom", version.ref = "kotlin" }
mockitoCore = { module = "org.mockito:mockito-core", version.ref = "mockito" }
mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockito" }
mockitoJupiter = { module = "org.mockito:mockito-junit-jupiter", version.ref = "mockito" }
```

3) Now as you can see from the examples above, We have three libraries that we can bundle.

```toml
[bundles]
mockito = ["mockitoCore", "mockitoInline", "mockitoJupiter"]
```

4) It is declared the plugins that we use, under to plugins sections.

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
gradlePlugins = "7.2.0" # it is mentioned that it should be at least 7.2.0

[libraries]
kotlinBom = { module = "org.jetbrains.kotlin:kotlin-bom", version.ref = "kotlin" }
mockitoCore = { module = "org.mockito:mockito-core", version.ref = "mockito" }
mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockito" }
kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
```

6) As you can see, we have declared libraries that we'll use. So, let's see how we'll use them in Gradle files.

```kotlin
plugins {
    claspath(libs.plugins.android)
    claspath(libs.plugins.kotlinAndroid)
    claspath(libs.plugins.kapt)
}
```

```kotlin
implementation(libs.bundles.mockito)
```

## Conclusion
In conclusion, we've talked about TOML language, how to use TOML with Gradle and how to create and use `libs.versions.toml`.
I hope this blog post has been helpful to you. See you in the next posts.

![](https://media.giphy.com/media/10mzF0YmVmZNuw/giphy.gif)

