import { render } from "preact";

import "@/style.css";
import Tracker from "@/components/Tracker";

export function App() {
    return (
        <main className="mx-auto flex w-full flex-col px-3 pt-20 sm:w-[min(80%,600px)]">
            <Tracker />
        </main>
    );
}

render(<App />, document.getElementById("app")!);
