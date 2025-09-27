import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    if (title.trim()) {
      setTodos([...todos, { id: todos.length + 1, title, completed: false }]);
      setTitle("");
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div
      className="
        min-h-screen antialiased
        bg-gradient-to-br from-blue-50 to-indigo-100
        text-slate-900
        selection:bg-indigo-200 selection:text-slate-900
        dark:from-slate-950 dark:to-slate-900 dark:text-slate-100
        dark:selection:bg-indigo-700 dark:selection:text-white
        py-8 px-4
      "
    >
      <div className="mx-auto max-w-md md:max-w-xl lg:max-w-2xl">
        <div
          className="
            rounded-2xl border shadow-lg backdrop-blur-sm
            border-slate-200/60 bg-white/90 p-6 md:p-8
            dark:border-slate-800 dark:bg-slate-900/80
          "
        >
          <h1
            className="
              text-2xl sm:text-4xl md:text-5xl
              font-extrabold text-center leading-tight tracking-tight
              text-slate-900 dark:text-slate-100
              mb-6
            "
          >
            <span
              aria-hidden
              className="mr-2 text-3xl sm:text-4xl md:text-5xl align-[-0.15em] drop-shadow-sm select-none"
            >
              📝
            </span>
            <span
              className="
                inline-block
                bg-clip-text text-transparent
                bg-gradient-to-r from-sky-600 to-indigo-600
                dark:from-sky-400 dark:to-indigo-400
                break-keep
                sm:whitespace-nowrap
              "
            >
              Todoアプリ!
            </span>
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
            <label htmlFor="title" className="sr-only">
              新しいタスクを入力
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              placeholder="新しいタスクを入力..."
              aria-label="新しいタスクを入力"
              className="
                flex-1 rounded-xl border px-4 py-2
                bg-white text-slate-900 placeholder-slate-400
                caret-blue-600
                border-slate-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500
                dark:border-slate-700 dark:caret-indigo-400 dark:focus-visible:ring-indigo-400
              "
            />
            <button
              type="button"
              onClick={handleAddTodo}
              disabled={!title.trim()}
              className="
                inline-flex items-center justify-center
                rounded-xl px-5 py-2.5 text-sm font-semibold
                transition-colors duration-150 shadow-sm border

                bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                text-white border-blue-900/20

                dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:active:bg-indigo-300
                dark:text-slate-900 dark:border-indigo-900/10

                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-500 focus-visible:ring-offset-2
                dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900

                disabled:bg-blue-500 disabled:text-white
                disabled:hover:bg-blue-500/95 disabled:active:bg-blue-500
                dark:disabled:bg-indigo-500 dark:disabled:text-slate-900
                dark:disabled:hover:bg-indigo-500/95 dark:disabled:active:bg-indigo-500

                disabled:cursor-not-allowed disabled:shadow-none
              "
            >
              追加
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p className="text-lg">タスクがありません</p>
              <p className="text-sm">新しいタスクを追加してください</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
                    ${todo.completed
                      ? "bg-gray-50/70 border-gray-200 dark:bg-slate-800/60 dark:border-slate-700"
                      : "bg-white border-gray-300 hover:border-blue-300 dark:bg-slate-900/60 dark:border-slate-700 dark:hover:border-indigo-500/60"}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="
                      h-5 w-5
                      accent-blue-600 dark:accent-indigo-500
                    "
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center" aria-live="polite">
                完了済み: {todos.filter((todo) => todo.completed).length} /{" "}
                {todos.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
