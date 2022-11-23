import React, { useContext } from "react";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom'
import { Button } from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { url } from "../../../src/variaveis";
import CadastroContrato from "../Contratos/CadastroContrato";

function Contratos() {
  const { token, userLogged } = useContext(StoreContext);

  const history = useHistory();

  const classes = useStyles();

  function novaMateria(){
    history.push("/cadastroMateria")
  }

  function editarMateria(id){
    history.push(`/cadastroMateria/${id}`)
  }

  return (         
        <div className="lista-materias">
          <h1>Contrato Modelo</h1>         
          <CadastroContrato />
          
        </div>     
    
  );
}

export default Contratos;
