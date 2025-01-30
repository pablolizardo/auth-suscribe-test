import { Check, Home, LogIn, User } from "lucide-react";
import { verifySession } from "src/services/session";
import NavLink from "./nav-link";

const Nav = async () => {
  const session = await verifySession();
  return (
    <nav className="flex flex-wrap items-center gap-4 border-b border-gray-200/20 pb-4">
      <NavLink href="/">
        <Home />
      </NavLink>

      {session?.user ? (
        <NavLink href="/profile" className="ml-auto relative">
          {session.user.suscribedAt && (
            <span className="badge bg-amber-900 text-amber-200  ">
              <Check /> PREMIUM
            </span>
          )}
          <User />
        </NavLink>
      ) : (
        <NavLink href="/login" className="ml-auto">
          <LogIn />
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
