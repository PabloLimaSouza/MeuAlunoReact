import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import "./Aulas.css"
import { url } from "../../../src/variaveis";


function Aulas() {
  const { token, userLogged } = useContext(StoreContext); 
  const response = useFetch(`${ url }/api/aulaPorEmpresa/${userLogged.empresaId}`, "get",token);

  const history = useHistory();

  function novaAula() {
    history.push("/cadastroaula");
  }

  function editarAula(id) {
    history.push(`/cadastroAula/${id}`);
  }

  
  function showAulas(aulas) {
    return aulas.map((aula) => (
      <tr onClick={() => editarAula(aula.id)}>
        <td>{aula.id}</td>  
        <td>{aula.dia}</td>
        <td>{aula.horaInicio}</td>
        <td>{aula.horaFim}</td>
        <td>{aula.vagas}</td>       
      </tr>
    ));
  }

  return (
    <div className="lista-aulas">
      <h1>Aulas</h1>
      <div className="btn-novo">
          <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novaAula}
                className="btn-novo"                
              >
                Nova Aula
              </Button>
          </div>
      <table id="aulas">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Dia</th>
            <th>Hora Inicio</th>
            <th>Hora Fim</th>
            <th>Vagas</th>           
          </tr>
          {response.data ? showAulas(response.data) : false}
          {console.log(response.data)}
        </tbody>
      </table>
    </div>
  );
}

export default Aulas;
