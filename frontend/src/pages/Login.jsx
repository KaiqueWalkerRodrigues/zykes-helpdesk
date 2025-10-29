import { useEffect } from "react";
import Page from "../components/Page";

export default function Login() {
  useEffect(() => {
    document.body.classList.add("bg-gray-200");

    return () => {
      document.body.classList.remove("bg-gray-200");
    };
  }, []);

  return (
    <>
      <Page title="Login"></Page>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Entrar
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="pocoyo.silva"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Lembrar de mim
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Entrar
            </button>
          </form>

          {/* <div className="mt-6 text-center text-sm text-gray-600">
              Não possui conta?
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Registre-se
              </a>
            </div> */}
        </div>
      </div>
    </>
  );
}
