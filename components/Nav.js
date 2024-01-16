import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Nav = ({ show, user }) => {
  const { data: session } = useSession();

  const inactiveLink = "text-gray-300 hover:text-white py-2 px-4";
  const activeLink = inactiveLink + " bg-blue-500";
  const router = useRouter();
  const { pathname } = router;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <aside
      className={
        (show ? "left-0" : "-left-full") +
        " top-0 text-gray-500 p-4 fixed w-full bg-gray-800 h-screen md:static md:w-auto transition-all"
      }
    >
      <div className="mb-4 mr-4">{/* Include your logo or content here */}</div>
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          Dashboard
        </Link>
        <Link
          href={"/patients"}
          className={pathname.includes("/patients") ? activeLink : inactiveLink}
        >
          Patient
        </Link>
        <Link
          href={"/doctors"}
          className={pathname.includes("/doctors") ? activeLink : inactiveLink}
        >
          Doctor
        </Link>
        <Link
          href={"/appointments"}
          className={
            pathname.includes("/appointments") ? activeLink : inactiveLink
          }
        >
          Appointments
        </Link>
        <button onClick={logout} className={inactiveLink}>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
