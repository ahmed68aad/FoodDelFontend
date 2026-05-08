import "./Header.css";
const Header = () => {
  const scrollToMenu = () => {
    document.getElementById("explore-menu")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="header">
      <div className="header-content">
        <h2>Fresh food, fast delivery</h2>
        <p>
          Pick from chef-made meals, track your cart instantly, and get dinner
          moving in a few clicks.
        </p>
        <button onClick={scrollToMenu}>View menu</button>
      </div>
    </div>
  );
};

export default Header;
