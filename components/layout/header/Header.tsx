import Topbar from "./Topbar";
import Bottombar from "./Bottombar";

const Header = () => {
  return (
    <header className="w-full">
      <nav className="w-full">
        <Topbar />
        <Bottombar />
      </nav>
    </header>
  );
};

export default Header;
