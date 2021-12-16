import {
  MenuItem,
  Paper,
  TextField,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import React, { useContext } from "react";
import StoreContext from '../../contexts/StoreContext';
import useStyles from "../../views/Styles/useStyles";
import { useHistory } from "react-router";

const Header = () => {
  const { token, setToken } = useContext(StoreContext);

  const classes = useStyles();
  const history = useHistory();

  if (token != null) {

    const showEmpresas = () => {
      return token.empresa.map((emp) => (
        <MenuItem value={emp.id}>{emp.razaoSocial}</MenuItem>
      ));
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      var newEmpresa = token.empresa.filter((emp) => (
        emp.id == value
      ))     
      setToken({ ...token, empresaId: newEmpresa[0].id, empresaNome: newEmpresa[0].razaoSocial })
      history.push('/');      
    }

    return (
      <div className="Header" >

        <label>Empresa</label>
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <Select
            className="header-select"
            labelId="empresaNome"
            id="empresaNome"
            name="empresaNome"
            onChange={handleChange}
            label="Empresa"
            value={token.empresaId}            
          >
            {token.empresa.length > 0
              ? showEmpresas()
              : false}
          </Select>
        </FormControl>


        <label>Olá </label>
        <strong>{token.pessoaNome}</strong>

        <button type="button" onClick={() => setToken(null)}>Sair</button>
      </div>
    )
  }
  else {
    return (
      <></>
    )
  }
};

export default Header;
