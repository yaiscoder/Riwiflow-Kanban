import { router } from "../router";
import { getSession, clearSession, isAdmin } from "../functions/auth";
import { getTasks, createTask, updateTask, getUsers } from "../api/api";

const COLUMNS = [
  { id: 'todo',        label: 'To Do' },
  { id: 'in progress', label: 'In Progress' },
  { id: 'in review',   label: 'In Review' },
  { id: 'done',        label: 'Done' }
];

export const boardPage = {
  tasks: [],
  users: [],

  render() {
    const user = getSession();

    return `
    <div class="bg-background text-on-background h-screen flex overflow-hidden">

      <!-- Sidebar -->
      <aside class="hidden md:flex flex-col pt-md pb-xl gap-xs h-full bg-surface-container-low border-r border-outline-variant w-[260px] shrink-0">
        <div class="px-gutter mb-xl">
          <h1 class="font-headline-md text-headline-md font-bold text-primary">Riwiflow</h1>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Product Team</p>
        </div>
        <nav class="flex-1 space-y-1">
          <a class="flex items-center bg-primary-fixed text-on-primary-fixed-variant rounded-lg mx-2 px-4 py-3 font-body-sm" href="#">
            <span class="material-symbols-outlined mr-3">dashboard</span>
            Dashboard
          </a>
        </nav>
        <div class="px-4 mt-auto space-y-2">
          ${isAdmin() ? `
          <button id="openCreateModal"
            class="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span class="material-symbols-outlined">add</span>
            New Task
          </button>` : ''}

          <div class="flex items-center justify-between bg-surface-container rounded-xl px-4 py-3">
            <div>
              <p class="font-label-md text-label-md text-on-surface">${user?.name || 'User'}</p>
              <p class="font-body-sm text-body-sm text-on-surface-variant capitalize">${user?.role || ''}</p>
            </div>
            <button id="logoutBtn" class="material-symbols-outlined text-outline hover:text-error transition-colors" title="Logout">
              logout
            </button>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="flex-1 flex flex-col min-w-0">
        <header class="flex justify-between items-center h-16 px-gutter bg-surface border-b border-outline-variant z-40">
          <h2 class="font-headline-md text-headline-md text-on-surface">Kanban Board</h2>
          <div class="flex items-center gap-3">
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              <strong>${user?.name}</strong>
              <span class="ml-1 bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full text-xs capitalize">${user?.role}</span>
            </span>
          </div>
        </header>

        <!-- Columns -->
        <div class="flex-1 overflow-x-auto p-gutter">
          <div class="flex gap-gutter h-full min-w-[800px]">
            ${COLUMNS.map(col => `
            <div class="flex flex-col w-1/4 h-full">
              <div class="flex items-center justify-between mb-md">
                <div class="flex items-center gap-2">
                  <h3 class="font-title-sm text-title-sm text-on-surface">${col.label}</h3>
                  <span id="count-${col.id}" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
                </div>
              </div>
              <div id="col-${col.id}" class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto">
                <p class="text-center text-on-surface-variant font-body-sm py-4">Loading...</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </main>

      <!-- ══ MODAL: CREATE TASK (solo admin) ══ -->
      <div id="createModal" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant w-full max-w-md p-xl shadow-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-lg">New Task</h2>

          <form id="createTaskForm" class="space-y-lg" onsubmit="return false;">

            <div class="space-y-sm">
              <label class="font-label-md text-label-md text-on-surface" for="newTitle">Title</label>
              <input id="newTitle" name="newTitle" type="text" required
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Task title" />
            </div>

            <div class="space-y-sm">
              <label class="font-label-md text-label-md text-on-surface" for="newDesc">Description</label>
              <textarea id="newDesc" name="newDesc" rows="3" required
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Task description"></textarea>
            </div>

            <div class="space-y-sm">
              <label class="font-label-md text-label-md text-on-surface" for="newUserId">Assign to</label>
              <select id="newUserId" name="newUserId" required
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                <option value="">Select a user...</option>
              </select>
            </div>

            <div id="createFormError" class="hidden">
              <p class="text-sm text-red-600 bg-red-50 border border-red-200 px-md py-sm rounded-lg">
                Please fill in all fields.
              </p>
            </div>

            <div class="flex gap-md pt-sm">
              <button type="button" id="cancelCreate"
                class="flex-1 border border-outline-variant text-on-surface py-md rounded-lg font-label-md hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button type="submit"
                class="flex-1 bg-primary text-on-primary py-md rounded-lg font-label-md hover:opacity-90 transition-opacity">
                Create Task
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- ══ MODAL: EDIT TASK ══ -->
      <div id="editModal" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant w-full max-w-md p-xl shadow-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-lg">Edit Task</h2>

          <form id="editTaskForm" class="space-y-lg" onsubmit="return false;">
            <input type="hidden" id="editTaskId" />

            <div class="space-y-sm" id="editTitleRow">
              <label class="font-label-md text-label-md text-on-surface" for="editTitle">Title</label>
              <input id="editTitle" name="editTitle" type="text"
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:bg-surface-container"
                placeholder="Task title" />
            </div>

            <div class="space-y-sm">
              <label class="font-label-md text-label-md text-on-surface" for="editDesc">Description</label>
              <textarea id="editDesc" name="editDesc" rows="3"
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Task description"></textarea>
            </div>

            <div class="space-y-sm">
              <label class="font-label-md text-label-md text-on-surface" for="editStatus">Status</label>
              <select id="editStatus" name="editStatus"
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                ${COLUMNS.map(c => `<option value="${c.id}">${c.label}</option>`).join('')}
              </select>
            </div>

            <div class="space-y-sm hidden" id="editUserRow">
              <label class="font-label-md text-label-md text-on-surface" for="editUserId">Assign to</label>
              <select id="editUserId" name="editUserId"
                class="w-full px-md py-md border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              </select>
            </div>

            <div class="flex gap-md pt-sm">
              <button type="button" id="cancelEdit"
                class="flex-1 border border-outline-variant text-on-surface py-md rounded-lg font-label-md hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button type="submit"
                class="flex-1 bg-primary text-on-primary py-md rounded-lg font-label-md hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>`;
  },

  async mounted() {
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      clearSession();
      history.pushState(null, null, '/');
      router();
    });

    // Cargar datos
    try {
      [this.tasks, this.users] = await Promise.all([getTasks(), getUsers()]);
    } catch (err) {
      console.error('Error loading data:', err);
    }

    this.renderBoard();
    this.setupCreateModal();
    this.setupEditModal();

    // Delegación de eventos: un solo listener para todos los botones Edit
    // Funciona aunque el board se re-renderice
    document.getElementById('app').addEventListener('click', (e) => {
      const btn = e.target.closest('.edit-task-btn');
      if (btn) {
        this.openEditModal(parseInt(btn.dataset.id));
      }
    });
  },

  renderBoard() {
    const user = getSession();

    COLUMNS.forEach(col => {
      const colEl = document.getElementById(`col-${col.id}`);
      const countEl = document.getElementById(`count-${col.id}`);
      const colTasks = this.tasks.filter(t => t.status === col.id);

      countEl.textContent = colTasks.length;

      if (colTasks.length === 0) {
        colEl.innerHTML = `<p class="text-center text-on-surface-variant font-body-sm py-8 opacity-60">No tasks</p>`;
        return;
      }

      colEl.innerHTML = colTasks.map(task => {
        const assignedUser = this.users.find(u => u.id === task.userId);
        // Admin puede editar todo; coder solo sus propias tareas
        const canEdit = user.role === 'admin' || task.userId === user.id;
        const isDone = task.status === 'done';

        return `
        <div class="bg-surface border border-outline-variant rounded-xl p-md shadow-sm ${isDone ? 'opacity-70' : ''}">
          <div class="flex items-start justify-between mb-xs">
            <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm capitalize">
              ${task.status}
            </span>
            ${isDone ? `<span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1; color:#6b3000;">check_circle</span>` : ''}
          </div>
          <h4 class="font-label-md text-label-md text-on-surface mb-xs ${isDone ? 'line-through' : ''}">${task.title}</h4>
          <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${task.description}</p>
          <div class="mt-md flex items-center justify-between">
            <span class="font-body-sm text-body-sm text-on-surface-variant">${assignedUser ? assignedUser.name : 'Unassigned'}</span>
            ${canEdit ? `
            <button class="edit-task-btn text-primary font-label-sm text-label-sm hover:underline" data-id="${task.id}">
              Edit
            </button>` : ''}
          </div>
        </div>`;
      }).join('');
    });

  },

  setupCreateModal() {
    if (!isAdmin()) return;

    const modal = document.getElementById('createModal');
    const form = document.getElementById('createTaskForm');
    const select = document.getElementById('newUserId');

    // Llenar el select de usuarios
    select.innerHTML = `<option value="">Select a user...</option>` +
      this.users.map(u => `<option value="${u.id}">${u.name} (${u.role})</option>`).join('');

    document.getElementById('openCreateModal')?.addEventListener('click', () => {
      form.reset();
      select.innerHTML = `<option value="">Select a user...</option>` +
        this.users.map(u => `<option value="${u.id}">${u.name} (${u.role})</option>`).join('');
      modal.classList.remove('hidden');
    });

    document.getElementById('cancelCreate').addEventListener('click', () => {
      modal.classList.add('hidden');
      form.reset();
    });

    form.addEventListener('submit', async () => {
      const title = document.getElementById('newTitle').value.trim();
      const description = document.getElementById('newDesc').value.trim();
      const userId = parseInt(document.getElementById('newUserId').value);

      if (!title || !description || !userId) {
        document.getElementById('createFormError').classList.remove('hidden');
        setTimeout(() => document.getElementById('createFormError').classList.add('hidden'), 2000);
        return;
      }

      try {
        const created = await createTask({ title, description, status: 'todo', userId });
        this.tasks.push(created);
        this.renderBoard();
        modal.classList.add('hidden');
        form.reset();
      } catch (err) {
        console.error('Error creating task:', err);
      }
    });
  },

  setupEditModal() {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editTaskForm');

    document.getElementById('cancelEdit').addEventListener('click', () => modal.classList.add('hidden'));

    form.addEventListener('submit', async () => {
      const id = parseInt(document.getElementById('editTaskId').value);
      const status = document.getElementById('editStatus').value;
      const description = document.getElementById('editDesc').value.trim();

      const updates = { status, description };

      if (isAdmin()) {
        updates.title = document.getElementById('editTitle').value.trim();
        updates.userId = parseInt(document.getElementById('editUserId').value);
      }

      try {
        const updated = await updateTask(id, updates);
        const idx = this.tasks.findIndex(t => t.id === id);
        if (idx !== -1) this.tasks[idx] = updated;
        this.renderBoard();
        modal.classList.add('hidden');
      } catch (err) {
        console.error('Error updating task:', err);
      }
    });
  },

  openEditModal(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById('editModal');

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDesc').value = task.description;
    document.getElementById('editStatus').value = task.status;

    if (isAdmin()) {
      document.getElementById('editTitle').disabled = false;
      document.getElementById('editUserRow').classList.remove('hidden');
      document.getElementById('editUserId').innerHTML = this.users.map(u =>
        `<option value="${u.id}" ${u.id === task.userId ? 'selected' : ''}>${u.name} (${u.role})</option>`
      ).join('');
    } else {
      // Coder: solo puede editar descripción y status
      document.getElementById('editTitle').disabled = true;
      document.getElementById('editUserRow').classList.add('hidden');
    }

    modal.classList.remove('hidden');
  }
};

export default boardPage;