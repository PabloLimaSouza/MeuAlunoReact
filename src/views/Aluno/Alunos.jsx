import React, { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/StoreContext';
import { format } from 'date-fns';


import "./Alunos.css";
import { Button } from "@material-ui/core";

const Alunos = (props) => {
  const url = "https://localhost:44389/api/aluno";
  const method = 'get';
  const response = useFetch(url);
  const history = useHistory();
  const { token } = useContext(StoreContext); 
  console.log(token);

  function novoAluno(){
   history.push('/cadastroAluno');
  }

  function editarAluno(id){
    history.push(`/cadastroAluno/${id}`)
  }

  function showAlunos(alunos) {
    return (
        
        alunos.map((aluno) => (
            <tr onClick={() => editarAluno(aluno.id)}>
              <td key={aluno.id}>{aluno.id}</td>
              <td key={aluno.nome}>{aluno.nome}</td>
              <td key={aluno.dataNascimento}>{format(new Date(aluno.dataNascimento), 'dd/MM/yyyy')}</td>
              <td key={aluno.serie}>{aluno.serie}º</td>
              <td key={aluno.nomeResponsavel}>{aluno.nomeResponsavel}</td>
              <td key={aluno.cpfResponsavel}>{aluno.cpfResponsavel}</td>
              <td key={aluno.emailResponsavel}>{aluno.emailResponsavel}</td>
              <td key={aluno.telefoneResponsavel}>{aluno.telefoneResponsavel}</td>              
            </tr>
          ))
    )
  }

  return (
    <div className="lista-alunos">
      <h1>Alunos</h1>
      <div className="btn-novo">
          <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novoAluno}
                className="btn-novo"                
              >
                Novo Aluno
              </Button>
          </div>
      <table id="alunos">
        <tbody>
        <tr>
          <th>Id</th>
          <th>Aluno</th>
          <th>Idade</th>
          <th>Série</th>
          <th>Responsável</th>
          <th>CPF</th>
          <th>E-mail</th>
          <th>Telefone</th>
        </tr>
        {response.data ? showAlunos(response.data) : false}
        </tbody>
      </table>
    </div>
  );
};

export default Alunos;
