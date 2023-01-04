import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import "./Empresas.css";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom';
import StoreContext from "../../contexts/StoreContext";
import { url } from "../../../src/variaveis";

function Empresa() {

    const { token } = useContext(StoreContext);
    const response = useFetch(`${url}/api/v1/empresas`, "get", token);
    const history = useHistory();
    function editarEmpresa(id) {
        history.push(`/cadastroEmpresa/${id}`)
    }

    function novaEmpresa() {
        history.push(`/cadastroEmpresa`)
    }

    function showEmpresas(empresas) {
        return (
            empresas.map((empresa) => (
                <>
                    <tr onClick={() => editarEmpresa(empresa.id)}>
                        <td>{empresa.id}</td>
                        <td>{empresa.razaoSocial}</td>
                        <td>{empresa.cnpJ_CPF}</td>
                    </tr>
                    <tr><td className="--space"></td></tr>
                </>
            ))
        )
    }

    return (
        <div className="rf-wid-100">
            <div className="rf-wid-100 rf-page__title --frow-centerbetween">
                <h1 className="rf-icon-office">Empresas</h1>
                <a
                    type="submit"
                    onClick={novaEmpresa}
                    className="rf-button-color-client rf-icon-plus">
                    Nova Empresa
                </a>
            </div>
            <div className="rf-wid-100 rf-content">
                <div className="rf-box__content">
                    <table className="rf-wid-100 rf-table" id="empresas">
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
            </div>
        </div>
    );
}

export default Empresa;