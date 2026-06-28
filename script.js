const WHATSAPP_NUMBER = "5511982445610";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const canvas = document.querySelector("[data-network-canvas]");
const segmentButtons = document.querySelectorAll("[data-segment]");
const segmentPains = document.querySelector("[data-segment-pains]");
const segmentSolutions = document.querySelector("[data-segment-solutions]");
const segmentLink = document.querySelector("[data-segment-link]");
const conversation = document.querySelector("[data-conversation]");
const replayConversation = document.querySelector("[data-replay-conversation]");
const diagnosticForm = document.querySelector("[data-diagnostic-form]");
const diagnosticResult = document.querySelector("[data-diagnostic-result]");
const assistantToggle = document.querySelector("[data-assistant-toggle]");
const assistantPanel = document.querySelector("[data-assistant-panel]");
const assistantClose = document.querySelector("[data-assistant-close]");
const assistantMessages = document.querySelector("[data-assistant-messages]");
const assistantForm = document.querySelector("[data-assistant-form]");

const whatsappLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const segments = {
  estetica: {
    pains: ["Instagram não explica todos os procedimentos", "Cliente pergunta detalhes e some", "Agendamentos ficam espalhados", "Falta prova de autoridade"],
    solutions: ["Site premium com serviços e método", "Assistente com FAQ e triagem", "WhatsApp com mensagem contextual", "Demo visual para gerar confiança"],
    message: "Quero uma solução para clínica de estética com site, WhatsApp e automação.",
  },
  salao: {
    pains: ["Horários perdidos no WhatsApp", "Serviços sem vitrine clara", "Antes e depois espalhado", "Cliente não sabe como agendar"],
    solutions: ["Site com agenda e serviços", "Galeria organizada", "Botão de agendamento fixo", "FAQ para dúvidas repetidas"],
    message: "Quero uma solução para salão de beleza com agenda e WhatsApp.",
  },
  restaurante: {
    pains: ["Cardápio desatualizado", "Pedidos manuais", "Promoções sem página própria", "Pouca presença no Google"],
    solutions: ["Cardápio digital rápido", "CTA para pedido no WhatsApp", "Página de campanha", "Estrutura local para busca"],
    message: "Quero uma solução digital para restaurante.",
  },
  imobiliaria: {
    pains: ["Imóveis difíceis de comparar", "Leads chegam sem contexto", "Fotos ficam desorganizadas", "Atendimento perde velocidade"],
    solutions: ["Catálogo filtrável", "Formulário por imóvel", "WhatsApp com imóvel selecionado", "Painel de leads"],
    message: "Quero uma solução para imobiliária ou corretor.",
  },
  servicos: {
    pains: ["Indicações não viram orçamento", "Portfólio fica informal", "Perguntas repetidas tomam tempo", "Falta processo comercial"],
    solutions: ["Landing page de conversão", "Prova social e pacotes", "Assistente de orçamento inicial", "Funil simples para WhatsApp"],
    message: "Quero uma solução para prestador de serviço.",
  },
};

const chatAnswers = {
  site: "Para site, eu pensaria primeiro em posicionamento, oferta e caminho até o WhatsApp. Depois entram layout, copy, seções e prova social. Qual negócio você quer apresentar melhor?",
  automacao: "Para automação, o ponto principal é tirar repetição do atendimento: dúvidas frequentes, triagem, agendamento e direcionamento para você. Hoje o que mais toma seu tempo no WhatsApp?",
  sistema: "Para sistema, eu começaria mapeando o fluxo: clientes, vendas, estoque, financeiro, tarefas ou relatórios. Qual parte da operação está mais bagunçada hoje?",
  diagnostico: "Posso montar um diagnóstico inicial. Me diga em uma frase: qual é seu tipo de negócio e o que você mais quer melhorar agora: vender, atender, organizar ou automatizar?",
  prazo: "Prazo depende do escopo e das integrações. O caminho mais certeiro é entender a prioridade, definir a primeira versão e evoluir sem travar o lançamento.",
};

