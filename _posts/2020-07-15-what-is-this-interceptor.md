---
layout: post
title: What is this Okhttp Interceptor?
title_tr: Bu Okhttp Interceptor Nedir?
lang: en
lang_tr: tr
content_tr: |
  ## Bu Okhttp Interceptor Nedir?

  Temel olarak, **Interceptor'lar** havaalanındaki güvenlik görevlileri gibidir. Geçişimizi karar verir ve durdurur.

  İki farklı görevi vardır. Bunlar;

  * **Interceptor** kullanarak bir ağ çağrısı için log kaydı yapmak için kullanılır.
  * Ağ çağrılarını önbelleğe almak için kullanılır.

  İki farklı interceptor vardır.

  * **Application Interceptor'lar** bu interceptor'lar Application kodu ve OkHttp Core Library arasına eklenir. `addInterceptor()` ile kullanırız.
  * **Network Interceptor**, bu interceptor'lar OkHttp Core Library ve Server arasına eklenir. Bunları OkHttpClient'a `addNetworkInterceptor()` kullanarak ekleyebiliriz.

  ## OkHttp'ta Interceptor Nasıl Eklenir?

  Bunlar OkHttp'ta Interceptor'a eklenir.

  ```kotlin
  fun myHttpClient(): OkHttpClient {
      val builder = OkHttpClient().newBuilder()
          .addInterceptor(/*bizim interceptor'ımız*/)
      return builder.build()
  }
  ```

  Kendi interceptor'ımızı oluşturursak, aşağıdaki kod gibi yapılır.

  ```kotlin
  class ErrorInterceptor : Interceptor {
      override fun intercept(chain: Interceptor.Chain): Response {

          val request: Request = chain.request()
          val response = chain.proceed(request)
          when (response.code()) {
              400 -> {
                  //Bad Request Hata Mesajını Göster
              }
              401 -> {
                  //Unauthorized Hata Mesajını Göster
              }

              403 -> {
                  //Forbidden Mesajını Göster
              }

              404 -> {
                  //NotFound Mesajını Göster
              }

              // ... ve böyle devam eder

          }
          return response
      }
  }
  ```

  Kodda anlaşıldığı gibi, dönen response'a göre gerekli log kaydını yaparız.

  Bu makale umarım size yardımcı olur. Sonraki makalelerde görüşürüz.
---

## What is this Okhttp Interceptor?

Basically, **Interceptors** are like security guards at the airport. They decide our passage and stop.

It has two different tasks. These;

* It's used to log for a network call using the **interceptor**.
* It's used to cache network calls.

There are two different interceptors.

* **Application Interceptors** are added between these interceptors Application code and OkHttp Core Library. We use it with `addInterceptor()`.
* **Network Interceptor**, these interceptors are added between OkHttp Core Library and Server. We can add them to OkHttpClient using `addNetworkInterceptor()`.


## How to add Interceptor in OkHttp?

These add to Interceptor in OkHttp.

```kotlin

    fun myHttpClient(): OkHttpClient {
        val builder = OkHttpClient().newBuilder()
            .addInterceptor(/*our interceptor*/)
        return builder.build()
    }

```

If we create to own interceptor, like code this bellow done.

```kotlin
class ErrorInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {

        val request: Request = chain.request()
        val response = chain.proceed(request)
        when (response.code()) {
            400 -> {
                //Show Bad Request Error Message
            }
            401 -> {
                //Show UnauthorizedError Message
            }

            403 -> {
                //Show Forbidden Message
            }

            404 -> {
                //Show NotFound Message
            }

            // ... and so on

        }
        return response
    }
}

```

As understood in the code, we make the necessary logging according to the returned response.

This article hopefully help to your. See you in the next articles.
