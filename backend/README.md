# Kampüs Etkinlik Backend

## Çalıştırma

```bash
cd backend
npm install
npm run seed
npm run dev
```

Adres: http://localhost:3000

`npm run seed` veritabanını silip 6 örnek etkinlik ekler; kaç kez çalışırsa çalışsın 6 kayıt kalır.

## Ortam değişkeni

`.env` dosyasında `PORT` ve `MONGODB_URI` (örnek: `.env.example`). Veriler MongoDB'de, `events` koleksiyonunda; id alanı MongoDB'nin `_id`'si.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu durumu | 200 | — | çalışıyor |
| GET | /events | Listeyi getir | 200 | — | çalışıyor |
| GET | /events?search=&category= | Başlıkta ara, kategoriye göre süz | 200 | — | çalışıyor |
| GET | /events/upcoming | Bugün ve sonrası, tarihe göre sıralı | 200 | — | çalışıyor |
| GET | /events/:id | Tek etkinlik | 200 | 404 (geçersiz id de) | çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | çalışıyor |
| DELETE | /events/:id | Sil | 204 | 404 | çalışıyor |

Hata biçimi: `{ "error": { "message": "Event not found" } }`

Tarih her yerde `GG-AA-YYYY` biçiminde: `"15-10-2026"`. Veritabanında Date olarak tutulur.
