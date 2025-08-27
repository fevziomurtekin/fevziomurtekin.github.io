---
layout: post
title: Why Use Jetpack DataStore?
title_tr: Neden Jetpack DataStore Kullanmalıyız?
lang: en
lang_tr: tr
content_tr: |
  > Bu yazının Türkçesi **[Medium](https://medium.com/@fevziomurtekin/jetpack-datastore-nedir-neden-kullanmal%C4%B1y%C4%B1z-7be78764970b)**'da da mevcuttur.

  ## Jetpack DataStore Nedir? Neden Jetpack DataStore Kullanmalıyız?

  ---

  Merhaba herkese,
  Bu makalede, Android Jetpack bileşenlerinden biri olan DataStore yapısı hakkında konuşacağım. DataStore Preferences ile örnekler vererek kodda açıklayacağım.

  Peki DataStore nedir, neden kullanmalıyız? Hakkında bilgi vererek başlayalım!

  ---

  ## DataStore Nedir?

  <p>DataStore, SharedPreferences yerine Kotlin Coroutine ve Flow yapıları ile asenkron olarak yerel verilerimizi depolamak için kullanılan bir Jetpack bileşenidir.</p>

  Peki SharedPreferences varken neden bu yapıyı kullanmalıyız? İki yapıyı karşılaştırarak açıklayalım.

  ### SharedPreferences vs DataStore

  - **DataStore** ve **SharedPreferences** her ikisi de Async API kullanır. DataStore hem yazma hem de okuma için kullanır, SharedPreferences ise sadece değişkenler değişirken dinlemek için kullanır.
  - **DataStore** UI thread altında çalıştırmak güvenlidir. UI thread ile çalışmak ANR oluşmasını engeller.
  - **DataStore** hata yönetimini destekler.
  - **DataStore** kotlin [kotlin-corutine](https://kotlinlang.org/docs/reference/coroutines/coroutines-guide.html) ve [flow](https://kotlinlang.org/docs/reference/coroutines/flow.html) yapılarını destekler.

  [![1800x640](https://miro.medium.com/max/1042/1*ZuiiBUVP2LD1leAOAQ9wDg.png)]()

  Bunu daha detaylı incelersek, iki farklı türde yapı vardır. Bunlar;

  * **Preferences DataStore**, bu tür verileri SharedPreferences gibi *key/value* çiftleri halinde saklar ancak herhangi bir tür güvenlik sağlamaz.
  * **Proto DataStore** bu tür verileri *nesneler* olarak saklar,

  Her iki türü kullanarak depolama sağlayabiliriz. Ancak Proto tip güvenliği sağlar. **Proto** kullanırken bir şema da tanımlarsınız.

  Bu şemayı `src/main/proto/directory` altında tanımlamanız gerekir. Bu diyagram, kullanacağınız nesnelerin türlerini içerir.

  Daha detaylı bilgi [burada](https://developer.android.com/topic/libraries/architecture/datastore) bulunabilir.

  Şimdi kurulumunu ve kullanımını görelim.

  ### DataStore Preferences Kurulumu ve Kullanımı

  ```gradle
  dependencies {
    // Preferences DataStore
    implementation "androidx.datastore:datastore-preferences:1.0.0-alpha02"

    // Proto DataStore
    implementation "androidx.datastore:datastore-core:1.0.0-alpha02"
  }
  ```

  `build.gradle` dosyamıza bağımlılıklarımızı dahil ederek DataStore kütüphanelerimizi projeye ekledik.

  Öncelikle DataStore Preferences yapısında bir sınıf oluşturduk ve kullanacağımız veri yazma ve okuma fonksiyonlarını oluşturduk.

  ```kotlin
  class BasePreferences(private val context: Context) {

      companion object{
          val BASE_KEY = preferencesKey<String>(name = "key")
      }

      private val dataStore: DataStore<Preferences> = context.createDataStore(
          name = "pref"
      )

      suspend fun saveValue(value: String){
          dataStore.edit { preferences ->
              preferences[BASE_KEY] = value
          }
      }

      val lastSavedValue: Flow<String> = dataStore.data
          .map { preferences ->
              preferences[BASE_KEY] ?: "default value"
          }
  }
  ```

  Bu değerleri viewModel'de viewmodelScope kullanarak nasıl yazabileceğimizi ve kullanabileceğimizi basitçe gösterelim.

  ```kotlin
  ```
---

> This post is to The Turkish of this article is also available in **[Medium](https://medium.com/@fevziomurtekin/jetpack-datastore-nedir-neden-kullanmal%C4%B1y%C4%B1z-7be78764970b)**.


## What is Jetpack Datastore? Why should we use Jetpack DataStore?

---

Hello everyone,
In this article, I'll talk about the DataStore structure, which is one of the Android Jetpack components. I'll explain in code by giving examples with DataStore Preferences.

So what is a DataStore, why should we use it? Let's start by giving information about!

---

## What is Datastore?

<p>DataStore is a Jetpack component that is used to store our local data as an asecron with Kotlin Coroutine and Flow structures instead of SharedPreferences.</p>

So why should we use this structure when there is SharedPreferences? Let's explain by comparing the two structures.


### SharedPreferences vs DataStore

- **DataStore** and **SharedPreferences** both use the Async API. Datastore uses it for both writing and reading, while SharedPreferences only uses it to listen when changing variables.
- **DataStore** is safe to run under UI thread. Working with UI thread prevents ANR from occurring.
- **DataStore** is support error handling.
- **DataStore** is support kotlin [kotlin-corutine](https://kotlinlang.org/docs/reference/coroutines/coroutines-guide.html) and [flow](https://kotlinlang.org/docs/reference/coroutines/flow.html) stuctures.

[![1800x640](https://miro.medium.com/max/1042/1*ZuiiBUVP2LD1leAOAQ9wDg.png)]()

If we look at the this in more detail, there are two different type of structure. These;

* **Preferences Datastore**, this type stores data in *key/value* pairs like SharedPreferences but doesn't provde any type of security.
* **Proto Datastore** this type stores data as *objects*,

We can provide storage using both types. But Proto provides type security. You also define a schema when using **Proto**.

You must define this schema under index `src/main/proto/directory`. This diagram contains the types of objects you'll use.

More detailed information can be found [at](https://developer.android.com/topic/libraries/architecture/datastore).


Let's look at its setup and usage now.

....

### Datastore Preferences Setup and Usage


```gradle

  dependencies {
    // Preferences DataStore
    implementation "androidx.datastore:datastore-preferences:1.0.0-alpha02"

    // Proto DataStore
    implementation "androidx.datastore:datastore-core:1.0.0-alpha02"
}

```

We've added our Datastore libraries to project by including our dependencies in `build.gradle`.

Firstly we created class in the Datastore Preferences structure and created the data writing and reading fuctions that we'll use.

```kotlin
class BasePreferences(private val context: Context) {

    companion object{
        val BASE_KEY = preferencesKey<String>(name = "key")
    }

    private val dataStore: DataStore<Preferences> = context.createDataStore(
        name = "pref"
    )

    suspend fun saveValue(value: String){
        dataStore.edit { preferences ->
            preferences[BASE_KEY] = value
        }
    }

    val lastSavedValue: Flow<String> = dataStore.data
        .map { preferences ->
            preferences[BASE_KEY] ?: "default value"
        }
}
```

Let's simply show how we can write and use these values using to viewmodelScope in the viewModel.

```kotlin
```

As I wrote in the commentline, we can listen to our livedata type variable in our activity or fragment class, where we'll use our viewmodel and the necessary actions according to the charge.

Or we can collect and  read data directly.

---

## Utilized Resources and Result

- [Android Developer Blog](https://android-developers.googleblog.com/2020/09/prefer-storing-data-with-jetpack.html)
- [Offical Docs](https://developer.android.com/topic/libraries/architecture/datastore)
- [Pro Android Dev](https://proandroiddev.com/lets-explore-jetpack-datastore-in-android-621f3564b57)

As seen in our examples, it is advantageous to use the DataStore Coroutine and Flow structure. It is a more reliable, more useful solution than SharedPreferences to securely perform asecron processing in UI threats.

See you in the next articles.
