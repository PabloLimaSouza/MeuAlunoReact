import React, { useContext, useState, useEffect } from "react";
import {
  Formik,
  Field,
  Form,
  useFormik,
  FieldArray,
  getActiveElement,
} from "formik";
import { useFetch } from "../../hooks/useFetch";
import StoreContext from "../../contexts/StoreContext";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { purple } from "@material-ui/core/colors";
import { findAllByAltText } from "@testing-library/dom";
import { format } from 'date-fns';

function CadastroAluno() {
  const { token } = useContext(StoreContext);

  const materiasUrl = `https://localhost:44389/api/materia/${token.empresaId}`;
  const materiasResponse = useFetch(materiasUrl);

  const servicosUrl = `https://localhost:44389/api/servicoPorEmpresa/${token.empresaId}`;
  const servicosResponse = useFetch(servicosUrl);

  const editarAlunoId = window.location.pathname.split("/");
  var editarAlunoUrl = "";

  if (editarAlunoId[2] != null) {
    editarAlunoUrl = `https://localhost:44389/api/aluno/${editarAlunoId[2]}`;
  }

  const alunoResponse = useFetch(editarAlunoUrl);
  const [loading, setLoading] = useState(true);
  const [checked,setChecked] = useState(false);
  
 

  const initialValues = {
    Id: "",
    Nome: "",
    DataNascimento: "",
    Serie: "",
    NomeResponsavel: "",
    CPFResponsavel: "",
    TelefoneResponsavel: "",
    EmailResponsavel: "",
    Escola: "",
    Endereco: {
      Logradouro: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      Estado: "",
      CEP: "",
    },
    EmpresaId: 1002,
    ServicoId: "",
    MateriaAlunos: [],
  };

  const [values, setValues] = useState(initialValues);

  useEffect(
    function () {
      if (alunoResponse.data != null) {
        setLoading(false);
     
        var materias = []
        alunoResponse.data.materiaAlunos.map((materia => (
          materias.push({MateriaId: materia.materiaId})
        )))
        
        setValues((prevState) => ({
          Id: alunoResponse.data.id,
          Nome: alunoResponse.data.nome,
          DataNascimento: format(new Date(alunoResponse.data.dataNascimento), 'yyyy-MM-dd'),
          Serie: alunoResponse.data.serie,
          Escola: alunoResponse.data.escola,
          NomeResponsavel: alunoResponse.data.nomeResponsavel,
          CPFResponsavel: alunoResponse.data.cpfResponsavel,
          TelefoneResponsavel: alunoResponse.data.telefoneResponsavel,
          EmailResponsavel: alunoResponse.data.emailResponsavel,
          Endereco: {
            Logradouro: alunoResponse.data.endereco.logradouro,
            Numero: alunoResponse.data.endereco.numero,
            Complemento: alunoResponse.data.endereco.complemento,
            Bairro: alunoResponse.data.endereco.bairro,
            Cidade: alunoResponse.data.endereco.cidade,
            Estado: alunoResponse.data.endereco.estado,
            CEP: alunoResponse.data.endereco.cep,
          },
          ServicoId: alunoResponse.data.servicoId,
          EmpresaId: alunoResponse.data.empresaId,
          MateriaAlunos: materias,
        }));        
      }
    },
    [alunoResponse]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: e.target.value });
  };

  const handleEndereco = (e) => {
    const { name, value } = e.target;
    const Endereco = { ...values.Endereco };

    if (name == "Logradouro") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Logradouro") Endereco[key] = value;
      });
    } else if (name == "Numero") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Numero") Endereco[key] = value;
      });
    } else if (name == "Complemento") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Complemento") Endereco[key] = value;
      });
    } else if (name == "Bairro") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Bairro") Endereco[key] = value;
      });
    } else if (name == "Cidade") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Cidade") Endereco[key] = value;
      });
    } else if (name == "Estado") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Estado") Endereco[key] = value;
      });
    } else if (name == "CEP") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "CEP") Endereco[key] = value;
      });
    } 

    setValues({ ...values, Endereco });
  };

  const handleMateria = (e) => {
    const { name, value, checked } = e.target;    

    var MateriaAlunos = [...values.MateriaAlunos]; //matérias que tem atualmente
    console.log(MateriaAlunos);
    console.log(MateriaAlunos.length);
    const materiaIdIndex = value.search("id");
    console.log(materiaIdIndex);
    const index = value.substring(6, materiaIdIndex - 1);

    const materiaId = value.substring(materiaIdIndex + 3);

    var newValues = "";

    //se desmarcar checkbox da matéria
    if (checked === false){
       //se encontrar materiaId no array, faz filter e tira
      MateriaAlunos = MateriaAlunos.filter((n) => n.MateriaId != materiaId);
      setValues({ ...values, MateriaAlunos });
    }

    //se marcar checkbox da matéria
        if (checked === true){
    //adiciona materia no array
          MateriaAlunos.push({ MateriaId: materiaId });
          setValues({ ...values, MateriaAlunos });
       } 

        // //se nao existir nenhuma materia adicionada - BACKUP
        // if (MateriaAlunos.length === 0) {
        //   MateriaAlunos.push({ MateriaId: materiaId });
        //   setValues({ ...values, MateriaAlunos });
        //   console.log("entrei");
        // } 
        // // se existir
        // else if (MateriaAlunos.length > 0) {
        //   newValues = MateriaAlunos.filter((n) => n.MateriaId === materiaId);
        //   if (newValues.length > 0) {
        //     //se encontrar materiaId no array, faz filter e tira
        //     MateriaAlunos = MateriaAlunos.filter((n) => n.MateriaId != materiaId);
        //     setValues({ ...values, MateriaAlunos });
        //   } else {
        //     //se nao encontrar materiaId no array, da um push
        //     MateriaAlunos.push({ MateriaId: materiaId });
        //     setValues({ ...values, MateriaAlunos });
        //   }
        // }
  };

  function checkMateria(id){
    var checkMateria = [...values.MateriaAlunos]    
    var matIds = []
    checkMateria.map((mat,i) => (
      matIds.push(Object.values(mat))
    ))      
    if( matIds.find(e => e == id) ){  
      return true
    } else    
    return false    
  }

  function handleSubmit(e) {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
    console.log(values);
    e.preventDefault();

    const response = fetch(`https://localhost:44389/api/aluno/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response == "Aluno Cadastrado") {
          console.log("Deu bom");
          console.log(response);
        } else {
          console.log("Deu ruim");
        }
      });
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.titulo}>
            <h1>Cadastro de Aluno</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Dados do Aluno</h4>
                  <Divider />
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Nome"
                  name="Nome"
                  label="Nome Aluno"
                  fullWidth
                  onChange={handleChange}
                  value={values.Nome}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="DataNascimento"
                  name="DataNascimento"
                  label="Data Nascimento"
                  type="date"
                  onChange={handleChange}
                  value={values.DataNascimento}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Serie"
                  name="Serie"
                  label="Serie"
                  onChange={handleChange}
                  value={values.Serie}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Escola"
                  name="Escola"
                  label="Escola"
                  onChange={handleChange}
                  value={values.Escola}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="NomeResponsavel"
                  name="NomeResponsavel"
                  label="Nome Responsável"
                  fullWidth
                  onChange={handleChange}
                  value={values.NomeResponsavel}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="CPFResponsavel"
                  name="CPFResponsavel"
                  label="CPF"
                  onChange={handleChange}
                  value={values.CPFResponsavel}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="TelefoneResponsavel"
                  name="TelefoneResponsavel"
                  label="Telefone"
                  onChange={handleChange}
                  value={values.TelefoneResponsavel}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="EmailResponsavel"
                  name="EmailResponsavel"
                  label="E-mail"
                  onChange={handleChange}
                  value={values.EmailResponsavel}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Endereço</h4>
                  <Divider />
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Endereco.Logradouro"
                  name="Logradouro"
                  onChange={handleEndereco}
                  value={values.Endereco.Logradouro}
                  label="Logradouro"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  id="Endereco.Numero"
                  name="Numero"
                  label="Nº"
                  onChange={handleEndereco}
                  value={values.Endereco.Numero}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Endereco.Complemento"
                  name="Complemento"
                  label="Complemento"
                  onChange={handleEndereco}
                  value={values.Endereco.Complemento}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Cidade"
                  name="Cidade"
                  label="Cidade"
                  onChange={handleEndereco}
                  value={values.Endereco.Cidade}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Bairro"
                  name="Bairro"
                  onChange={handleEndereco}
                  value={values.Endereco.Bairro}
                  label="Bairro"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Estado"
                  name="Estado"
                  label="Estado"
                  onChange={handleEndereco}
                  value={values.Endereco.Estado}
                  fullWidth
                  select
                >
                  <MenuItem value="AC">Acre</MenuItem>
                  <MenuItem value="AL">Alagoas</MenuItem>
                  <MenuItem value="AP">Amapá</MenuItem>
                  <MenuItem value="AM">Amazonas</MenuItem>
                  <MenuItem value="BA">Bahia</MenuItem>
                  <MenuItem value="CE">Ceará</MenuItem>
                  <MenuItem value="DF">Distrito Federal</MenuItem>
                  <MenuItem value="ES">Espírito Santo</MenuItem>
                  <MenuItem value="GO">Goiás</MenuItem>
                  <MenuItem value="MA">Maranhão</MenuItem>
                  <MenuItem value="MT">Mato Grosso</MenuItem>
                  <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                  <MenuItem value="MG">Minas Gerais</MenuItem>
                  <MenuItem value="PA">Pará</MenuItem>
                  <MenuItem value="PB">Paraíba</MenuItem>
                  <MenuItem value="PR">Paraná</MenuItem>
                  <MenuItem value="PE">Pernambuco</MenuItem>
                  <MenuItem value="PI">Piauí</MenuItem>
                  <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                  <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                  <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                  <MenuItem value="RO">Rondônia</MenuItem>
                  <MenuItem value="RR">Roraima</MenuItem>
                  <MenuItem value="SC">Santa Catarina</MenuItem>
                  <MenuItem value="SP">São Paulo</MenuItem>
                  <MenuItem value="SE">Sergipe</MenuItem>
                  <MenuItem value="TO">Tocantins</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.CEP"
                  name="CEP"
                  label="CEP"
                  onChange={handleEndereco}
                  value={values.Endereco.CEP}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Matérias</h4>
                  <Divider />
                </div>
              </Grid>

              {/* <Grid item xs={12}>
                { 
                materiasResponse.data ? 
                (
                materiasResponse.data.map((mat, j) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={`MateriaAlunos${[]}.MateriaId`}
                        onChange={handleMateria}
                        //onChange={(e) => handleMateria(e)}
                        value={`index:${j},id:${mat.id}`}
                        checked={checkMateria(mat.id)}                        
                      />
                    }
                    label={mat.nome}
                  />
                ))) : false             
                  }
              </Grid> */}

              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Serviço Contratado</h4>
                  <Divider />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Select
                  id="Servico"
                  label="Servico Contratado"
                  onChange={handleChange}
                  name="ServicoId"
                  value={values.ServicoId}
                  
                >
                  {servicosResponse.data ? (
                    
                      servicosResponse.data.map((serv) => (
                        <MenuItem value={serv.id}>
                          {serv.descricao + " - Valor: R$" + serv.valor}
                        </MenuItem>
                      ))) : false
                  }
                </Select>
              </Grid>
            </Grid>
            <div classname={classes.buttons}>
              <Button
                variant="contained"
                color="inherit"
                className={classes.button}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default CadastroAluno;
