const urlBackend = "http://localhost:3000";

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const inputTitulo = document.getElementById("titulo");
const inputArtista = document.getElementById("artista");
const inputGenero = document.getElementById("genero");
const inputAno = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");
const botaoSalvar = document.getElementById("botaoSalvar");

async function buscarMusica() {
  const resposta = await fetch(`${urlBackend}/musica/${id}`);
  const musica = await resposta.json();

  inputTitulo.value = musica.titulo;
  inputArtista.value = musica.artista;
  inputGenero.value = musica.genero;
  inputAno.value = musica.ano;
  inputDuracao.value = musica.duracao;
}

buscarMusica();

async function salvarAlteracoes() {
  if (
    inputTitulo.value.trim() === "" ||
    inputArtista.value.trim() === "" ||
    inputGenero.value.trim() === "" ||
    inputAno.value === "" ||
    inputDuracao.value === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const musica = {
    titulo: inputTitulo.value,
    artista: inputArtista.value,
    genero: inputGenero.value,
    ano: inputAno.valueAsNumber,
    duracao: inputDuracao.valueAsNumber,
  };

  const resposta = await fetch(`${urlBackend}/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(musica),
  });

  const dados = await resposta.json();
  alert(dados.mensagem);

  window.location.href = "index.html";
}

botaoSalvar.addEventListener("click", salvarAlteracoes);