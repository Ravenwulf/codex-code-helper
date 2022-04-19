import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
console.log("192.168.137.116:3000");
document.body.style.backgroundColor = "#353740"
export default function Home() {
  const [codeInput, setCodeInput] = useState("");
  const [instructInput, setInstructInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const LOADMSGS = ["Loading...", "Asking gpt3...", "Writing...", "Loading...", "Asking gpt3...", "Coding...", "Thinking...", "Pondering...", "Brainstorming...", "Googling...", "Researching...", "Executing gpt3 protocols...", "Consulting magic orb...", "Something went... Right!", "This may take a while, come back in 15 seconds."];
    const randLoadMsg = LOADMSGS[Math.ceil((Math.random()*LOADMSGS.length))]
    setResult(randLoadMsg);
    console.log(result);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput, instruction: instructInput }),
    });
    const data = await response.json();
    console.log(data.result);
    setResult(data.result);
    setCodeInput("");
    setInstructInput("");
  }

  return (
    <div>
      <Head>
        <title>editCodeTest</title>
        <link rel="icon" href="/Brainstorm.png" />
      </Head>

      <main className={styles.main}>
        <img src="/cog.png" className={styles.icon} />
        <h3>Code Edit</h3>
        <p>Code|Instructions</p>
        <form onSubmit={onSubmit}>
          <textarea
            name="code"
            placeholder='code'
            rows={15}
            cols={40}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <textarea
            name="instruct"
            placeholder='instruct'
            value={instructInput}
            onChange={(e) => setInstructInput(e.target.value)}
          />
          <input type="submit" value="Generate Code" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
