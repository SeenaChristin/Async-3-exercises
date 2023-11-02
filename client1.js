async function fetchUsers() {
  try {
    const userDataPromises = await fetch("http://localhost:8000/users");
    const userData = await userDataPromises.json();
    return userData;
  } catch (error) {
    throw error;
  }
}

async function fetchTodos(userId) {
  try {
    const todoPromises = await fetch(
      `http://localhost:8000/todos?user_id=${userId}`
    );
    const todoData = await todoPromises.json();
    return todoData;
  } catch (error) {
    throw error;
  }
}

async function fetch5todos(currentId) {
  const todoPromises = [];
  for (let i = currentId; i < currentId + 5; i++) {
    todoPromises.push(fetchTodos(i));
  }

  const todos = await Promise.all(todoPromises);
  if (currentId == 1) {
    return todos;
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(todos);
      console.log("Fetched 5 todos ...");
    }, 5000);
  });
}

// Example usage:
async function main() {
  try {
    const data = await fetchUsers();
    let currentId = 1;
    while (currentId < data.users.length) {
      const todos = await fetch5todos(currentId);
      console.log("Todos:", JSON.stringify(todos));
      currentId += 5;
    }
  } catch (error) {
    console.error(error);
  }
}

main();
