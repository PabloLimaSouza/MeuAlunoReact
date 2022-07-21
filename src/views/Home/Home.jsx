import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div>
            
            <h1>Notas de publicação - Versão atual: v09052022</h1>  
            <br/>
                <h2>Itens publicados: v14062022</h2>                     
            <ul>
                <li>Contratos - ajustar lista para enviar se cláusula está ativa ou não</li>
                <li>Contratos - editar cláusula na empresa específica</li>
                <li>Erro no valor do serviço não está enviando casas decimais</li>
                <li>Ajustar exibição do valor do serviço no cadastro e listagem</li>
                <li>Gravar somente numeros para CPF ou CNPJ da empresa</li>
                <li>Data de nascimento e e-mail do usuario no cadastro da empresa não sendo gravados corretamente</li>
                <li>Cadastro da empresa não muda campo CNPJ/CPF de acordo com o tipo física/jurídica</li>              
            </ul>

            <br/>
                <h2>Itens publicados: v09052022</h2>                     
            <ul>
                <li>Listar apenas empresa logada na criação de usuário</li>
                <li>Não atualizar lista de pessoas ao selecionar empresa na criação de usuário</li>   
                <li>Não tentar decodificar token quando o mesmo é nulo</li>               
            </ul>

            <br/>
                <h2>Itens publicados: v28032022</h2>                     
            <ul>
                <li>Bloquear botão login quando ainda não houve retorno do login</li>
                <li>Ícone de Loading quando está aguardando login</li> 
                <li>Mensagem quando tem erro ao realizar login</li>                  
            </ul>

            <br/>
                <h2>Itens publicados: v22022022</h2>                     
            <ul>
                <li>Menu contratos com listagem de cláusulas padrões</li>                
            </ul>
            
            <br/>
                <h2>Itens publicados: v17022022</h2>           
            <ul>
                <li>Erro ao cadastrar ou alterar matéria</li>
                <li>Exibir menu de acordo com tipo de usuário</li>
                <li>Listar somente empresas que usuário tem acesso</li>
            </ul>
            <br/>
            <h2>Itens em andamento:</h2>
            <ul>
                <li>Contratos - botão gerar contrato na tela do aluno</li>
                <li>Boletim Aluno</li>
                <li>Agenda na página inicial</li>
                <li>Linha do tempo financeiro, página inicial</li>     
                <li>Integração PagSeguro</li>               
                <li>Evolução do Aluno</li>
            </ul>
        </div>
    )
}

export default Home;