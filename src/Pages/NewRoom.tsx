import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { database } from "../Services/firebase";
import Button from "../Components/Button";

import illustrantionimg from "../Assets/Image/illustration.svg";
import logoimg from "../Assets/Image/logo.svg";

import { useAuth } from "../Hooks/useAuth";

import "../Styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();
  const navigete = useNavigate();
  // aqui estou chamando os dados do meu usuario que deixei salvo no meu context e passando pra essa tela
  const [newRoom, setNewRoom] = useState("");

  function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }

    const rommRef = database.ref("rooms");

    const firebaseRoom = rommRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigete(`/rooms/${firebaseRoom.key}`);
  }

  function handleChangeRomm(event: React.ChangeEvent<HTMLInputElement>) {
    setNewRoom(event.target.value);
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={handleChangeRomm}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?<Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
