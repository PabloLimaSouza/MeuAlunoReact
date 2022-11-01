import { Button } from "@material-ui/core";
import React ,{ useContext } from "react";
import "./Empresas.css";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom';
import StoreContext from "../../contexts/StoreContext";
import { url } from "../../../src/variaveis";

function Empresa() {

    const { token } = useContext(StoreContext); 
    const response = useFetch(`${ url }/api/empresa`,"get",token);
    const history = useHistory(); 
    function editarEmpresa(id){
        history.push(`/cadastroEmpresa/${id}`)
    }

    function novaEmpresa(){
        history.push(`/cadastroEmpresa`)
    }

    function showEmpresas(empresas){
        return(           
            empresas.map((empresa) => (
                <tr onClick={() => editarEmpresa(empresa.id)}>
                    <td>{empresa.id}</td>
                    <td>{empresa.razaoSocial}</td>
                    <td>{empresa.cnpJ_CPF}</td>
                </tr>                
            ))
        )
    }

    return (
<div className="lista-empresas">
        <h1>Empresas</h1>
        <div className="btn-novo">
        <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novaEmpresa}
                className="btn-novo"                
              >
                Nova Empresa
              </Button>
        </div>

        <table id="empresas">
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>CNPJ</th>
                </tr>
                {response.data != null ? showEmpresas(response.data) : false}
            </tbody>
        </table>
</div>
    );
}

export default Empresa;