# Animation Control

## Giriş Animasyonu

Giriş animasyonu (Matrix Loader) artık her zaman aktif ve çok hızlıdır.

### Varsayılan Davranış
- **Giriş animasyonu HER ZAMAN AÇIK**
- Website 0.05 saniye çok kısa animasyon gösterir, sonra ana içeriğe geçer
- Animasyon açma/kapama butonu kaldırıldı

### Animasyon Ayarları

`js/config.js` dosyasında animasyon süreleri ayarlanabilir:

```javascript
// Animation Configuration
ANIMATION: {
  LOADER_DURATION: 50,              // Toplam animasyon süresi: 0.05 saniye
  EXPLOSION_DURATION: 20,           // Patlama efekti süresi
  FADE_DURATION: 10,                // Fade in/out süresi
  GLITCH_PROBABILITY: 0.005,
  MORPH_PROBABILITY: 0.05,
  // Entrance Animation Control (Always enabled)
  ENABLE_ENTRANCE_ANIMATION: true,  // Always true - animation toggle removed
  SKIP_LOADING_SCREEN: false,       // Always false - animation always shows
  SHOW_LOADING_PROGRESS: false      // Always false - no progress bar
},
```

### Seçenekler:

#### 1. Çok Kısa Animasyon (Varsayılan - Önerilen)
```javascript
SKIP_LOADING_SCREEN: false,
ENABLE_ENTRANCE_ANIMATION: true
```
- ✅ **"ENTERING THE MATRIX" animasyonu**
- ✅ **0.25 saniye sürer**
- ✅ **Çok hızlı Matrix deneyimi**
- ✅ **Çok kısa ve etkili**

#### 2. Tamamen Atla
```javascript
SKIP_LOADING_SCREEN: true,
ENABLE_ENTRANCE_ANIMATION: false
```
- ✅ Hiç yükleme ekranı yok
- ✅ Doğrudan ana sayfa
- ✅ En hızlı yükleme

#### 3. Minimal Yükleme
```javascript
SKIP_LOADING_SCREEN: false,
ENABLE_ENTRANCE_ANIMATION: false
```
- ✅ Kısa "Loading..." metni
- ✅ 0.1 saniye sürer
- ✅ Animasyon yok

### Animasyon Ne Gösterir

Açık olduğunda, giriş animasyonu şunları gösterir:
1. "Alperdigital'e hoşgeldiniz." (Welcome to Alperdigital)
2. "Şu anda buradasınız." (You are here now)
3. İşaret parmağı ile hazine haritası animasyonu
4. "X işaretini bulun!" (Find the X mark!)

### Kullanıcı Kontrolü

Website'de sağ üst köşede **🎬** butonu bulunur:
- **🎬** = Animasyon açık
- **⏸️** = Animasyon kapalı
- Tıklayarak açıp kapatabilirsiniz
- Ayar localStorage'da saklanır (kalıcı)

### Teknik Detaylar

- Animasyon `MatrixApp.js` constructor'da kontrol edilir
- `SKIP_LOADING_SCREEN: true` → Doğrudan ana sayfa
- `ENABLE_ENTRANCE_ANIMATION: false` → Minimal yükleme (0.1s)
- `ENABLE_ENTRANCE_ANIMATION: true` → Çok kısa animasyon (0.25s)
- Kullanıcı tercihleri localStorage'da saklanır
- Tüm süreler optimize edildi: maxTimeout: 250ms, lineDelay: 50ms

### Erişilebilirlik

- Animasyon kullanıcının `prefers-reduced-motion` ayarını dikkate alır
- Azaltılmış hareket algılandığında basitleştirilmiş versiyon gösterilir
- Animasyon tamamen devre dışı bırakılabilir
- Kullanıcı dostu toggle butonu mevcuttur
