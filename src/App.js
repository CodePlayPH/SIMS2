import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import CategoryContextProvider from './contexts/CategoryContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/home';
import Contexts from './contexts/Contexts';


import { headers } from './utils/utils';

function App() {
  window.$name = 'tester'
  return (
    <Contexts>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/access_register" component={Register} />
            <Route path="/home" component={Home} />
          </Switch>
        </BrowserRouter>
    </Contexts>
  );
}

export default App;
