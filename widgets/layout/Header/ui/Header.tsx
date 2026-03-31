import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserArea from "./UserArea";

export default function Header() {
  return (
    <header className="border-border-default h-22 w-full border-b bg-gray-900 text-gray-600">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">
        <Logo />
        <NavigationMenu className="hidden md:flex" />
        <UserArea />
      </div>
    </header>
  );
}
