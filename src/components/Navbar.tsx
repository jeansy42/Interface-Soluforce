import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link, useRevalidator } from "react-router-dom";
import logo from "/logo_soluforce.jpg";
import { formatLittleFS } from "../libs/littleFS";

function Navbar() {
  const revalidator = useRevalidator();
  const handlerFormatLittleFS = async () => {
    try {
      const res = await formatLittleFS();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-6 bg-base-100">
      <div className="navbar m-auto min-w-[300px] max-w-7xl border-b-2 border-slate-500">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <HiMiniBars3CenterLeft className="h-5 w-5 stroke-white" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link to={"/dispositives"}>Dispositivos</Link>
              </li>
              <li>
                <span>Network</span>
                <ul className="p-2">
                  <li>
                    <Link to={"/redMesh"}>Red Mesh</Link>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <button onClick={handlerFormatLittleFS}>Format LittleFS</button>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" to={"/"}>
            <img src={logo} alt="Logo Soluforce" height={40} width={40} />
            Soluforce
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/dispositives"}>Dispositivos</Link>
            </li>
            <li>
              <details>
                <summary>Network</summary>
                <ul className="p-2 ">
                  <li className="w-40">
                    <Link to={"/redMesh"}>Red Mesh</Link>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <button onClick={handlerFormatLittleFS}>Format LittleFS</button>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={() => revalidator.revalidate()} className="btn">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
