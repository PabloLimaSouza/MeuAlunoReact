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
import { useEffect } from "react";

const Header = () => {
  const { token, setToken } = useContext(StoreContext);
  const { userLogged, setUserLogged } = useContext(StoreContext);

  const classes = useStyles();
  const history = useHistory();

  // useEffect(() => {
  // },[userLogged])

  if (token != null) {

    const showEmpresas = () => {
      return userLogged.empresa.map((emp) => (
        <MenuItem value={emp.id}>{emp.razaoSocial}</MenuItem>
      ));
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      var newEmpresa = userLogged.empresa.filter((emp) => (
        emp.id == value
      ))     
      setUserLogged({ ...userLogged, empresaId: newEmpresa[0].id, empresaNome: newEmpresa[0].razaoSocial })
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
            value={userLogged.empresaId}            
          >
            {userLogged.empresa.length > 0
              ? showEmpresas()
              : false}
          </Select>
        </FormControl>


        <label>Olá </label>
        <strong>{userLogged.pessoaNome}</strong>

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
