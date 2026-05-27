const apiUrl = import.meta.env.VITE_API_URL;

export async function getUsers() {
  const res = await fetch(`${apiUrl}/users`);
  return res.json();
}

export async function getUserByCredentials(email, password) {
  const res = await fetch(`${apiUrl}/users?email=${email}&password=${password}`);
  return res.json();
}

export async function getTasks() {
  const res = await fetch(`${apiUrl}/tasks`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return res.json();
}

export async function updateTask(id, task) {
  const res = await fetch(`${apiUrl}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${apiUrl}/tasks/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}