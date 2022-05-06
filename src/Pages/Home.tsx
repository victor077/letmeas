import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import Button from "../Components/Button";

import illustrantionimg from "../Assets/Image/illustration.svg";
import logoimg from "../Assets/Image/logo.svg";
import googleimg from "../Assets/Image/google-icon.svg";

import { database } from "../Services/firebase";
import { useAuth } from "../Hooks/useAuth";

import "../Styles/auth.scss";

export function Home() {
  const navigate = useNavigate();
  const { user, singInWithLogin } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRomm() {
    if (!user) {
      await singInWithLogin();
    }
    navigate("/news/room");
  }

  async function handleJoinRomm(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      alert("Essa sala não existe");
      return;
    } 
    navigate(`/rooms/${roomCode}`)
     
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrantionimg}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire suas dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoimg} alt="Letmeask" />
          <button onClick={handleCreateRomm} className="create-room">
            <img src={googleimg} alt="Logo do google" /> Crie sua sala com o
            Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRomm}>
            <input
              type="text"
              placeholder="digite o codigo da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
