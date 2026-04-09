import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import "@/style.css";
import Home from "@/pages/Home";
import { NotFound } from "@/pages/_404";
import { Toaster } from "@/components/ui/sonner";

// TODO: make it SPA vro
export function App() {
    return (
        <LocationProvider>
            <main className="mx-auto flex flex-col pt-20">
                <Router>
                    <Route path="/" component={Home} />
                    <Route default component={NotFound} />
                </Router>
            </main>
            <Toaster />
        </LocationProvider>
    );
}

render(<App />, document.getElementById("app"));
