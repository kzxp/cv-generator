import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "vite-react-ssg";

const Layout = () => {
  const { pathname } = useLocation();

  const getLinkClass = (path: string) => {
    const baseClass = "hover:underline";
    return pathname === path
      ? `${baseClass} underline font-bold text-[#273c75]`
      : baseClass;
  };

  return (
    <>
      <nav className="flex gap-4 p-4 justify-end text-xl sticky top-0 bg-white z-50">
        <Link to="/" className={getLinkClass("/")}>
          Me
        </Link>
        <Link to="/stuffs" className={getLinkClass("/stuffs")}>
          Stuffs
        </Link>
      </nav>
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export { Layout };
