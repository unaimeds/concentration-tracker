import { render } from "preact";

import "@/style.css";
import Tracker from "@/components/Tracker";

export function App() {
    return (
        <main className="mx-auto flex flex-col pt-20">
            <Tracker />
        </main>
    );
}

render(<App />, document.getElementById("app"));
