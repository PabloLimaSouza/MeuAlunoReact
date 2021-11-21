import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../contexts/StoreContext";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  Divider,
  Switch,
  FormLabel,
} from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { MenuItem } from "@material-ui/core";
import { format } from "date-fns";

function CadastroEmpresa() {
  var editarEmpresaUrl = "";
  const editarEmpresaId = window.location.pathname.split("/");
  if (editarEmpresaId[2] != null) {
    editarEmpresaUrl = `https://localhost:44389/api/empresa/${editarEmpresaId[2]}`;
  }

  const empresaResponse = useFetch(editarEmpresaUrl);
  const [loading, setLoading] = useState(true);

  const person = { Nome: "", Telefone: "" };
  const [disableFields, setDisable] = useState(false);

  const initialValues = {
    Id: 0,
    TipoEmpresa: "",
    UsarDados: false,
    CNPJ_CPF: "",
    RazaoSocial: "",
    Telefone: "",
    Endereco: {
      Logradouro: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      Estado: "",
      CEP: "",
    },
    Pessoas: [person],
  };

  const [values, setValues] = useState(initialValues);

  //atualizar campos do form quando é para editar empresa  
  useEffect(
    function () {
      if (empresaResponse.data != null) {
        setValues((prevState) => ({
          Id: empresaResponse.data.id,
          TipoEmpresa: empresaResponse.data.cnpJ_CPF.length < 12 ? "1" : "2",
          CNPJ_CPF: empresaResponse.data.cnpJ_CPF,
          RazaoSocial: empresaResponse.data.razaoSocial,
          Telefone: empresaResponse.data.telefone,
          Endereco: {
            Id: empresaResponse.data.endereco.id,
            Logradouro: empresaResponse.data.endereco.logradouro,
            Numero: empresaResponse.data.endereco.numero,
            Complemento: empresaResponse.data.endereco.complemento,
            Bairro: empresaResponse.data.endereco.bairro,
            Cidade: empresaResponse.data.endereco.cidade,
            Estado: empresaResponse.data.endereco.estado,
            CEP: empresaResponse.data.endereco.cep,
          },
          Pessoas: {
            Nome: empresaResponse.data.pessoas[0].nome,
            CPF: empresaResponse.data.pessoas[0].cpf,
            Email: empresaResponse.data.pessoas[0].email,
            DataNascimento: format(
              new Date(empresaResponse.data.pessoas[0].dataNascimento),
              "yyyy-MM-dd"
            ),
            Telefone: empresaResponse.data.pessoas[0].telefone,
          },
        }));
        setDisable(true);
      }
    },
    [empresaResponse]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: e.target.value });
    console.log({ name, value });
  };

  const handlePessoa = (e) => {
    const { name, value } = e.target;
    const Endereco = { ...values.Endereco };
    const Pessoa = { ...values.Pessoas };
    console.log(Pessoa);
    var pessoa = [
      {
        Nome: Pessoa[0].Nome,
        CPF: Pessoa[0].CPF,
        DataNascimento: Pessoa[0].DataNascimento,
        Email: Pessoa[0].Email,
        Telefone: Pessoa[0].Telefone,
      },
    ];

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
    } else if (name == "CPF") {
      pessoa[0].CPF = value;
    } else if (name == "Nome") {
      pessoa[0].Nome = value;
    } else if (name == "Telefone") {
      pessoa[0].Telefone = value;
    } else if (name == "Email") {
      pessoa[0].Email = value;
    } else if (name == "DataNascimento") {
      pessoa[0].DataNascimento = value;
    }

    setValues({ ...values, Endereco, Pessoas: pessoa });
  };

  const funcUsarDadosEmpresa = (e) => {
    const { name, checked } = e.target;
    const newPessoa = values;
    
    newPessoa.Pessoas = [{
      Nome: values.RazaoSocial,
      CPF: values.CNPJ_CPF,
      Telefone: values.Telefone,    
    }];
    setValues({...values, Pessoas: newPessoa});

    setValues({ ...values, [name]: e.target.checked });
    console.log(
      "handleCheckChange " +
        ">>name: " +
        e.target.name +
        " >>value: " +
        e.target.value +
        " >>checked: " +
        e.target.checked
    );
    console.log(values);
  };

  function handleSubmit(e) {
    console.log(editarEmpresaUrl);
    //limpar pessoa/usuario da empresa
    if (values.Id != 0) {
      const valuesToSubmit = values;
      valuesToSubmit.Pessoas = [];
      setValues({ ...values, valuesToSubmit });
    }

    alert("Sucess: \n\n" + JSON.stringify(values, null, 4));
    console.log(values);
    e.preventDefault();

    const response = fetch("https://localhost:44389/api/empresa/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (
          response == "Empresa cadastrada" ||
          response == "Empresa não cadastrada"
        ) {
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
            <h1>Cadastro de Empresa</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="TipoEmpresa"
                  name="TipoEmpresa"
                  label="Tipo"
                  select
                  fullWidth
                  value={values.TipoEmpresa}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Física</MenuItem>
                  <MenuItem value="2">Jurídica</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="RazaoSocial"
                  name="RazaoSocial"
                  label="Nome"
                  fullWidth
                  onChange={handleChange}
                  value={values.RazaoSocial}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="CNPJ_CPF"
                  name="CNPJ_CPF"
                  label={
                    values.TipoEmpresa == "1"
                      ? "CPF"
                      : values.TipoEmpresa == "2"
                      ? "CNPJ"
                      : "CNPJ OU CPF"
                  }
                  fullWidth
                  onChange={handleChange}
                  value={values.CNPJ_CPF}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Telefone"
                  name="Telefone"
                  label="Telefone"
                  fullWidth
                  onChange={handleChange}
                  value={values.Telefone}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Endereco.Logradouro"
                  name="Logradouro"
                  onChange={handlePessoa}
                  value={values.Endereco.Logradouro}
                  label="Endereço"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  id="Endereco.Numero"
                  name="Numero"
                  label="Nº"
                  onChange={handlePessoa}
                  value={values.Endereco.Numero}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Endereco.Complemento"
                  name="Complemento"
                  label="Complemento"
                  onChange={handlePessoa}
                  value={values.Endereco.Complemento}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Cidade"
                  name="Cidade"
                  label="Cidade"
                  onChange={handlePessoa}
                  value={values.Endereco.Cidade}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Bairro"
                  name="Bairro"
                  onChange={handlePessoa}
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
                  onChange={handlePessoa}
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
                  onChange={handlePessoa}
                  value={values.Endereco.CEP}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <br></br>
                <div className={classes.subtitulo}>
                  <h4>Dados Usuário</h4>
                  <Divider />
                </div>
                <Grid item xs={12} sm={4}>
                  <FormLabel>Usar dados da empresa?</FormLabel>

                  <Switch
                    color="primary"
                    name="UsarDados"
                    value={values.UsarDados}
                    checked={values.UsarDados}
                    disabled={disableFields}
                    onChange={funcUsarDadosEmpresa}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Pessoa.Nome"
                  name="Nome"
                  label="Nome"
                  fullWidth
                  disabled={disableFields}
                  onChange={handlePessoa}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    values.UsarDados ? values.RazaoSocial : values.Pessoas.Nome
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="Pessoa.CPF"
                  name="CPF"
                  label="CPF"
                  fullWidth
                  disabled={disableFields}
                  onChange={handlePessoa}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    values.UsarDados ? values.CNPJ_CPF : values.Pessoas.CPF
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Pessoa.DataNascimento"
                  name="DataNascimento"
                  label="Data Nascimento"
                  type="date"
                  onChange={handlePessoa}
                  disabled={disableFields}
                  value={values.Pessoas.DataNascimento}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Pessoa.Email"
                  name="Email"
                  label="E-mail"
                  disabled={disableFields}
                  fullWidth
                  onChange={handlePessoa}
                  value={values.Pessoas.Email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  id="Pessoa.Telefone"
                  name="Telefone"
                  label="Telefone"
                  disabled={disableFields}
                  fullWidth
                  onChange={handlePessoa}
                  value={
                    values.UsarDados ? values.Telefone : values.Pessoas.Telefone
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <div classname={classes.buttons}>
              <Button
                variant="contained"
                color="inherit"
                className={classes.button}
                disabled={disableFields}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                {disableFields ? "Alterar" : "Cadastrar"}
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default CadastroEmpresa;
