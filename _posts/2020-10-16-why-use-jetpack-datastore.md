---
title: What is Jetpack Datastore? Why should we use Jetpack Datastore?
author: Fevzi Ömür Tekin
date: 2020-10-16 11:33:00 +0800
categories: [Android, Development, Jetpack, Datastore]
tags: [Android]
math: true
image: https://miro.medium.com/max/1273/1*9AiTGrsS8XxmG6yjPxlXyQ.png
---

> This post is to The Turkish of this article is also available in **[Medium](https://medium.com/@fevziomurtekin/jetpack-datastore-nedir-neden-kullanmal%C4%B1y%C4%B1z-7be78764970b)**.


## What is Jetpack Datastore? Why should we use Jetpack Datastore?

---
[![1800x640](https://miro.medium.com/max/1273/1*9AiTGrsS8XxmG6yjPxlXyQ.png)](https://github.com/fevziomurtekin)


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

[![1800x640](https://miro.medium.com/max/1042/1*ZuiiBUVP2LD1leAOAQ9wDg.png)](https://github.com/fevziomurtekin)

....

### Ordered list

1. first item
2. second item
3. third item

### Unordered list

- item 1
	- sub item 1
	- sub item 2

- item 2

## Block Quote

> This line to shows the Block Quote.

## Tables

| Company                      | contact          | Country |
|:-----------------------------|:-----------------|--------:|
| Alfreds Futterkiste          | Maria Anders     | Germany |
| Island Trading               | Helen Bennett    | UK      |
| Magazzini Alimentari Riuniti | Giovanni Rovelli | Italy   |

## Link

<http://127.0.0.1:4000>


## Footnote

Click the hook will locate the footnote[^footnote].


## Images

By default, the image is centered and the image caption can be displayed at the bottom:

![Desktop View](/assets/img/sample/mockup.png)
_Full screen width and center alignment_

You can change the size of the picture:

![Desktop View](/assets/img/sample/mockup.png){: width="400"}
_400px image width_

In addition, you can use class `normal` , `left` and `right` to specify the image position (but in these case, the image caption is prohibited), for example:

- Normal position
  
  ![Desktop View](/assets/img/sample/mockup.png){: width="350" class="normal"}

- Float to the left

  ![Desktop View](/assets/img/sample/mockup.png){: width="240" class="left"}
  "A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space."

- Float to the right

  ![Desktop View](/assets/img/sample/mockup.png){: width="240" class="right"}
  "A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space. A repetitive and meaningless text is used to fill the space."

## Inline code

This is an example of `Inline Code`.

## Mathematics

The mathematics powered by [**MathJax**](https://www.mathjax.org/):

$$ \sum_{n=1}^\infty 1/n^2 = \frac{\pi^2}{6} $$

When \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are

$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

## Code Snippet

### Common

```
This is a common code snippet, without syntax highlight and line number.
```

### Specific Languages

#### Console

```console
$ date
Sun Nov  3 15:11:12 CST 2019
```


#### Terminal

```terminal
$ env |grep SHELL
SHELL=/usr/local/bin/bash
PYENV_SHELL=bash
```

#### Ruby

```ruby
def sum_eq_n?(arr, n)
  return true if arr.empty? && n == 0
  arr.product(arr).reject { |a,b| a == b }.any? { |a,b| a + b == n }
end
```

#### Shell

```shell
if [ $? -ne 0 ]; then
    echo "The command was not successful.";
    #do the needful / exit
fi;
```

#### Liquid

{% raw %}
```liquid
{% if product.title contains 'Pack' %}
  This product's title contains the word Pack.
{% endif %}
```
{% endraw %}

#### HTML

```html
<div class="sidenav">
  <a href="#contact">Contact</a>
  <button class="dropdown-btn">Dropdown
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
  <a href="#contact">Search</a>
</div>
```

**Horizontal Scrolling**

```html
<div class="panel-group">
  <div class="panel panel-default">
    <div class="panel-heading" id="{{ category_name }}">
      <i class="far fa-folder"></i>
      <p>This is a very long long long long long long long long long long long long long long long long long long long long long line.</p>
      </a>
    </div>
  </div>
</div>
```


## Reverse Footnote

[^footnote]: The footnote source.
