import { router } from "../router";
import { saveSession } from "../functions/auth";

const apiUrl = import.meta.env.VITE_API_URL;

export const loginPage = {
  render() {
    return `
    <div class="bg-surface-container-lowest text-on-surface min-h-screen flex flex-col">
      <main class="flex-grow flex items-center justify-center px-gutter py-xxl">
        <div class="w-full max-w-[440px] space-y-xl">

          <div class="text-center space-y-md">
            <h1 class="font-headline-md text-headline-md font-bold text-primary tracking-tight">Riwiflow</h1>
            <p class="font-body-md text-body-md text-on-surface-variant">Sign in to your professional workspace</p>
          </div>

          <div class="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl space-y-lg">
            <form class="space-y-lg" id="loginForm" onsubmit="return false;">

              <div class="space-y-sm">
                <label class="font-label-md text-label-md text-on-surface" for="email">Email address</label>
                <input
                  class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20"
                  id="email" name="email" placeholder="name@company.com" required type="email"
                />
              </div>

              <div class="space-y-sm">
                <label class="font-label-md text-label-md text-on-surface" for="password">Password</label>
                <input
                  class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20"
                  id="password" name="password" placeholder="••••••••" required type="password"
                />
                <div id="loginError" class="hidden">
                  <p class="text-sm text-red-600 bg-red-50 border border-red-200 px-md py-sm rounded-lg">
                    Invalid credentials. Please try again.
                  </p>
                </div>
              </div>

              <div class="pt-sm">
                <button
                  class="w-full bg-primary hover:opacity-90 text-on-primary font-label-md text-label-md py-md px-lg rounded-lg transition-all flex items-center justify-center gap-sm"
                  type="submit" id="loginBtn"
                >
                  Login
                  <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

            </form>
          </div>

          <div class="text-center">
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Use <strong>admin@mail.com</strong> or <strong>coder@mail.com</strong> — password <strong>1234</strong>
            </p>
          </div>
        </div>
      </main>

      <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary-fixed/10 blur-[100px] rounded-full"></div>
      </div>
    </div>`;
  },

  mounted() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const btn = document.getElementById('loginBtn');
      btn.disabled = true;
      btn.innerHTML = 'Signing in... <span class="material-symbols-outlined text-[18px]">hourglass_empty</span>';

      const formData = new FormData(this);
      const { email, password } = Object.fromEntries(formData.entries());

      try {
        // Buscar solo por email, luego comparar password en JS
        // Así funciona sin importar si la contraseña tiene comillas o no en db.json
        const res = await fetch(`${apiUrl}/users?email=${email}`);
        const data = await res.json();

        const user = data.find(u => String(u.password) === String(password));

        if (!user) {
          document.getElementById('loginError').classList.remove('hidden');
          setTimeout(() => document.getElementById('loginError').classList.add('hidden'), 3000);
          btn.disabled = false;
          btn.innerHTML = 'Login <span class="material-symbols-outlined text-[18px]">arrow_forward</span>';
          return;
        }

        // Guardar sesión como 'users' (sin la contraseña)
        const { password: _pass, ...userSession } = user;
        localStorage.setItem('users', JSON.stringify(userSession));

        history.pushState(null, null, '/dashboard');
        router();

      } catch (error) {
        console.error('Login error:', error);
        btn.disabled = false;
        btn.innerHTML = 'Login <span class="material-symbols-outlined text-[18px]">arrow_forward</span>';
      }
    });
  }
};

export default loginPage;