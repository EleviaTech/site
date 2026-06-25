// ===========================
// ELÉVIA TECH — main.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- ASSISTENTE DE CHAT (baseado em regras) ----------
     Importante: isto NÃO chama uma IA generativa de verdade.
     Funciona 100% no navegador, sem custo e sem expor nenhuma
     chave de API — essencial porque este site é hospedado em
     GitHub Pages (hospedagem estática, sem backend seguro).
     Quando migrar para uma hospedagem com backend (ex: Vercel),
     dá pra trocar a função `getBotReply` por uma chamada real
     a um endpoint próprio que conversa com a API da Claude.
  ------------------------------------------------------------- */

  const WHATSAPP_NUMBER = '5511982445610';
  const whatsappLink = (msg) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  const chatClose = document.getElementById('chat-close');
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickRepliesEl = document.getElementById('chat-quick-replies');

  let hasOpenedBefore = false;

  function openChat() {
    chatPanel.hidden = false;
    chatToggle.setAttribute('aria-expanded', 'true');
    if (!hasOpenedBefore) {
      hasOpenedBefore = true;
      startConversation();
    }
    chatInput.focus();
  }

  function closeChat() {
    chatPanel.hidden = true;
    chatToggle.setAttribute('aria-expanded', 'false');
  }

  chatToggle.addEventListener('click', () => {
    const isHidden = chatPanel.hidden;
    isHidden ? openChat() : closeChat();
  });
  chatClose.addEventListener('click', closeChat);

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
    return div;
  }

  function addTypingThenReply(text, delay = 700) {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    return new Promise((resolve) => {
      setTimeout(() => {
        typing.remove();
        addMessage(text, 'bot');
        resolve();
      }, delay);
    });
  }

  function setQuickReplies(options) {
    quickRepliesEl.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'qr-btn';
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => handleUserInput(opt.label, opt.key));
      quickRepliesEl.appendChild(btn);
    });
  }

  function clearQuickReplies() {
    quickRepliesEl.innerHTML = '';
  }

  async function startConversation() {
    await addTypingThenReply(
      'Oi! 👋 Sou a assistente virtual da Elévia Tech. Posso te ajudar com dúvidas sobre preço, prazo ou serviços. O que você quer saber?',
      500
    );
    setQuickReplies([
      { label: 'Quanto custa?', key: 'preco' },
      { label: 'Quanto tempo demora?', key: 'prazo' },
      { label: 'Quero falar com a Carolina', key: 'humano' },
    ]);
  }

  // Base de respostas por palavra-chave
  const KNOWLEDGE = [
    {
      key: 'preco',
      keywords: ['preço', 'preco', 'valor', 'quanto custa', 'orçamento', 'orcamento', 'investimento'],
      reply: 'Site institucional a partir de R$ 2.000. Site com automação de WhatsApp a partir de R$ 3.500. Sistemas sob medida (folha de pagamento, estoque, vendas) são orçados conforme o escopo — sem letra pequena.',
      followUp: [
        { label: 'Quanto tempo demora?', key: 'prazo' },
        { label: 'Quero falar com a Carolina', key: 'humano' },
      ],
    },
    {
      key: 'prazo',
      keywords: ['prazo', 'tempo', 'demora', 'quanto tempo', 'quando fica pronto'],
      reply: 'Site institucional: 7 a 10 dias após o escopo fechado. Sistemas sob medida variam conforme a complexidade — combinamos um prazo claro antes de começar a desenvolver.',
      followUp: [
        { label: 'Quanto custa?', key: 'preco' },
        { label: 'Quero falar com a Carolina', key: 'humano' },
      ],
    },
    {
      key: 'sites',
      keywords: ['site', 'página', 'pagina', 'institucional'],
      reply: 'Fazemos sites institucionais com identidade visual própria — nunca um template genérico repetido. Dá uma olhada na seção "Protótipos" aqui na página pra ver um exemplo real.',
      followUp: [
        { label: 'Quanto custa?', key: 'preco' },
        { label: 'Quero falar com a Carolina', key: 'humano' },
      ],
    },
    {
      key: 'automacao',
      keywords: ['automação', 'automacao', 'chatbot', 'ia', 'inteligência artificial', 'inteligencia artificial', 'bot'],
      reply: 'A automação com IA funciona no seu site ou WhatsApp, tirando dúvida e agendando mesmo fora do horário comercial — exatamente como esse chat que você está usando agora. 😉',
      followUp: [
        { label: 'Quanto custa?', key: 'preco' },
        { label: 'Quero falar com a Carolina', key: 'humano' },
      ],
    },
    {
      key: 'sistemas',
      keywords: ['sistema', 'estoque', 'folha de pagamento', 'financeiro', 'vendas', 'crm', 'nota fiscal', 'departamento pessoal'],
      reply: 'Construímos sistemas sob medida: departamento pessoal, financeiro, estoque, vendas, emissão de notas fiscais e CRM — feitos pro seu fluxo real de trabalho, não o contrário.',
      followUp: [
        { label: 'Quanto custa?', key: 'preco' },
        { label: 'Quero falar com a Carolina', key: 'humano' },
      ],
    },
    {
      key: 'pagamento',
      keywords: ['pagamento', 'pagar', 'adiantado', 'parcela', 'à vista', 'a vista'],
      reply: 'Não precisa pagar tudo adiantado — o pagamento é dividido em etapas, combinadas com você antes de começar o projeto.',
      followUp: [
        { label: 'Quanto custa?', key: 'preco' },
        { label: 'Quero falar com a Carolina', key: 'humano' },
      ],
    },
    {
      key: 'humano',
      keywords: ['humano', 'pessoa', 'carolina', 'atendente', 'falar com alguém', 'falar com alguem'],
      reply: 'Combinado! Vou te direcionar pro WhatsApp da Carolina — ela responde rapidinho.',
      action: () => {
        setTimeout(() => {
          window.open(whatsappLink('Oi! Estava conversando com o assistente do site e quero falar com você diretamente.'), '_blank');
        }, 600);
      },
    },
  ];

  function findReply(userText) {
    const normalized = userText.toLowerCase();
    for (const item of KNOWLEDGE) {
      if (item.keywords.some(k => normalized.includes(k))) {
        return item;
      }
    }
    return null;
  }

  async function handleUserInput(text, presetKey) {
    addMessage(text, 'user');
    clearQuickReplies();

    const matched = presetKey
      ? KNOWLEDGE.find(k => k.key === presetKey)
      : findReply(text);

    if (matched) {
      await addTypingThenReply(matched.reply);
      if (matched.followUp) setQuickReplies(matched.followUp);
      if (matched.action) matched.action();
    } else {
      await addTypingThenReply(
        'Essa eu não tenho certeza de responder com precisão — mas a Carolina te responde na hora. Quer que eu já abra o WhatsApp?'
      );
      setQuickReplies([
        { label: 'Sim, abrir WhatsApp', key: 'humano' },
        { label: 'Quanto custa?', key: 'preco' },
      ]);
    }
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    handleUserInput(text, null);
  });

});
