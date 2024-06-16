import "./Header.css";

export default function Header({ children, text }) {
  return (
    <header className="Header">
      <div className="text">{text}</div>
      {children}
    </header>
  );
}
