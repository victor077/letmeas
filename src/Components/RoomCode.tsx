import copyImg from "../Assets/Image/copy.svg";

import "../Styles/room-code.scss";

type RoomCodeProps = {
    code?: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copiarCodigo(){
        navigator.clipboard.writeText(props.code ?? String(props.code))
    }
  return (
    <button className="room-code" onClick={copiarCodigo}>
      <div>
        <img src={copyImg} alt="" />
      </div>
      <span>Sala #{props.code} </span>
    </button>
  );
}
