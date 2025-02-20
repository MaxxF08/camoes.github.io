document.getElementById("bttn").addEventListener("click", pesquisa);

document.getElementById("titulo").addEventListener("input", verifica);
document.getElementById("autor").addEventListener("input", verifica);
document.getElementById("assunto").addEventListener("input", verifica);

async function pesquisa() {
    console.log("Função pesquisa chamada!"); // Verifique se essa mensagem aparece no console
    try {
        var urlpesquisa = "https://openlibrary.org/search.json?";
        var nometitulo = document.getElementById("titulo").value;
        var nomeautor = document.getElementById("autor").value;
        var nomeassunto = document.getElementById("assunto").value;
        var paragrafo = document.getElementById("mudar");
        var imagem = document.getElementById("imagemautor");
        var controle = 0;

        if (nometitulo !== "") {
            nometitulo = nometitulo.trim().replace(/\s/g, "+");
            urlpesquisa += "title=" + nometitulo;
            controle = 1;
        }

        if (nomeautor !== "") {
            if (controle > 0) urlpesquisa += "&";
            nomeautor = nomeautor.trim().replace(/\s/g, "+");
            urlpesquisa += "author=" + nomeautor;
            controle = 1;
        }

        if (nomeassunto !== "") {
            if (controle > 0) urlpesquisa += "&";
            nomeassunto = nomeassunto.trim().replace(/\s/g, "+");
            urlpesquisa += "subject=" + nomeassunto;
            controle = 1;
        }

        console.log("URL da pesquisa:", urlpesquisa);

        var arquivojson = await fetch(urlpesquisa);
        if (!arquivojson.ok) throw new Error("Erro na requisição: " + arquivojson.status);

        var respostajson = await arquivojson.json();
        console.log("Resposta da API:", respostajson);

        if (respostajson.numFound === 0) {
            paragrafo.innerHTML = "Não foi encontrado nenhum resultado.";
            return;
        }

        if (respostajson.docs.length > 0) {
            paragrafo.innerHTML = "Nome do autor: " + respostajson.docs[0].author_name[0] + " Título do livro: " + respostajson.docs[0].title;
            imagem.src = "https://covers.openlibrary.org/a/olid/" + respostajson.docs[0].author_key[0] + "-M.jpg";
        } else {
            paragrafo.innerHTML = "Nenhum resultado encontrado.";
        }
    } catch (error) {
        console.error("Erro:", error);
        paragrafo.innerHTML = "Erro ao buscar os dados. Tente novamente.";
    }
}

function verifica() {
    var nometitulo = document.getElementById("titulo").value;
    var nomeautor = document.getElementById("autor").value;
    var nomeassunto = document.getElementById("assunto").value;
    var botao = document.getElementById("bttn");

    if (nomeassunto !== "" || nomeautor !== "" || nometitulo !== "") {
        botao.disabled = false;
    } else {
        botao.disabled = true;
    }
}