import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";
import { Button } from "@/components/ui/button"

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container mx-auto">
      <h1>OneKey HackerApk</h1>
      <div className="flex flex-col">
        <div>
          <Button onClick={greet}>Click Me</Button>
        </div>
        <div>{greetMsg}</div>
      </div>
    </div>
  );
}

export default App;
