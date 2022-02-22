import React, { useContext } from "react";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom'
import "./Materias.css"
import { Button } from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { url } from "../../../src/variaveis";

function Materias() {
  const { token, userLogged } = useContext(StoreContext);

  const response = useFetch(`${ url }/api/materiaPorEmpresa/${userLogged.empresaId}`,"get",token);

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
