document.addEventListener("DOMContentLoaded", function () {
    const relogio = document.getElementById("relogio");

    let horas = 7;
    let minutos = 0;
    let dias = 0;
    let semana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

    // Função para atualizar o relógio e o tempo no jogo
    function atualizarRelogio() {
        let horaFormatada = horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0");
        let diaAtual = semana[dias % semana.length];
        relogio.textContent = `Horário: ${horaFormatada} | Dia: ${diaAtual}`;

        minutos++;

        if (minutos === 60) {
            minutos = 0;
            horas++;
            if (horas === 20) {
                horas = 7;
                dias++;
            }
        }
    }

    // Correção do setInterval para garantir que a função de atualização seja chamada corretamente
    setInterval(atualizarRelogio, 1000); // Atualiza o relógio a cada 1 segundo

    function spawnPersonagemAleatorio() {
        const tipos = [
            { nome: "Professora Grávida", cor: "lightblue" },
            { nome: "Professor", cor: "blue" },
            { nome: "Aluno", cor: "green" },
            { nome: "Coordenador", cor: "black" },
            { nome: "Segurança", cor: "purple" },
            { nome: "Diretor", cor: "red" },
            { nome: "Tia da Cantina", cor: "pink" },
            { nome: "Faxineira", cor: "yellow" },
            { nome: "Ladrão", cor: "orange" }
        ];

        let tipoSelecionado = tipos[Math.floor(Math.random() * tipos.length)];

        const personagem = document.createElement("div");
        personagem.classList.add("personagem");
        personagem.textContent = tipoSelecionado.nome;
        personagem.style.backgroundColor = tipoSelecionado.cor;

        // Corrigir a posição do personagem
        personagem.style.position = "absolute"; // Garantir que o personagem seja posicionado de forma absoluta
        personagem.style.left = Math.random() * (window.innerWidth - 100) + "px";
        personagem.style.top = Math.random() * (window.innerHeight - 100) + "px";

        if (tipoSelecionado.nome === "Professora Grávida") {
            setTimeout(() => nascerBebe(personagem), 10000); // Bebê nasce após 10 segundos
        }

        document.body.appendChild(personagem);
    }

    function nascerBebe(mae) {
        const bebe = document.createElement("div");
        bebe.classList.add("personagem", "bebe");
        bebe.textContent = "Bebê";
        bebe.style.backgroundColor = "gray"; // Cor do bebê agora é cinza

        const fralda = document.createElement("div");
        fralda.classList.add("fralda");
        fralda.textContent = "⬜"; // Fralda emoji
        fralda.style.position = "absolute";
        fralda.style.top = "20px";
        fralda.style.left = "50%";
        fralda.style.transform = "translateX(-50%)";

        bebe.appendChild(fralda);

        mae.appendChild(bebe);

        let idade = 0; // A idade do bebê em segundos
        let xixiAdicionado = false;

        function bebeFazNecessidades() {
            idade++;

            // Se o bebê tem mais de 60 segundos e menos de 120 segundos, ele vai para o banheiro
            if (idade > 60 && idade < 120) {
                irAoBanheiro(bebe);
            } else {
                // Caso contrário, ele continua fazendo as necessidades na fralda
                if (!xixiAdicionado) {
                    const necessidadeXixi = document.createElement("div");
                    necessidadeXixi.classList.add("xixi");
                    necessidadeXixi.textContent = "💧"; // Xixi
                    fralda.appendChild(necessidadeXixi);
                    xixiAdicionado = true;
                }

                const necessidadeCoco = document.createElement("div");
                necessidadeCoco.classList.add("coco");
                necessidadeCoco.textContent = "💩"; // Cocô
                fralda.appendChild(necessidadeCoco);
            }

            setTimeout(bebeFazNecessidades, 5000); // O xixi será feito a cada 5 segundos
        }

        setTimeout(bebeFazNecessidades, 5000); // O xixi será feito a cada 5 segundos
    }

    function irAoBanheiro(bebe) {
        // Criar setas para direcionar o bebê para o banheiro
        const seta = document.createElement("div");
        seta.classList.add("seta");
        seta.textContent = "➡️";
        seta.style.position = "absolute";
        seta.style.top = bebe.offsetTop + "px";
        seta.style.left = bebe.offsetLeft + 50 + "px";
        document.body.appendChild(seta);

        // Função para mover a seta e o bebê até o banheiro
        setTimeout(() => {
            const banheiro = document.getElementById("banheiro");
            if (banheiro) {
                let destinoX = banheiro.offsetLeft;
                let destinoY = banheiro.offsetTop;

                // Movendo a seta e o bebê até o banheiro
                const movimentoSeta = setInterval(() => {
                    if (Math.abs(seta.offsetLeft - destinoX) > 5 || Math.abs(seta.offsetTop - destinoY) > 5) {
                        seta.style.left = (seta.offsetLeft + (destinoX - seta.offsetLeft) / 10) + "px";
                        seta.style.top = (seta.offsetTop + (destinoY - seta.offsetTop) / 10) + "px";
                        bebe.style.left = (bebe.offsetLeft + (destinoX - bebe.offsetLeft) / 10) + "px";
                        bebe.style.top = (bebe.offsetTop + (destinoY - bebe.offsetTop) / 10) + "px";
                    } else {
                        clearInterval(movimentoSeta);
                        fazerNecessidadeNoBanheiro(bebe); // Quando chegar ao banheiro, fazer xixi e cocô
                    }
                }, 50);
            }
        }, 2000);
    }

    function fazerNecessidadeNoBanheiro(bebe) {
        // Quando o bebê chega ao banheiro, ele faz xixi e cocô no banheiro
        const xixiNoBanheiro = document.createElement("div");
        xixiNoBanheiro.classList.add("xixi");
        xixiNoBanheiro.textContent = "💧"; // Xixi no banheiro
        document.getElementById("banheiro").appendChild(xixiNoBanheiro);

        const cocoNoBanheiro = document.createElement("div");
        cocoNoBanheiro.classList.add("coco");
        cocoNoBanheiro.textContent = "💩"; // Cocô no banheiro
        document.getElementById("banheiro").appendChild(cocoNoBanheiro);
    }

    function criarBanheiro() {
        const banheiro = document.createElement("div");
        banheiro.id = "banheiro";
        banheiro.textContent = "🚻 Banheiro";
        banheiro.style.position = "fixed";
        banheiro.style.bottom = "10px";
        banheiro.style.left = "50%";
        banheiro.style.transform = "translateX(-50%)";
        banheiro.style.backgroundColor = "lightgray";
        banheiro.style.padding = "10px";
        banheiro.style.textAlign = "center";

        document.body.appendChild(banheiro);
    }

    function criarLixeiras() {
        // Lixeira Azul (Oeste)
        const lixeiraAzul = document.createElement("div");
        lixeiraAzul.classList.add("lixeira");
        lixeiraAzul.textContent = "🗑️ Azul";
        lixeiraAzul.style.backgroundColor = "blue";
        lixeiraAzul.style.color = "white";
        lixeiraAzul.style.padding = "10px";
        lixeiraAzul.style.position = "fixed";
        lixeiraAzul.style.top = "10px";
        lixeiraAzul.style.left = "10px";
        lixeiraAzul.style.cursor = "pointer";
        document.body.appendChild(lixeiraAzul);

        // Lixeira Amarela (Leste)
        const lixeiraAmarela = document.createElement("div");
        lixeiraAmarela.classList.add("lixeira");
        lixeiraAmarela.textContent = "🗑️ Amarela";
        lixeiraAmarela.style.backgroundColor = "yellow";
        lixeiraAmarela.style.color = "black";
        lixeiraAmarela.style.padding = "10px";
        lixeiraAmarela.style.position = "fixed";
        lixeiraAmarela.style.top = "10px";
        lixeiraAmarela.style.right = "10px";
        lixeiraAmarela.style.cursor = "pointer";
        document.body.appendChild(lixeiraAmarela);

        // Lixeira Vermelha (Norte)
        const lixeiraVermelha = document.createElement("div");
        lixeiraVermelha.classList.add("lixeira");
        lixeiraVermelha.textContent = "🗑️ Vermelha";
        lixeiraVermelha.style.backgroundColor = "red";
        lixeiraVermelha.style.color = "white";
        lixeiraVermelha.style.padding = "10px";
        lixeiraVermelha.style.position = "fixed";
        lixeiraVermelha.style.top = "10px";
        lixeiraVermelha.style.left = "50%";
        lixeiraVermelha.style.transform = "translateX(-50%)";
        lixeiraVermelha.style.cursor = "pointer";
        document.body.appendChild(lixeiraVermelha);
    }

    criarBanheiro();
    criarLixeiras();
    setInterval(spawnPersonagemAleatorio, 5000); // Continua criando personagens aleatórios a cada 5 segundos
});
