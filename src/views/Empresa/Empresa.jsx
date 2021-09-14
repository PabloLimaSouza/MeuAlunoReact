import { Button } from "@material-ui/core";
import React from "react";
import "./Empresas.css";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom'


function Empresa() {

    const url = "https://localhost:44389/api/empresa";
    const method = "get";
    const response = useFetch(url,method);
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