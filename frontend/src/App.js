import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routes } from "./const";
import { MainLayout } from "./layouts";
import { Footer, Header, Sidebar } from "./components";

function App() {
  return (
    <MainLayout>
      <Header />
      <Router>
        <Sidebar />
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </Router>
      <Footer />
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
