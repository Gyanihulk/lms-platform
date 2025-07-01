import Image from "next/image";
import Link from "next/link";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  section: string;
  link: { label: string; href: string }[];
}

const products: ProductType[] = [
  {
    id: 1,
    section: "Academy",
    link: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/#aboutus-section' },
      { label: 'Programs', href: '/#programs-section' },
      { label: 'Contact', href: '/#contact-section' },
    ],
  },
  {
    id: 2,
    section: "Programs",
    link: [
      { label: 'CPL Ground Class', href: '/programs/cpl-ground' },
      { label: 'Cadet Pilot Program', href: '/programs/cadet' },
      { label: 'Type Rating', href: '/programs/type-rating' },
      { label: 'ATPL & Conversion', href: '/programs/atpl' },
    ],
  },
  {
    id: 3,
    section: "Quick Links",
    link: [
      { label: 'Testimonials', href: '/#testimonials-section' },
      { label: 'FAQ', href: '/#faq-section' },
      { label: 'Join Us', href: '/#join-section' },
    ],
  },
  {
    id: 4,
    section: "Connect",
    link: [
      { label: 'Instagram', href: 'https://instagram.com/altitudeaviation_pilottraining' },
      { label: 'Facebook', href: 'https://facebook.com/profile.php?id=61575264280398' },
      { label: 'Email Us', href: 'mailto:office@altitudeaviationacademy.in' },
    ],
  }
];

const Footer = () => {
  return (
    <div className="bg-black -mt-40" id="first-section">
      <div className="mx-auto max-w-2xl pt-48 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">

          {/* COLUMN-1 */}
          <div className='col-span-4'>
            <h3 className='text-white text-4xl font-semibold leading-9 mb-4 lg:mb-20'>
              Altitude Aviation Academy
            </h3>
            <p className="text-white opacity-70 mb-6">
              D-410, 2nd Floor, Ramphal Chowk Rd,<br />
              Sector-7, Dwarka, New Delhi - 110075
            </p>
            <p className="text-white opacity-70 mb-6">📞 +91 9220833737 / +91 9220809320</p>
            <div className='flex gap-4'>
              <div className='footer-icons'>
                <Link href="https://facebook.com/profile.php?id=61575264280398">
                  <Image src={'/images/footer/facebook.svg'} alt="facebook" width={20} height={20} />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link href="https://instagram.com/altitudeaviation_pilottraining">
                  <Image src={'/images/footer/instagram.svg'} alt="instagram" width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* DYNAMIC LINK COLUMNS */}
          {products.map((product) => (
            <div key={product.id} className="group relative col-span-2">
              <p className="text-white text-xl font-extrabold mb-9">{product.section}</p>
              <ul>
                {product.link.map((item, index) => (
                  <li key={index} className='mb-5'>
                    <Link href={item.href} className="text-white text-lg font-normal space-links hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* All Rights Reserved */}
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-t border-footer">
          <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8">
            <div>
              <h3 className='text-center md:text-start text-offwhite text-lg'>
                © 2025 Altitude Aviation Academy. All Rights Reserved.
              </h3>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href="/privacy-policy">
                <h3 className="text-offwhite pr-6 hover:underline">Privacy Policy</h3>
              </Link>
              <Link href="/terms">
                <h3 className="text-offwhite pl-6 border-l border-footer hover:underline">Terms & Conditions</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
