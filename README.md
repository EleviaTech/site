# Site Elévia Tech

Site institucional da Elévia Tech — estático (HTML, CSS e JS puro), sem build, sem dependências de servidor. Pronto pra subir no GitHub Pages.

## Estrutura

```
elevia-tech-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── img/        (prints dos protótipos)
```

## Antes de publicar

Tem alguns lugares com dados de placeholder — busca e troca pelo que for real:

1. **Número do WhatsApp**: hoje está `5511982445610` (já é o seu número real, mas confirme o formato — sempre `55` + DDD + número, sem espaços/símbolos). Aparece em `index.html` (3 lugares) e em `js/main.js` (constante `WHATSAPP_NUMBER`).
2. **Email**: `eleviatech@outlook.com`, no rodapé do `index.html`.
3. **Instagram**: `instagram.com/elevia.tech`, no rodapé.

## Como publicar no GitHub Pages

1. Cria um repositório novo no GitHub (pode ser público), por exemplo `elevia-tech-site`.
2. Sobe todos os arquivos desta pasta pra raiz do repositório (não dentro de uma subpasta).
3. No repositório: **Settings → Pages**.
4. Em "Source", seleciona a branch `main` (ou `master`) e a pasta `/ (root)`.
5. Salva. Em 1-2 minutos o GitHub te dá uma URL tipo `https://seuusuario.github.io/elevia-tech-site/`.

Depois, quando quiser um domínio próprio (ex: `eleviatech.com.br`), dá pra configurar isso direto nas configurações do GitHub Pages, ou migrar pra Vercel/Netlify (que também são gratuitos pra esse tipo de site e ficam um pouco mais rápidos).

## Sobre o assistente de chat

O widget de chat no canto da tela **não usa uma IA generativa real** — é baseado em regras (palavras-chave → resposta), roda 100% no navegador, sem custo e sem chave de API exposta.

Isso é proposital: GitHub Pages é hospedagem estática (sem backend), então qualquer chave de API colocada no código JavaScript ficaria visível pra qualquer visitante que abrisse o "Inspecionar elemento" do navegador — alguém poderia copiar sua chave e gerar custos na sua conta.

A base de conhecimento do bot está em `js/main.js`, na constante `KNOWLEDGE`. Pra ensinar novas respostas, adiciona um novo item nesse array com `keywords` (palavras que disparam a resposta) e `reply` (o texto que o bot manda).

### Quando migrar para IA real

Se no futuro você hospedar em algo com backend (Vercel, Render, etc.), dá pra trocar a função `findReply` em `main.js` por uma chamada `fetch()` pra um endpoint próprio (uma function serverless, por exemplo) que aí sim conversa com a API da Claude — mantendo a chave de API protegida no servidor, nunca no navegador do visitante.

## Customização rápida

- **Cores**: todas em `css/style.css`, no bloco `:root` no topo do arquivo (variáveis `--indigo`, `--bg`, etc.).
- **Textos**: direto no `index.html`.
- **Imagens dos protótipos**: substitua os arquivos em `assets/img/` mantendo os mesmos nomes, ou troque os caminhos no `index.html`.
