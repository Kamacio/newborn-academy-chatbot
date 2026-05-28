(function () {

  const style = document.createElement('style');

  style.innerHTML = `
    #neo-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-image: url('https://newborn-academy-chatbot.vercel.app/neo-avatar.png');
      background-size: cover;
      background-position: center;
      cursor: pointer;
      z-index: 999999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    #neo-widget-popup {
      position: fixed;
      bottom: 95px;
      right: 20px;
      background: #1d1d1d;
      color: white;
      padding: 14px 18px;
      border-radius: 18px;
      max-width: 260px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      z-index: 999999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      opacity: 0;
      transform: translateY(10px);
      transition: all .3s ease;
    }

    #neo-widget-popup.show {
      opacity: 1;
      transform: translateY(0);
    }

    #neo-widget-chat {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 380px;
      height: 700px;
      border-radius: 24px;
      overflow: hidden;
      background: #000;
      z-index: 999999;
      display: none;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }

    #neo-widget-chat iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    @media(max-width:768px) {

      #neo-widget-chat {
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }

      #neo-widget-popup {
        right: 15px;
        bottom: 90px;
      }

      #neo-widget-button {
        right: 15px;
        bottom: 15px;
      }
    }
  `;

  document.head.appendChild(style);

  const popup = document.createElement('div');

  popup.id = 'neo-widget-popup';

  popup.innerHTML = `
    <strong>Ciao, sono NEO 👋</strong><br>
    Posso aiutarti a orientarti nella Newborn Academy.
  `;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('show');
  }, 5000);

  const button = document.createElement('div');

  button.id = 'neo-widget-button';

  document.body.appendChild(button);

  const chat = document.createElement('div');

  chat.id = 'neo-widget-chat';

  chat.innerHTML = `
    <iframe src="https://newborn-academy-chatbot.vercel.app"></iframe>
  `;

  document.body.appendChild(chat);

  button.addEventListener('click', () => {

    if (chat.style.display === 'block') {
      chat.style.display = 'none';
    } else {
      chat.style.display = 'block';
      popup.style.display = 'none';
    }

  });

})();
