---
title: What is Jetpack Datastore? Why should we use Jetpack Datastore?
author: Fevzi Ömür Tekin
date: 2020-10-16 11:33:00 +0800
categories: [Android, Development, Jetpack, Datastore]
tags: [Android]
math: true
image: https://miro.medium.com/max/1200/1*lDGK7qz9h3xQP_IUoZxGaQ.png
---

> This post is to The Turkish of this article is also available in **[Medium](https://medium.com/@fevziomurtekin/jetpack-datastore-nedir-neden-kullanmal%C4%B1y%C4%B1z-7be78764970b)**.


## What is Jetpack Datastore? Why should we use Jetpack Datastore?

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
  class BaseViewModel(
    private val app: Application,
    //repository
  ) : ViewModel{

      var basePreferences = BasePreferences(app.applicationContext)
      var dataStoreLiveData: LiveData<String> = MutableLiveData()
      var baseValue :String = ""

      // we can write to value with the method.
      fun saveValue(val v : String){
        viewModelScope.launch {
            basePreferences.saveValue(v)
        }
      }

      // The method we created to observe the data.
     // We can listen to our value in the activity or fragment class where we will use our view model.
    fun getLiveData(){
        viewModelScope.launch{
          dataStoreLiveData = basePreferences.lastSavedValue()
                      .asLiveData(viewModelScope.coroutineContext+Dispatchers.Default)
        }
    }

    // we can read to value with the function.
    fun getValue(){
        basePreferences.lastSavedValue()
            .collect { value ->
                baseValue = value
        }
    }

  }

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
