import React from "react";
import "./Content.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CadastroAluno from "../../views/Aluno/CadastroAluno";
import Alunos from "../../views/Aluno/Alunos";
import Menu from "../menu/Menu";
import Login from "../../views/Usuario/Login";
import Header from "./Header";
import CadastroServico from "../../views/Servico/CadastroServico";
import Servicos from "../../views/Servico/Servicos";
import CadastroMateria from "../../views/Materia/CadastroMateria";
import Materias from "../../views/Materia/Materias";
import Aulas from "../../views/Aula/Aulas";
import CadastroAula from "../../views/Aula/CadastroAula";
import Empresas from "../../views/Empresa/Empresa";
import CadastroEmpresa from "../../views/Empresa/CadastroEmpresa";

const Content = (props) => (
  <div className="Geral"> 

  <div className="Header"><Header/></div>   
  <div className="Menu"><Menu/></div>   
  <div className="PaginaAtual">
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

        </Switch></div>   
  <div className="Footer">Todos direitos reservados @ 2021</div>   
 

     {/* <div className="Header">
      <Header />
    </div>
    <div className="Menu">
      <Menu/>
    </div> */}

    {/* <div className="Content">
      <Menu />

      <div className="paginaAtual">
        <Switch>
          <Route path="/cadastroAluno" component={Aluno} />
          <Route path="/alunos" component={Alunos} />
        </Switch>
      </div>
    </div>  */}
  </div>
);

export default Content;
