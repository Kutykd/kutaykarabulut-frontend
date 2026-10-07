# Kampüs Etkinlikleri — Sprint 2

Sprint 1'deki HTML iskeletine CSS giydirildi: telefonda ve masaüstünde rahat kullanılan arayüz.

- **Öğrenci:** Kutay Karabulut — 2321032056
- **Ders:** Web Teknolojileri ve Programlama, Sprint 2 (CSS ve Responsive)
- **Stil dosyası:** `sprint2/css/numaran.css` (beş sayfaya da bağlı)

## Bu sprintte yapılanlar

- Renk ve font öğrenci numarasından: `--no`, `--ton`, `--renk-ana`, `--renk-zemin`, `--font`.
  Dosyanın geri kalanında renk ve boşluklar hep `var(--...)` ile.
- Beş sayfa aynı başlık ve menüyü kullanır.
- Etkinlik listesindeki tablo kalktı; etkinlikler `section` içinde `article` kartlar,
  `display: grid` ile dizilir. Telefonda tek sütun, geniş ekranda birden fazla sütun.
- Detay sayfasında afiş solda, künye (`dl`) sağda; telefonda alt alta.
- Formlarda label üstte, alanlar tam genişlik; boş gönderilen zorunlu alan kırmızı olur.
