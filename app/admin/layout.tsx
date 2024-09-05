import Link from 'next/link';
import { MenuIcon } from '@/components/ui/icons';
import LogoutButton from './logout-button';

const links = [
  { href: 'https://signupandloginlfvh.vercel.app', title: 'Home' },
  { href: '/admin/insertimages', title: 'Insert Images' },
  { href: '/admin/dashboard', title: 'Dashboard' },
  { href: '/listImages', title: 'List Images' },
  { href: '/contact', title: 'Contact' },
  
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-gray-100">
        <div className="container mx-auto flex max-w-7xl items-center justify-end p-4 md:justify-between md:px-6">
          <nav className="hidden items-center space-x-4 text-sm md:flex">
            {links.map((link) => (
              <Link className="text-gray-900" href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
            <div className="border-t p-4">
              <LogoutButton />
            </div>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <button className="inline-flex rounded-md md:hidden" type="button">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto mt-36 flex max-w-7xl justify-center">
        {children}
      </main>
    </div>
  );
}
