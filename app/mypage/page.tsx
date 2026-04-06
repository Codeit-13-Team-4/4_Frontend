import MyProfileSection from "@/widgets/mypage/ui/MyProfileSection";
import { User } from "@/shared/types/user";

const MOCK_USER: User = {
  id: 1,
  email: "test@devup.com",
  nickname: "용맹한 고양이1",
  jobLabel: "fe",
  bio: "안녕하세요. 반가워요. 프론트엔드입니다. 용맹한 개발을 할 수 있어요. 안녕하세요. 반가워요. 프론트엔드입니다.",
  profileImageUrl: null,
  skills: [
    "react",
    "figma",
    "typescript",
    "mysql",
    "python",
    "nodejs",
    "nextjs",
    "docker",
    "git",
    "github",
    "aws",
    "kotlin",
    "swift",
    "flutter",
    "redis",
  ],
  githubLink: "https://github.com",
  blogLink: "https://blog.example.com",
  portfolioLink: "https://portfolio.example.com",
  accounts: ["local"],
  stats: { challengeCount: 12, projectCount: 3 },
  createdAt: "2024-01-01T00:00:00.000Z",
};

export default function MyPage() {
  return (
    <div>
      <MyProfileSection userData={MOCK_USER} />
    </div>
  );
}
