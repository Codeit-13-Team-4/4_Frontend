import { User } from "@/shared/types/user";
import { PROFILE_LINK_ITEMS } from "@/features/mypage/model/mypage.constants";

type ProfileLinksProps = {
  githubLink: User["githubLink"];
  blogLink: User["blogLink"];
  portfolioLink: User["portfolioLink"];
};

export default function ProfileLinks({
  githubLink,
  blogLink,
  portfolioLink,
}: ProfileLinksProps) {
  const values = { githubLink, blogLink, portfolioLink };

  const links = PROFILE_LINK_ITEMS.filter(({ key }) => values[key] !== null);

  if (links.length === 0)
    return <p className="text-sm text-gray-600">등록된 링크가 없습니다.</p>;

  return (
    <ul className="flex gap-4">
      {links.map(({ key, label }) => (
        <li key={key}>
          <a
            href={values[key]!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 transition-colors hover:text-gray-50 hover:underline"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
