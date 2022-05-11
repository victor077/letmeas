import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../Components/Button";
import { RoomCode } from "../Components/RoomCode";

import logoImg from "../Assets/Image/logo.svg";

import { useAuth } from "../Hooks/useAuth";
import { useRoom } from "../Hooks/useRoom";

import { Questions } from "../Components/Questions";

import "../Styles/room.scss";

import { database } from "../Services/firebase";

type RoomParms = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParms>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;

  const { title, questions } = useRoom(String(roomId));

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("Você precisa está logado");
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHightLighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${roomId}/question`).push(question);
    setNewQuestion("");
  }
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined={true}>Encerrar Sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-tittle">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
