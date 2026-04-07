import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import "./style.css";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import { NotFound } from "./pages/_404";

export function App() {
    return (
        <LocationProvider>
            <Header />
            <main>
                <Router>
                    <Route path="/" component={Home} />
                    <Route default component={NotFound} />
                </Router>
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById("app"));
