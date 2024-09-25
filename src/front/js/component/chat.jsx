import React, { useContext,useEffect,useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import { Context } from "../store/appContext";
import chatbot from '../../assets/images/chatbot.png';
import botavatar from '../../assets/images/botavatar.png';
import botoff from '../../assets/images/botoff.png';
import { jwtDecode } from 'jwt-decode';

export const Chat =() =>  {
    const { store, actions } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);

    const theme = {
      background: '#f5f8fb',
      headerBgColor: '#F44322',
      headerFontColor: '#fff',
      headerFontSize: '20px',
      botBubbleColor: '#F44322',
      botFontColor: '#fff',
      userBubbleColor: '#0cb3c9',
      userFontColor: '#fff',
  }

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
      localStorage.setItem("requestBot","");
      localStorage.setItem("responseBot"," ");
    }, []);

    function isClient() {
      const token = localStorage.getItem("token")
      if (token === null) return false;
      const decodedToken = jwtDecode(token);
      const role_id = decodedToken.sub.role_id;
      return role_id === 1;
    }
    
  
    const steps = [
      {
        id: 'welcome',
        message: 'Bienvenido a Kusi AI 🤖 Puedes realizarme cualquier consulta relacionada a la app.',
        trigger: '1',
      },
      {
        id: '1',
        user: true,
        trigger: '2',
        validator: value => {
          localStorage.setItem('requestBot', value);
          const chat = JSON.parse(localStorage.getItem("chat") || "[]");
          chat.push({ role: "user", content: value });
          actions.sendChat(chat).then(response => {
            chat.push(response);
            localStorage.setItem("chat", JSON.stringify(chat));
          });
        }
      },
      {
        id: '2',
        message: localStorage.getItem("responseBot"),
        waitAction: true,
        trigger: '1'
      }
    ];

        return (
          <div
              className={`container d-flex text-end justify-content-end ${ isClient() ? '' : 'd-none' }`}
              style={{ position: 'fixed', bottom: '70px', right: '20px', zIndex: 1000 }}>
              <button
                onClick={toggleChat}
                className="btn btn-danger"
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
              >
                {isOpen ? <img  src={botoff} alt="" /> : <img  src={chatbot} alt="" />}
              </button>
            <ThemeProvider theme={theme}>
              {isOpen &&
                <ChatBot
                  headerTitle="Kusi AI"
                  placeholder="Escribe aquí"
                  recognitionEnable={{enable:true, lang: 'es'}}
                  botAvatar={botavatar}
                  steps={steps}
                />
              }    
            </ThemeProvider>
          </div>
        );
    
}