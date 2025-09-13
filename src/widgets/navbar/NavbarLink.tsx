import Link from "next/link";

interface NavbarLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavbarLink = ({ children, href }: NavbarLinkProps) => (
  <Link
    href={href}
    className="hover:cursor-pointer transition-colors duration-700 hover:opacity-50 group-data-[transparent=true]/nav:text-light group-data-[transparent=false]/nav:text-dark"
  >
    {children}
  </Link>
);

export default NavbarLink;
