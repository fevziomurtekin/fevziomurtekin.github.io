# Fevzi Ömür Tekin - Personal Blog

Bu, Android geliştirici Fevzi Ömür Tekin'in kişisel blog sitesidir. Blog, hem İngilizce hem de Türkçe dillerinde içerik sunar.

This is the personal blog site of Android developer Fevzi Ömür Tekin. The blog provides content in both English and Turkish languages.

## 🌍 Bilingual Features / Çift Dilli Özellikler

### Language Switching / Dil Değiştirme
- **EN/TR** dil seçici her sayfada mevcuttur
- URL parametresi ile dil değiştirme (`?lang=tr` veya `?lang=en`)
- Otomatik dil algılama ve içerik gösterimi

### Content Structure / İçerik Yapısı
Her blog yazısı ve sayfa için:
- `title`: İngilizce başlık
- `title_tr`: Türkçe başlık
- `lang`: Varsayılan dil (en)
- `lang_tr`: Türkçe dil kodu (tr)
- `content_tr`: Türkçe içerik (opsiyonel)

### Example Front Matter / Örnek Front Matter
```yaml
---
layout: post
title: Dependency Management with use.toml
title_tr: use.toml ile Bağımlılık Yönetimi
lang: en
lang_tr: tr
content_tr: |
  Türkçe içerik buraya...
---
```

## 🚀 Getting Started / Başlangıç

### Prerequisites / Gereksinimler
- Ruby 2.4.0 veya üzeri
- Jekyll 4.0 veya üzeri
- Bundler

### Installation / Kurulum
```bash
# Repository'yi klonlayın
git clone https://github.com/fevziomurtekin/fevziomurtekin.github.io.git

# Dizine gidin
cd fevziomurtekin.github.io

# Bağımlılıkları yükleyin
bundle install

# Yerel sunucuyu başlatın
bundle exec jekyll serve
```

### Local Development / Yerel Geliştirme
```bash
# Jekyll sunucusunu başlatın
bundle exec jekyll serve

# Tarayıcıda açın
open http://localhost:4000
```

## 📝 Adding New Content / Yeni İçerik Ekleme

### New Blog Post / Yeni Blog Yazısı
1. `_posts/` dizininde yeni markdown dosyası oluşturun
2. Front matter'a dil bilgilerini ekleyin
3. Hem İngilizce hem Türkçe içerik ekleyin

### New Page / Yeni Sayfa
1. Root dizinde yeni markdown dosyası oluşturun
2. `layout: page` kullanın
3. Dil bilgilerini ekleyin

## 🎨 Customization / Özelleştirme

### Styling / Stil
- CSS dosyaları: `public/css/`
- Ana stil: `lanyon.css`
- Dil seçici stilleri mevcuttur

### Layouts / Düzenler
- `_layouts/default.html`: Ana düzen
- `_layouts/post.html`: Blog yazısı düzeni
- `_layouts/page.html`: Sayfa düzeni

## 📚 Available Posts / Mevcut Yazılar

- **2023-01-18**: Dependency Management with use.toml
- **2022-12-01**: Importance of Gradle in Android Development World
- **2020-12-12**: Fragments Communicate with FragmentResult
- **2020-10-16**: Why Use Jetpack DataStore?
- **2020-07-15**: What is this Okhttp Interceptor?

## 🔧 Technical Details / Teknik Detaylar

### Jekyll Configuration
- Çoklu dil desteği
- Otomatik içerik filtreleme
- URL tabanlı dil değiştirme

### JavaScript Features
- Dil değiştirme işlevselliği
- URL parametresi yönetimi
- Sayfa yenileme ile dil değişimi

## 📞 Contact / İletişim

- **Email**: fevziomurtekin@gmail.com
- **Twitter**: [@fevziomurtekin](https://twitter.com/fevziomurtekin)
- **LinkedIn**: [fevziomurtekin](https://www.linkedin.com/in/fevziomurtekin)
- **GitHub**: [fevziomurtekin](https://github.com/fevziomurtekin)

## 📄 License / Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE.md` dosyasına bakın.

This project is licensed under the MIT License. See the `LICENSE.md` file for details.
