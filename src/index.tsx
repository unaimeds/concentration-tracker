import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import "@/style.css";
import Home from "@/pages/Home";
import { NotFound } from "@/pages/_404";

export function App() {
    return (
        <LocationProvider>
            <main className="mx-auto flex flex-col py-12">
                <Router>
                    <Route path="/" component={Home} />
                    <Route default component={NotFound} />
                </Router>
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById("app"));
