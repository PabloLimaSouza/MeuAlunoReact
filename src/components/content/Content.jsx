import React from "react";
import "./sass/styles.css";
import { Switch, Route } from "react-router-dom";
import CadastroAluno from "../../views/Aluno/CadastroAluno";
import Alunos from "../../views/Aluno/Alunos";
import Menu from "../menu/Menu";
import Header from "./Header";
import CadastroServico from "../../views/Servico/CadastroServico";
import Servicos from "../../views/Servico/Servicos";
import CadastroMateria from "../../views/Materia/CadastroMateria";
import Materias from "../../views/Materia/Materias";
import Aulas from "../../views/Aula/Aulas";
import CadastroAula from "../../views/Aula/CadastroAula";
import Empresas from "../../views/Empresa/Empresa";
import CadastroEmpresa from "../../views/Empresa/CadastroEmpresa";
import Financeiros from "../../views/Financeiro/Financeiros";
import CadastroFinanceiro from "../../views/Financeiro/CadastroFinanceiro";
import CadastroUsuario from "../../views/Usuario/CadastroUsuario";
import Usuarios from "../../views/Usuario/Usuarios";
import Home from "../../views/Home/Home";
import CadastroContrato from "../../views/Contratos/CadastroContrato";
import Contratos from "../../views/Contratos/Contratos";
import UserThumb from "../user/UserThumb";

const Content = (props) => (  
  <div className="rf-page__default">    
    <div className="rf-menu">
      <UserThumb/>
      <Menu/>
    </div>   
    <div className="rf-body">
      <div className="rf-header"><Header/></div>   
      <div className="rf-wid-100">      
      <Switch>
              <Route path="/cadastroAluno" component={CadastroAluno} />
              <Route path="/alunos" component={Alunos} />
              <Route path="/cadastroServico" component={CadastroServico}/>
              <Route path="/servicos" component={Servicos}/>
              <Route path="/cadastroMateria" component={CadastroMateria}/>
              <Route path="/materias" component={Materias}/>
              <Route path="/aulas" component={Aulas}/>
              <Route path="/cadastroAula" component={CadastroAula}/>
              <Route path="/empresas" component={Empresas}/>
              <Route path="/cadastroEmpresa" component={CadastroEmpresa}/>
              <Route path="/financeiros" component={Financeiros}/>
              <Route path="/cadastroFinanceiro" component={CadastroFinanceiro}/>
              <Route path="/usuarios" component={Usuarios}/>
              <Route path="/cadastroUsuario" component={CadastroUsuario}/>
              <Route path="/cadastroContrato" component={CadastroContrato}/>
              <Route path="/contratos" component={Contratos}/>
              <Route path="/" component={Home}/>
              
      </Switch>
      </div>   
      <div className="rf-footer">Todos direitos reservados @ 2021</div>   
    </div>
  </div>
);

export default Content;
