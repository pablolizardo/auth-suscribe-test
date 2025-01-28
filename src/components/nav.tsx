import { auth } from "@/lib/auth";
import NavLink from "./nav-link";

const Nav = async () => {
  const session = await auth();
  return (
    <nav className="flex flex-wrap items-center gap-4 border-b border-gray-200/20 pb-4">
      <NavLink href="/">Home</NavLink>
      {/* <NavLink href="/client">Client 🟢</NavLink> */}
      <NavLink href="/server-with-client-inside">
        Server with client inside 🟢
      </NavLink>
      <NavLink href="/server">Server 🛑</NavLink>
      <NavLink href="/profile">Profile 🛑</NavLink>
      <NavLink href="/protected">Protected 🛑</NavLink>
      <hr className="w-px  border-l h-4 " />
      {session ? (
        <NavLink href="/logout">Logout</NavLink>
      ) : (
        <>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
