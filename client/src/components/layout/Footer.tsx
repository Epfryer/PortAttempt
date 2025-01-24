import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white py-6 mt-8 text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2">D.EF</h3>
            <p className="text-gray-600 leading-relaxed">
              Ethan Fryer<br />
              Virginia Tech AAD '25<br />
              B.Arch Candidate'
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Home</h3>
            <address className="text-gray-600 not-italic leading-relaxed">
              Honolul, HI<br />
              Tampa, FL<br />
              Blacksburg, VA
            </address>
          </div>

          <div>
            <h3 className="font-bold mb-2">Links</h3>
            <nav className="flex flex-col space-y-2 text-gray-600">
              <Link href="/about">
                <a className="hover:text-black transition-colors">About</a>
              </Link>
              <Link href="/contact">
                <a className="hover:text-black transition-colors">Contact</a>
              </Link>
            </nav>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} D.EF. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
