---
title: What is this Okhttp Interceptor?
author: Fevzi Ömür Tekin
date: 2020-07-15 14:00 +0800
categories: [Android, Development, Okhttp, Interceptor]
tags: [Android]
math: true
image: https://square.github.io/okhttp/images/interceptors%402x.png
---

## What is this Okhttp Interceptor?

Basically, **Interceptors** are like security guards at the airport. They decide our passage and stop. 

It has two different tasks. These;

* It's used to log for a network call using the **interceptor**.
* It's used to cache network calls.

There are two different interceptors.

* **Application Interceptors** are added between these interceptors Application code and Okhttp Core Library. We use it with `addInterceptor()`.
* **Network Interceptor**, these interceptors are added between OkHttp Core Library and Server. We can add them to OkHttpClient using `addNetworkInterceptor()`.


## How to add Interceptor in Okhttp?

These add to Interceptor in Okhttp. 

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

This article hopufelly help to your. See you in the next articles.

