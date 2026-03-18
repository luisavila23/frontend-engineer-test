import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    (data) => {
      const success = login(data.username, data.password);

      if (!success) {
        setError("root", {
          type: "manual",
          message: "Credenciales invalidas. Intenta con admin / 1234",
        });
        return;
      }

      navigate("/home");
    },
    [login, navigate, setError],
  );

  const toggleShowPassword = useCallback(() => {
    setShowPassword((previousValue) => !previousValue);
  }, []);

  const toggleDemoCredentials = useCallback(() => {
    setShowDemoCredentials((previousValue) => !previousValue);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="page page--centered">
      <section className="auth-card">
        <img src="/ram.svg" alt="Rick and Morty" className="auth-card__image" />

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
          <div className="auth-form__field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Usuario requerido",
                minLength: {
                  value: 3,
                  message: "El usuario debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.username ? (
              <p className="auth-form__error">{errors.username.message}</p>
            ) : null}
          </div>

          <div className="auth-form__field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Contraseña requerida",
                minLength: {
                  value: 4,
                  message: "La contraseña debe tener al menos 4 caracteres",
                },
              })}
            />

            <button
              type="button"
              className="auth-form__toggle-password"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <img src="/ico_eye.svg" alt="" width={26} />
            </button>

            {errors.password ? (
              <p className="auth-form__error">{errors.password.message}</p>
            ) : null}
          </div>

          {errors.root ? <p className="auth-form__error">{errors.root.message}</p> : null}

          <button type="submit" className="auth-form__button" disabled={isSubmitting}>
            {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
          </button>

          <button
            type="button"
            className="auth-form__link"
            onClick={toggleDemoCredentials}
          >
            ¿Olvidaste tu usuario o contraseña?
          </button>
        </form>

        {showDemoCredentials ? (
          <p className="auth-card__hint">Credenciales demo: admin / 1234</p>
        ) : null}
      </section>
    </main>
  );
};