const assistantState = {
  interests: new Set(),
  lastTopic: "diagnostico",
};

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav?.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-count]").forEach((item) => {
  const target = Number(item.dataset.count || 0);
  let value = 0;
  const tick = () => {
    value += Math.ceil(target / 42);
    if (value >= target) {
      item.textContent = target;
      return;
    }
    item.textContent = value;
    requestAnimationFrame(tick);
  };
  tick();
});

const renderSegment = (key) => {
  const segment = segments[key];
  if (!segment || !segmentPains || !segmentSolutions || !segmentLink) return;

  segmentPains.innerHTML = segment.pains.map((pain) => `<li>${pain}</li>`).join("");
  segmentSolutions.innerHTML = segment.solutions.map((solution) => `<li>${solution}</li>`).join("");
  segmentLink.href = whatsappLink(segment.message);

  if (window.lucide) window.lucide.createIcons();
};

segmentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    segmentButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderSegment(button.dataset.segment);
  });
});

renderSegment("estetica");

const conversationMessages = [
  ["client", "Oi, vocês fazem site para clínica de estética?"],
  ["ai", "Sim. Posso criar um site com serviços, agendamento, WhatsApp, FAQ e estrutura para captar clientes."],
  ["client", "Dá para colocar bot automático?"],
  ["ai", "Dá sim. O fluxo pode responder dúvidas, qualificar o lead e chamar você quando precisar de atendimento humano."],
];

const playConversation = () => {
  if (!conversation) return;
  conversation.innerHTML = "";
  conversationMessages.forEach(([type, text], index) => {
    window.setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.className = `bubble ${type}`;
      bubble.textContent = text;
      conversation.appendChild(bubble);
    }, index * 360);
  });
};

replayConversation?.addEventListener("click", playConversation);

diagnosticForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = Array.from(diagnosticForm.querySelectorAll("input:checked")).map((input) => input.value);

  if (!selected.length) {
    diagnosticResult.textContent = "Selecione pelo menos uma necessidade para gerar uma recomendação.";
    return;
  }

  const needsSystem = selected.some((item) => item.includes("controlar"));
  const needsAutomation = selected.some((item) => item.includes("WhatsApp") || item.includes("Automatizar") || item.includes("perguntas"));
  const recommendation = needsSystem
    ? "Recomendação: sistema sob medida com dashboard + site de apresentação + WhatsApp contextual."
    : needsAutomation
      ? "Recomendação: site de conversão com assistente virtual e fluxo de WhatsApp."
      : "Recomendação: landing page profissional com copy, prova social e CTA direto.";

  const message = `${recommendation} Preciso de ajuda para ${selected.join(", ")}.`;
  diagnosticResult.innerHTML = `${recommendation} <a href="${whatsappLink(message)}" target="_blank" rel="noopener">Enviar briefing no WhatsApp</a>`;
});

