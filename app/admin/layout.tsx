import Link from 'next/link';
import { MenuIcon } from '@/components/ui/icons';
import LogoutButton from './logout-button';
import { getUser } from '@/app/auth/03-dal';

const links = [
  { href: 'https://signupandloginlfvh.vercel.app', title: 'Home' },
  { href: '/admin/insertimages', title: 'Insert Images' },
  { href: '/admin/dashboard', title: 'Dashboard' },
  { href: '/listImages', title: 'List Images' },
  { href: '/contact', title: 'Contact' },
  
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const user = await getUser();
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
              Login
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium"
              href="/login"
            >
              Login
            </Link>
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
