const botao = document.querySelector('#btn_enviar')
const inp_usuario = document.querySelector("#usuario")
const inp_senha = document.querySelector("#senha")
let nome_usuario
let senha
const url = `http://localhost:3000/login`
window.localStorage.clear()
botao.addEventListener("click", async ()=>{
    nome_usuario = inp_usuario.value
    senha = inp_senha.value
    const dados_login = await validarLogin(nome_usuario, senha)
    if(dados_login.acesso){
        if(dados_login.dados.fonte === 'professor') window.localStorage.setItem("dados", JSON.stringify(dados_login.dados.tabela[0]))
        else window.localStorage.setItem("dados", JSON.stringify(dados_login.dados.tabela[0]))
        
        window.location.href = `./${dados_login.dados.fonte}.html`
    }
})

const validarLogin = async(usu, sen)=>{
    let req = await fetch(url, {
        body: JSON.stringify({
            usuario: usu,
            senha: sen
        }),
        method: "POST",
        mode: "cors",
        headers:{
            'Content-Type': 'application/json'
        }
    })
    req = await req.json()
    return {acesso: req.acesso, dados: req.dados}
}