const addAssistantMessage = (text, type = "bot") => {
  if (!assistantMessages) return;
  const message = document.createElement("div");
  message.className = `assistant-message ${type}`;
  message.textContent = text;
  assistantMessages.appendChild(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const addThinkingThenReply = (text) => {
  if (!assistantMessages) return;

  const thinking = document.createElement("div");
  thinking.className = "assistant-message bot thinking";
  thinking.innerHTML = "<span></span><span></span><span></span>";
  assistantMessages.appendChild(thinking);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;

  window.setTimeout(() => {
    thinking.remove();
    addAssistantMessage(text, "bot");
  }, 520);
};

const answerFor = (text) => {
  const normalized = text.toLowerCase();

  if (normalized.includes("preço") || normalized.includes("preco") || normalized.includes("valor") || normalized.includes("orçamento")) {
    assistantState.lastTopic = "diagnostico";
    return "Prefiro não passar valor solto sem entender escopo, porque isso costuma gerar expectativa errada. Me conta o tipo de negócio, objetivo e funcionalidades desejadas que eu te ajudo a chegar num briefing claro.";
  }

  if (normalized.includes("prazo") || normalized.includes("tempo") || normalized.includes("demora")) {
    assistantState.lastTopic = "prazo";
    return chatAnswers.prazo;
  }

  if (normalized.includes("autom") || normalized.includes("ia") || normalized.includes("bot") || normalized.includes("whatsapp")) {
    assistantState.interests.add("automação");
    assistantState.lastTopic = "automacao";
    return chatAnswers.automacao;
  }

  if (normalized.includes("sistema") || normalized.includes("dashboard") || normalized.includes("estoque") || normalized.includes("crm") || normalized.includes("financeiro")) {
    assistantState.interests.add("sistema");
    assistantState.lastTopic = "sistema";
    return chatAnswers.sistema;
  }

  if (normalized.includes("site") || normalized.includes("landing") || normalized.includes("página") || normalized.includes("pagina") || normalized.includes("portfolio")) {
    assistantState.interests.add("site");
    assistantState.lastTopic = "site";
    return chatAnswers.site;
  }

  if (normalized.includes("instagram") || normalized.includes("cliente") || normalized.includes("vender") || normalized.includes("captação") || normalized.includes("captar")) {
    assistantState.interests.add("conversão");
    assistantState.lastTopic = "diagnostico";
    return "Pelo que você descreveu, eu olharia para conversão: uma página clara, prova social, oferta bem explicada e WhatsApp com contexto. Você já tem uma demo, serviço ou oferta principal para destacar?";
  }

  if (normalized.includes("whats") || normalized.includes("carolina") || normalized.includes("humano") || normalized.includes("falar")) {
    const interests = Array.from(assistantState.interests).join(", ") || "diagnóstico digital";
    return `Posso te levar para o WhatsApp com contexto. Sugestão de mensagem: "Oi, quero conversar sobre ${interests} para meu negócio."`;
  }

  return "Boa. Para eu te responder melhor, me fala qual é o nicho do negócio e o principal objetivo agora: captar mais clientes, organizar atendimento, automatizar respostas ou criar um sistema interno?";
};

assistantToggle?.addEventListener("click", () => {
  const isOpen = assistantPanel?.classList.toggle("is-open");
  assistantToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

assistantClose?.addEventListener("click", () => {
  assistantPanel?.classList.remove("is-open");
  assistantToggle?.setAttribute("aria-expanded", "false");
});

assistantPanel?.querySelectorAll("[data-chat]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.chat;
    addAssistantMessage(button.textContent || "Pergunta", "user");
    if (key) assistantState.interests.add(key);
    assistantState.lastTopic = key || "diagnostico";
    addThinkingThenReply(chatAnswers[key] || answerFor(button.textContent || ""));
  });
});

assistantForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = assistantForm.elements.message;
  const text = String(input.value || "").trim();
  if (!text) return;
  addAssistantMessage(text, "user");
  addThinkingThenReply(answerFor(text));
  input.value = "";
});

const initNetwork = () => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  let width = 0;
  let height = 0;
  let particles = [];

  const reset = () => {
    width = canvas.width = window.innerWidth * window.devicePixelRatio;
    height = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const count = Math.min(76, Math.floor(window.innerWidth / 18));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32 * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.32 * window.devicePixelRatio,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(79, 70, 229, 0.38)";
    context.strokeStyle = "rgba(79, 70, 229, 0.14)";

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, 1.35 * window.devicePixelRatio, 0, Math.PI * 2);
      context.fill();

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const next = particles[nextIndex];
        const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
        if (distance < 145 * window.devicePixelRatio) {
          context.globalAlpha = 1 - distance / (145 * window.devicePixelRatio);
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.stroke();
          context.globalAlpha = 1;
        }
      }
    });

    requestAnimationFrame(draw);
  };

  reset();
  draw();
  window.addEventListener("resize", reset);
};

initNetwork();

if (window.lucide) {
  window.lucide.createIcons();
}
