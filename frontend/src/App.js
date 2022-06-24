import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ExamplePage from './pages/Example';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import OverlayProvider from './context/OverlayContext';

const routes = [
  {
    path: ['/'],
    exact: true,
    component: ExamplePage,
  },

  {
    path: '/example',
    component: ExamplePage,
  },
];

function App() {
  return (
    <OverlayProvider>
      <Header />
      <Router>
        <SideBar />
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              {...route}
            />
          ))}
        </Switch>
      </Router>
      <ToastContainer />
    </OverlayProvider>
  );
}

export default App;
