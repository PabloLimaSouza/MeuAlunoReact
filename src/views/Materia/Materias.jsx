import React, { useContext } from "react";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom'
import "./Materias.css"
import { Button } from "@material-ui/core";
import useStyles from "../Styles/useStyles";

function Materias() {
  const { token } = useContext(StoreContext);

  const url = `https://localhost:44389/api/materiaPorEmpresa/${token.empresaId}`;
  const method = "get";
  const response = useFetch(url, method);

  const history = useHistory();

  const classes = useStyles();

  function novaMateria(){
    history.push("/cadastroMateria")
  }

  function editarMateria(id){
    history.push(`/cadastroMateria/${id}`)
  }

  function showMaterias(materias){
    return (
      materias.map((materia) => (
        <tr onClick={() => editarMateria(materia.id)}>
          <td key={materia.id}>{materia.id}</td>      
          <td key={materia.nome}>{materia.nome}</td>          
        </tr>
      ))   
    )
  }
  return (         
        <div className="lista-materias">
          <h1>Matérias</h1>
          <div className="btn-novo">
          <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novaMateria}
                className="btn-novo"                
              >
                Nova Matéria
              </Button>
          </div>
         
          <table id="materias">
            <tbody>
              <tr>
                <th>Id</th>                              
                <th>Nome</th>   
              </tr>
              {response.data ? showMaterias(response.data) : false}             
            </tbody>
          </table>
        </div>     
    
  );
}

export default Materias;
