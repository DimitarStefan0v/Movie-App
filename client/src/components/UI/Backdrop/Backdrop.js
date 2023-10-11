import './Backdrop.css';

const Backdrop = (props) => {
  return (
    <div className={`backdrop ${props.className}`} onClick={props.onClick}></div>
  );
};

export default Backdrop;