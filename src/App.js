
import Home from "./components/Home"
import Error from "./components/Error"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import DetailCard from "./components/DetailCard"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/detail/:id' component={DetailCard}></Route>
        <Route component={Error}></Route>
      </Switch>
    </Router>
  )
}

export default App;
