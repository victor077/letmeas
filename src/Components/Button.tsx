import { ButtonHTMLAttributes } from 'react';

import '../Styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps) {
 
  return <button className="button" {...props} />;
}

export default Button;
