const apiUrl = import.meta.env.VITE_API_URL;
const user = JSON.parse(localStorage.getItem('users'));

export const boardPage = {
  tasks: [],
  
  render(){
      return ` <div class="bg-background text-on-background overflow-hidden h-screen flex">
    <!-- SideNavBar Anchor -->
    <aside
      class="hidden md:flex flex-col pt-md pb-xl gap-xs h-full bg-surface-container-low border-r border-outline-variant w-[280px] shrink-0"
    >
      <div class="px-gutter mb-xl">
        <h1 class="font-headline-md text-headline-md font-bold text-primary">
          Riwiflow
        </h1>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Product Team
        </p>
      </div>
      <nav class="flex-1 space-y-1">
        <a
          class="flex items-center bg-primary-fixed text-on-primary-fixed-variant rounded-lg mx-2 px-4 py-3 font-body-sm text-body-sm transition-all scale-[0.98]"
          href="#"
        >
          <span class="material-symbols-outlined mr-3" data-icon="dashboard"
            >dashboard</span
          >
          <span>Dashboard</span>
        </a>
        <a
          class="flex items-center text-secondary hover:text-primary hover:bg-primary-container/10 px-4 py-3 mx-2 font-body-sm text-body-sm rounded-lg transition-all"
          href="#"
        >
          <span class="material-symbols-outlined mr-3" data-icon="assignment"
            >assignment</span
          >
          <span>Projects</span>
        </a>
        <a
          class="flex items-center text-secondary hover:text-primary hover:bg-primary-container/10 px-4 py-3 mx-2 font-body-sm text-body-sm rounded-lg transition-all"
          href="#"
        >
          <span class="material-symbols-outlined mr-3" data-icon="group"
            >group</span
          >
          <span>Team</span>
        </a>
        <a
          class="flex items-center text-secondary hover:text-primary hover:bg-primary-container/10 px-4 py-3 mx-2 font-body-sm text-body-sm rounded-lg transition-all"
          href="#"
        >
          <span class="material-symbols-outlined mr-3" data-icon="bar_chart"
            >bar_chart</span
          >
          <span>Reports</span>
        </a>
        <a
          class="flex items-center text-secondary hover:text-primary hover:bg-primary-container/10 px-4 py-3 mx-2 font-body-sm text-body-sm rounded-lg transition-all"
          href="#"
        >
          <span class="material-symbols-outlined mr-3" data-icon="settings"
            >settings</span
          >
          <span>Settings</span>
        </a>
      </nav>
      <div class="px-4 mt-auto">
        <button
          class="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
        >
          <span class="material-symbols-outlined" data-icon="add">add</span>
          New Project
        </button>
      </div>
    </aside>
    <main class="flex-1 flex flex-col min-w-0">
      <!-- TopAppBar Anchor -->
      <header
        class="flex justify-between items-center h-16 px-gutter w-full bg-surface border-b border-outline-variant z-40"
      >
        <div class="flex items-center gap-4 flex-1">
          <div class="relative max-w-md w-full">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
              data-icon="search"
              >search</span
            >
            <input
              class="w-full pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-full font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search tasks or files..."
              type="text"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 ml-4">
          <button
            class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors"
            data-icon="notifications"
          >
            notifications
          </button>
          <button
            class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors"
            data-icon="help_outline"
          >
            help_outline
          </button>
          <img
            alt="User profile"
            class="w-8 h-8 rounded-full border border-outline-variant object-cover"
            data-alt="A professional high-resolution close-up portrait of a corporate professional in a modern office. The individual is wearing a smart minimalist outfit. The background consists of soft out-of-focus architectural lines of a contemporary tech hub with soft purple and lavender lighting, maintaining a bright and optimistic light-mode aesthetic."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2-sF_Qd9jEF33fUrS3vMvdoA8rbw2_a6jzv7r_6oDikCkrertidHwLgqAtWuKvLnRx7Lcsi79ZYj4FBaL_pETFxeyeF27_PhXy-KnuioiYgCwYTKcWDEuZoRksSf8Jb0_ZmsxJkpTFGZ2bW8aTl5fhcA4DOHQQal_vu1KVBcizoM56dHRc7Ce_vkUul2aL96DSeDmqR4YdfGUuoIQkUF_F8AX45U05tmCFg7YyPH6xtgAx7e31u5_5e2rQxm_tgBEgnhV-LsqsEDH"
          />
        </div>
      </header>
      <!-- Content Area -->
      <div class="flex-1 overflow-x-auto p-gutter custom-scrollbar">
        <div class="flex gap-gutter h-full">
          <!-- Column: To Do -->
          <div class="kanban-column flex flex-col w-1/4 h-full">
            <div class="flex items-center justify-between mb-md">
              <div class="flex items-center gap-2">
                <h3 class="font-title-sm text-title-sm text-on-surface">
                  To Do
                </h3>
                <span
                  class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                  >3</span
                >
              </div>
              <button
                class="material-symbols-outlined text-outline"
                data-icon="more_horiz"
              >
                more_horiz
              </button>
            </div>
            <div
              class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"
            >
              <!-- Card 1 -->
              <div
                class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm"
              >
                <div class="flex items-start justify-between mb-xs">
                  <span
                    class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                    >Design</span
                  >
                  <span
                    class="material-symbols-outlined text-outline text-sm"
                    data-icon="attach_file"
                    >attach_file</span
                  >
                </div>
                <h4 class="font-label-md text-label-md text-on-surface mb-xs">
                  User Flow Mapping
                </h4>
                <p
                  class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"
                >
                  Define the end-to-end journey for the new onboarding
                  experience.
                </p>
                <div class="mt-md flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <img
                      class="w-6 h-6 rounded-full border-2 border-surface"
                      data-alt="Minimalist avatar placeholder of a professional team member. Professional and clean styling consistent with a high-end SaaS platform interface."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBuiKEYj12lJcVG4nXyKu-Ai-H1-QlxIX2zT1jzk7AAD9j-20g91vBWIy1_5PsuU1H-g9vErAWuJJg3lohFPbVJhWG1ZwwSI2BxdTBpANzBluRwLzmBbnpSae8GQTTdZ1GoRzw9ZDPsxzDwyvkzduAyTDl3TN4KqDP45-VjqA0fxNIy5VVE5a8OP1OTlymungwOO-QcyUBGbbs24dxy1hwAoNbSe-uapYTlmCQYk70fcbq2y5m0xQhtlAZFbH8AX739jEY5b-ZtW8N"
                    />
                    <img
                      class="w-6 h-6 rounded-full border-2 border-surface"
                      data-alt="Minimalist avatar placeholder of a professional team member. Professional and clean styling consistent with a high-end SaaS platform interface."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMFhGwIRXSErcBCGHhCTzONc4V-aoXHbv3Bb0B7dMDwdGg3l25NTGZPNNlR82495ZLlhoi8IeMK0KPTuUrW88WE7s9j4EjcACUuB1g9sMjzjzkA9d7d81MuI0BQVZ3f1MpwplOXAbgD-_05LuexKrb1IwB3CVez6mpSbokMun24DLw7J4vebSUjPGu_Mwr4seNi9hsnr18iFZyzGmBUVQSd0m0C5xALrKW1O7O40Y3IEQ2eam3eWIY49HC4UoA7twGHVoe7FruTJIX"
                    />
                  </div>
                  <span
                    class="font-label-sm text-label-sm text-outline flex items-center gap-1"
                  >
                    <span
                      class="material-symbols-outlined text-sm"
                      data-icon="schedule"
                      >schedule</span
                    >
                    2d
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- Column: In Progress -->
          <div class="kanban-column flex flex-col w-1/4 h-full">
            <div class="flex items-center justify-between mb-md">
              <div class="flex items-center gap-2">
                <h3 class="font-title-sm text-title-sm text-on-surface">
                  In Progress
                </h3>
                <span
                  class="bg-primary-container text-on-primary px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                  >2</span
                >
              </div>
              <button
                class="material-symbols-outlined text-outline"
                data-icon="more_horiz"
              >
                more_horiz
              </button>
            </div>
            <div
              class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"
            >
              <!-- Card 3 -->
              <div
                class="task-card bg-surface border-l-4 border-l-primary border border-outline-variant rounded-xl p-md shadow-sm"
              >
                <div class="flex items-start justify-between mb-xs">
                  <span
                    class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                    >Engineering</span
                  >
                  <span
                    class="material-symbols-outlined text-primary text-sm"
                    data-icon="star"
                    data-weight="fill"
                    style="font-variation-settings: &quot;FILL&quot; 1"
                    >star</span
                  >
                </div>
                <h4 class="font-label-md text-label-md text-on-surface mb-xs">
                  API Documentation
                </h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">
                  Updating the public API docs for the v2.4 release next week.
                </p>
                <div class="mt-md flex items-center justify-between">
                  <img
                    class="w-6 h-6 rounded-full border-2 border-surface"
                    data-alt="Minimalist avatar placeholder of a professional team member. Professional and clean styling consistent with a high-end SaaS platform interface."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG8Jxa-wc0IqXzwH5Eb-olQWjFfMH6FQefHNg8x204_qA5sVV-TBUkIl8wK1XSgpI1pH94oGq5yB9UyZeJy-d3z2R12xUy54PTHs5JoHE30eaqCX5BeKws1PCMN0TntyKW0UPojlBnG1xGY4-UQTrCOIhR7cF_zb7rj-vnemMaZQM9Xzk-F73_Q6MYD0msF1j-Tkjyrn2XQvujydcVmhnZnMOGv6P1Ep9OaJYUghQE93UdvLGAJptOXzhk3FK3LGn988gRhSTXAiBu"
                  />
                  <span
                    class="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1"
                  >
                    <span
                      class="material-symbols-outlined text-sm"
                      data-icon="hourglass_empty"
                      >hourglass_empty</span
                    >
                    Today
                  </span>
                </div>
              </div>
              
            </div>
          </div>
          <!-- Column: In Review -->
          <div class="kanban-column flex flex-col w-1/4 h-full">
            <div class="flex items-center justify-between mb-md">
              <div class="flex items-center gap-2">
                <h3 class="font-title-sm text-title-sm text-on-surface">
                  In Review
                </h3>
                <span
                  class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                  >2</span
                >
              </div>
              <button
                class="material-symbols-outlined text-outline"
                data-icon="more_horiz"
              >
                more_horiz
              </button>
            </div>
            <div
              class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"
            >
              <!-- Card 5 -->
              <div
                class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm"
              >
                <div class="flex items-start justify-between mb-xs">
                  <span
                    class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                    >Product</span
                  >
                </div>
                <h4 class="font-label-md text-label-md text-on-surface mb-xs">
                  Pricing Tier Update
                </h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">
                  Final sign-off required for the Enterprise plan structural
                  changes.
                </p>
                <div class="mt-md flex items-center justify-between">
                  <img
                    class="w-6 h-6 rounded-full border-2 border-surface"
                    data-alt="Minimalist avatar placeholder of a professional team member. Professional and clean styling consistent with a high-end SaaS platform interface."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Vu2ZnV9zSVRIelpzQ9amly66nlIkf_hJZwjhj7loegVGyfEHMFSWOJd7a4ftY1xvKEUKql_RlDEhIorY3iEExKQ3oyKA6tsjkbHDqFMtJcFqJKgAbe0alXefStzQsQXrgpEHlRCrRYRcaEgYnuhw4x4MpYTN0A3-5dhUwPK16VDXdrVBrG7Wdy0cvHSlsKrhsEhrzV6e7CZmwIlerakMp9mXRiGpyBPZffa2tSwPBwXkfTGgOV7GWkUlE5EWX5I6U2-iyX2oE9VH"
                  />
                  <button
                    class="text-primary font-label-sm text-label-sm hover:underline"
                  >
                    Review now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Column: Done -->
          <div class="kanban-column flex flex-col w-1/4 h-full">
            <div class="flex items-center justify-between mb-md">
              <div class="flex items-center gap-2">
                <h3 class="font-title-sm text-title-sm text-on-surface">
                  Done
                </h3>
                <span
                  class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                  >2</span
                >
              </div>
              <button
                class="material-symbols-outlined text-outline"
                data-icon="more_horiz"
              >
                more_horiz
              </button>
            </div>
            <div
              class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"
            >
              <!-- Card 7 -->
              <div
                class="task-card bg-surface/60 border border-outline-variant rounded-xl p-md shadow-sm opacity-80"
              >
                <div class="flex items-start justify-between mb-xs">
                  <span
                    class="bg-secondary-container text-secondary px-2 py-0.5 rounded-full font-label-sm text-label-sm"
                    >Ops</span
                  >
                  <span
                    class="material-symbols-outlined text-tertiary-container text-sm"
                    data-icon="check_circle"
                    data-weight="fill"
                    style="font-variation-settings: &quot;FILL&quot; 1"
                    >check_circle</span
                  >
                </div>
                <h4
                  class="font-label-md text-label-md text-on-surface mb-xs line-through"
                >
                  Workspace Setup
                </h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">
                  Configured the new Riwiflow cloud environment for the dev
                  team.
                </p>
                <div class="mt-md flex items-center justify-between">
                  <img
                    class="w-6 h-6 rounded-full border-2 border-surface"
                    data-alt="Minimalist avatar placeholder of a professional team member. Professional and clean styling consistent with a high-end SaaS platform interface."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgjRL3m9DHF3YGZ9L7qA_RcRJPl4umqaWvmn8arqMVJ62uiqUkJLSwHe5p-eaqCLo2yZSC4LVLo0cbslDO3gcIK6PqLe382tdnXjbBpDC6FkUXpP3XZlkU75S0wbUMtAOqn4xdMtT87viPtxakZDhZJB8YUFPAaxX0mnjg8Z_qUthkBqjcZGc0U4-VBiMlJlnbXt_YH2yhQtZBeACrGwzPWtArKfQMb4xchwCfOiP7UGAO2E4ImwtikNOs-_QPmx-LM1ef1p5cMHam"
                  />
                  <span class="font-label-sm text-label-sm text-outline"
                    >Completed</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</html>`
  },

  async mounted(){
    const res = await fetch(`${apiUrl}/tasks`);
    const data = await res.json();

    this.tasks = data;

    console.log("TASKS:", this.tasks);
  },

}