(function () {
  emailjs.init("8W3qP-GOuma42yox0");
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("from_name").value.trim();
    const email = document.getElementById("reply_to").value.trim();
    const mensagem = document.getElementById("message").value.trim();
    const botao = document.getElementById("btt");

    if (!nome || !email || !mensagem) {
      alert("⚠️ Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const textoOriginal = botao.value;
    botao.value = "Verificando email...";
    botao.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      await emailjs.send("service_18d7ier", "template_ay3tz2u", {
        name: nome,
        email: email,
        message: mensagem,
      });

      alert("✅ Mensagem enviada com sucesso!");
      form.reset();
    } catch (erro) {
      console.error("Erro ao enviar:", erro);
      alert("❌ Erro ao enviar a mensagem. Tente novamente mais tarde.");
    }

    botao.value = textoOriginal;
    botao.disabled = false;
  });
});
