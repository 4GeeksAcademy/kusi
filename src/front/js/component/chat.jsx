import React, { Component,useContext,useEffect,useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import { Context } from "../store/appContext";
import chatbot from '../../assets/images/chatbot.png';
import botavatar from '../../assets/images/botavatar.png';
import botoff from '../../assets/images/botoff.png';


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
      // Recuperar el valor del localStorage al cargar el componente
      localStorage.setItem("requestBot","");
      localStorage.setItem("responseBot"," ");
    }, []);
  
    const steps = [
      {
        id: 'welcome',
        message: 'Bienvenido a Kusi AI🤖 ',
        trigger: '1',
      },
      {
        id: '1',
        message: '¿Cuál es tu consulta?',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
        validator: (value) =>{
          localStorage.setItem('requestBot', value);
          return true
          
        }
      },
      {
        id: '3',
        message: (localStorage.getItem("responseBot")),
        trigger: '2',
      },
      // {
      //   id: '4',
      //   message: '¿Quieres hacer otra consulta?',
      //   trigger: '5',
      // },
      // {
      //   id: '5',
      //   options: [
      //     {value: "y", label: "Si", trigger: "1" },
      //     {value: "n", label: "No", trigger: "6" },
      //   ]
      // },
      // {
      //   id: '6',
      //   message: 'Gracias por tu consulta! , Aqui estaré por si me necesitas.',
      //   end: true,
      // },
    ];

        return (

            <div className="container d-flex text-end justify-content-end" style={{ position: 'fixed', bottom: '70px', right: '20px', zIndex: 1000 }}>
                <button onClick={toggleChat} className="btn btn-danger" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                        {isOpen ? <img  src={botoff} alt="" /> : <img  src={chatbot} alt="" />}
                    </button>
            <ThemeProvider theme={theme}>
            {isOpen &&
                <ChatBot headerTitle= "Kusi AI" placeholder="Escribe aquí" recognitionEnable={{enable:true, lang: 'es'}} botAvatar={botavatar}
                 steps={steps}
                />
            }    
            </ThemeProvider>
            </div>
        )
    
}