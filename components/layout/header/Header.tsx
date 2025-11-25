import Topbar from "./Topbar";
import Bottombar from "./Bottombar";

const Header = () => {
  return (
    <header>
      <nav>
        <Topbar />
        <Bottombar />
      </nav>
    </header>
  );
};

export default Header;
