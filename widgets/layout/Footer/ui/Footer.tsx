import Image from "next/image";

const POLICY_LINKS = [
  { label: "이용약관" },
  { label: "개인정보처리방침" },
  { label: "고객센터" },
];

const SOCIAL_LINKS = [
  {
    name: "YouTube",
    src: "/footer/youtube-icon.svg",
  },
  {
    name: "TikTok",
    src: "/footer/tiktok-icon.svg",
  },
  {
    name: "Instagram",
    src: "/footer/instagram-icon.svg",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900">
      <div className="mx-auto w-full max-w-360 sm:px-6 md:px-10 md:py-12 lg:px-30 lg:py-14">
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

          <div className="order-2 flex flex-col items-center gap-4 lg:order-3 lg:items-end">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 sm:text-sm lg:justify-end">
              {POLICY_LINKS.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2">
                  <button type="button">{item.label}</button>
                  {index !== POLICY_LINKS.length - 1 ? (
                    <span className="text-gray-700">|</span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={item.name}
                  className="border-mint-900 flex h-10 w-10 items-center justify-center rounded-full border transition"
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
