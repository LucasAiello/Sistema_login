const url = "http://localhost:3000/professor"
const caixa_alunos = document.querySelector("#caixa_alunos")
const dados = JSON.parse(window.localStorage.getItem("dados"))

const receberAlunos = async ()=>{
    console.log(localStorage.getItem("dados")[0])
    let res = await fetch(`http://localhost:3000/professor/${dados.id_professor}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    res = await res.json()
    return res
}

const mostrarAlunos = async ()=>{
    const alunos = await receberAlunos()
    alunos.map((elemento)=>{
        const novo_elemento = document.createElement("div")
        novo_elemento.setAttribute("id", `${elemento.id_aluno}`)
        novo_elemento.setAttribute("class", "aluno")
        
        const caixa_texto = document.createElement("div")
        caixa_texto.innerText = `Nome: ${elemento.nome_aluno} ${elemento.sobrenome_aluno} | E-mail: ${elemento.email_aluno} | Pontos: ${elemento.pts_aluno}`

        novo_elemento.appendChild(caixa_texto)

        const botao = document.createElement("button")
        botao.setAttribute("class", "btn_aluno")
        botao.innerText = "Editar"

        botao.addEventListener("click", async (target)=>{
            if(caixa_alunos.parentNode.parentNode.lastChild.id === 'caixa_edicao') {
                caixa_alunos.parentNode.parentNode.removeChild(caixa_alunos.parentNode.parentNode.lastChild)
            }
            const caixa_pontos = document.createElement("div")
            caixa_pontos.setAttribute("id", "caixa_edicao")
            const nome = document.createElement("h3")
            nome.innerText = `Nome:   ${elemento.nome_aluno} ${elemento.sobrenome_aluno}`
            const email = document.createElement("h3")
            email.innerText = `E-Mail:   ${elemento.email_aluno}`
            caixa_pontos.appendChild(nome)

            caixa_pontos.appendChild(email)
            const label = document.createElement("label")
            label.setAttribute("for", `inp_pts`)
            label.innerText = 'Pontos'
            caixa_pontos.appendChild(label)

            const inp_pts = document.createElement("input")
            inp_pts.setAttribute("type", "text")
            inp_pts.setAttribute("name", "inp_pts")
            inp_pts.setAttribute("id", "inp_pts")
            inp_pts.setAttribute("value", `${elemento.pts_aluno}`)
            caixa_pontos.appendChild(inp_pts)

            const btn_salvar = document.createElement("button")
            btn_salvar.innerText = "Salvar"
            btn_salvar.setAttribute("id", "btn_pontos")
            caixa_pontos.appendChild(btn_salvar)

            btn_salvar.addEventListener("click", async (t)=>{
    
                let res = await fetch(`http://localhost:3000/professor`, {
                    body: JSON.stringify({id: `${target.target.parentNode.id}`, pts: `${inp_pts.value}`}),
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                res = await res.json()
                if(Object.values(res).length == 0) alert("Insira um numero valido")
                caixa_alunos.parentNode.parentNode.removeChild(caixa_alunos.parentNode.parentNode.lastChild)
            })

            caixa_alunos.parentNode.parentNode.appendChild(caixa_pontos)
        })

        novo_elemento.appendChild(botao)
    
        caixa_alunos.appendChild(novo_elemento)
    })

}

mostrarAlunos()
