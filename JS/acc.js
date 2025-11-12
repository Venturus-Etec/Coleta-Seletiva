function btt_acc() {
  const caixa = document.getElementById('caixaAcessibilidade');
  caixa.style.display = caixa.style.display === 'block' ? 'none' : 'block';
  document.getElementById("menu-acc").style.display = "none";
}

function fecharAcessibilidade() {
  document.getElementById('caixaAcessibilidade').style.display = 'none';
  document.getElementById("menu-acc").style.display = "block";
}