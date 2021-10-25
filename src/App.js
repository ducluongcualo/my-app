
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './component/Home'
import Add from './component/Add';
import Edit from './component/Edit'
import Header from './component/Header';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/add" component={Add} />
      <Route path="/edit" component={Edit} />
      <Route path="/header" component={Header} />
    </Router>
  );
}

export default App;
