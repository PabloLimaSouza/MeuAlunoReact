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
      <div className="rf-header__content">
        <div className="rf-wid-auto --frow-center --fgap-10">
        <button className="rf-button-icon-color-client rf-icon-home" type="button" onClick={() => setToken(null)}></button>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  //className="header-select"
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
        </div>
        <div className="rf-wid-auto --frow-center --fgap-10">
          <div className="--frow-center --fgap-10">
              <p>Olá</p>
              <strong>{userLogged.pessoaNome}</strong>
          </div>
          <button className="rf-button-icon-color-9 rf-icon-enter" type="button" onClick={() => setToken(null)}></button>
        </div>
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
