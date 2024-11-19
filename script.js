document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-btn');
    const feedbackElement = document.getElementById('feedback');
    const userInput = document.getElementById('user-id');
    const responseInput = document.getElementById('response');
    const formContainer = document.getElementById('form-container');
    const loadingScreen = document.getElementById('loading-screen');
  
    const webhookURL =
      'https://discordapp.com/api/webhooks/1308562868332920913/5tzaoSGLkUgza2Bu6h3IyktfaYMN2nWd509tq9_kuVzz3D6grCdZb2l9QrsWXeELinTb';
  
    // Certifique-se de que as telas estejam corretamente ocultas no início
    formContainer.classList.remove('hidden');
    loadingScreen.classList.add('hidden');
  
    function enviarResposta() {
      // Verificar se os campos estão preenchidos
      if (userInput.value.trim() === '' || responseInput.value.trim() === '') {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return; // Cancela o envio
      }
  
      const payload = {
        content: `**Novo formulário preenchido!**\n\n**Usuário do Discord:** <@${userInput.value}>\n**Conhece no servidor:** ${responseInput.value}`,
      };
  
      // Mostra a tela de carregamento
      formContainer.classList.add('hidden');
      loadingScreen.classList.remove('hidden');
  
      fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            setTimeout(() => {
              loadingScreen.innerHTML = '<h1>✔️ Enviado com sucesso!</h1><p>Aguarde um momento enquanto processamos sua resposta.</p>';
            }, 1000);
          } else {
            throw new Error('Erro ao enviar os dados.');
          }
        })
        .catch((error) => {
          console.error('Erro:', error);
          alert('Houve um erro ao enviar os dados. Por favor, tente novamente.');
          formContainer.classList.remove('hidden');
          loadingScreen.classList.add('hidden');
        });
    }
  
    // Adiciona o evento de clique ao botão
    submitButton.addEventListener('click', enviarResposta);
  });
  