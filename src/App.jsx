import { useState, useEffect } from "react";
import "./App.css";
import { apiFetch } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await apiFetch("http://localhost:8080/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await apiFetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: false }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        fetchTodos();
      }
    } catch (error) {
      console.error("登録に失敗しました:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiFetch(`http://localhost:8080/api/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error("削除に失敗しました:", error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const response = await apiFetch(
        `http://localhost:8080/api/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            completed: !todo.completed,
          }),
        },
      );
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error("更新に失敗しました:", error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#fffaf0",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(255, 182, 193, 0.2)",
        fontFamily: "sans-serif",
        color: "#555",
      }}
    >
      <h1
        style={{
          color: "#ffb6c1",
          textAlign: "center",
          marginBottom: "25px",
          letterSpacing: "2px",
        }}
      >
        やることリスト🐰
      </h1>

      {/* 登録 */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          border: "2px dashed #ffdab9",
        }}
      >
        <input
          type="text"
          placeholder="タイトルを入力してね"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: "10px",
            fontSize: "15px",
            borderRadius: "8px",
            border: "1px solid #ffd1dc",
            outline: "none",
            backgroundColor: "#fff0f5",
          }}
        />
        <textarea
          placeholder="詳細を入力してね"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "15px",
            borderRadius: "8px",
            border: "1px solid #ffd1dc",
            outline: "none",
            backgroundColor: "#fff0f5",
            resize: "vertical",
            minHeight: "60px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            fontSize: "16px",
            background: "#ffb7b2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ＋ 追加する
        </button>
      </form>

      {/* 一覧 */}
      <h2
        style={{
          color: "#b5ead7",
          borderBottom: "2px solid #b5ead7",
          paddingBottom: "5px",
        }}
      >
        📝 ToDo 一覧
      </h2>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "15px",
              padding: "15px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2f0cb",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <strong
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#aaa" : "#4a4a4a",
                fontSize: "18px",
              }}
            >
              {todo.title}
            </strong>
            <p style={{ margin: "8px 0", color: "#666" }}>{todo.description}</p>
            <small
              style={{
                display: "inline-block",
                marginBottom: "10px",
                padding: "2px 8px",
                borderRadius: "10px",
                backgroundColor: todo.completed ? "#e0ece4" : "#fff3cd",
                color: todo.completed ? "#2d6a4f" : "#856404",
              }}
            >
              状態: {todo.completed ? "完了 🌸" : "未完了 ⏳"}
            </small>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <button
                onClick={() => handleToggleComplete(todo)}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  backgroundColor: "#b5ead7",
                  border: "none",
                  borderRadius: "6px",
                  color: "#2d6a4f",
                  fontWeight: "bold",
                }}
              >
                {todo.completed ? "未完了に戻す" : "完了にする ✓"}
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                style={{
                  padding: "6px 12px",
                  background: "#ff9aa2",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                削除 🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
