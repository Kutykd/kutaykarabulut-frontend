import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { isEmail, type FormErrors } from "../utils/validate";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: FormErrors = {};
    if (!isEmail(email)) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <>
      {sent && <p className="mesaj mesaj-basari">Form geçerli. Gerçek giriş sonraki sprintlerde eklenecek.</p>}

      <form className="form" noValidate onSubmit={handleSubmit}>
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
        <p className="form-butonlar">
          <button type="submit" className="buton">
            Giriş yap
          </button>
        </p>
      </form>

      <p className="form-baglantilar">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;
