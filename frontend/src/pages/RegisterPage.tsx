import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { isEmail, type FormErrors } from "../utils/validate";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: FormErrors = {};
    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!isEmail(email)) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <>
      {sent && <p className="mesaj mesaj-basari">Form geçerli. Gerçek kayıt sonraki sprintlerde eklenecek.</p>}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <p className="alan">
          <label htmlFor="name">Ad Soyad</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
          />
          <span className="hata-metni">{errors.name}</span>
        </p>
        <p className="alan">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          <span className="hata-metni">{errors.email}</span>
        </p>
        <p className="alan">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          <span className="hata-metni">{errors.password}</span>
        </p>
        <p className="alan">
          <label htmlFor="password2">Şifre (tekrar)</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined}
          />
          <span className="hata-metni">{errors.password2}</span>
        </p>
        <p className="form-butonlar">
          <button type="submit" className="buton">
            Kayıt ol
          </button>
        </p>
      </form>

      <p className="form-baglantilar">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </>
  );
}

export default RegisterPage;
