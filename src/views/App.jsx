import React from 'react'
import Content from '../components/content/Content'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from '../views/Usuario/Login'
import CriarSenha from "../views/Usuario/CriarSenha";
import RecuperarSenha from "../views/Usuario/RecuperarSenha";
import RoutesPrivate from '../components/Routes/Private/Private'
import StoreProvider from '../contexts/Provider'

const App = props => (   
    <div>
      <StoreProvider>
     <Router>
       <Switch>
       <Route path="/login" component={Login}/>
       <Route path="/criarSenha" component={CriarSenha} />    
       <Route path="/recuperarSenha" component={RecuperarSenha} />         
       <RoutesPrivate path="/" component={Content}/>             
       </Switch>  
     </Router>       
     </StoreProvider>       
    </div>  

    
    
)

export default App
