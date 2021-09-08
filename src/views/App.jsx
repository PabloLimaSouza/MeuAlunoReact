import React from 'react'
import Menu from '../components/menu/Menu'
import Content from '../components/content/Content'
import './App.css'
import MenuItem from '../components/menu/MenuItem'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from '../views/Usuario/Login'
import Aluno from './Aluno/CadastroAluno'
import RoutesPrivate from '../components/Routes/Private/Private'
import StoreProvider from '../contexts/Provider'

const App = props => (   
    <div>
      <StoreProvider>
     <Router>
       <Switch>
       <Route path="/login" component={Login}/>          
       <RoutesPrivate path="/" component={Content}/>             
       </Switch>  
     </Router>       
     </StoreProvider>       
    </div>  

    
    
)

export default App
