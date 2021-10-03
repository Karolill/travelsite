type mainButtonProps = {
  text: String;
};

const MainButton = (props: mainButtonProps) => {
  return <button className="main-button">{props.text}</button>;
};

export default MainButton;
