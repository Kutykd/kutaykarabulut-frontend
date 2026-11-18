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
| GET | /events | Listeyi getir | 200 | — | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 (geçersiz id de) | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

Hata biçimi: `{ "error": { "message": "Event not found" } }`
