import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="min-h-screen grid place-content-center gap-6">
      <h1 className="text-3xl text-center font-bold">Welcome to Tauri!</h1>

      <div className="flex items-center justify-center gap-10">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="w-20" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="w-20" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="w-20" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="flex items-center justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter your name..."
          className="px-2 py-1 border rounded"
        />
        <button
          type="submit"
          className="px-2 py-1 rounded bg-green-500 text-white"
        >
          Greet
        </button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
