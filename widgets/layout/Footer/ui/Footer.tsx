import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900">
      <div className="mx-auto w-full max-w-360 sm:px-6 md:px-10 md:py-12 lg:px-40 lg:py-14">
        <div className="flex flex-col gap-10 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <Image
              src="/footer/devup-footer-logo.svg"
              alt="DevUp Logo"
              width={120}
              height={50}
              className="mx-auto lg:mx-0"
            />

            <p className="text-xs text-gray-500 sm:text-sm">
              코드잇 FESI 13기 4팀 | 팀 DevUp
            </p>
          </div>

          <p className="order-3 text-center text-xs text-gray-700 md:text-sm lg:order-2 lg:self-end">
            © 2026 DevUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
