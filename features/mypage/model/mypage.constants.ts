import { JobLabelType } from "@/shared/types/user";

export const JOB_LABEL_MAP: Record<JobLabelType, string> = {
  fe: "FE",
  be: "BE",
  pm: "PM",
  devops: "DevOps",
  marketer: "Marketer",
  designer: "Designer",
  android: "Android",
  ios: "iOS",
};

export const TECH_STACK: Record<string, { label: string; icon: string }> = {
  react: { label: "React", icon: "/tech/react-icon.svg" },
  figma: { label: "Figma", icon: "/tech/figma-icon.svg" },
  golang: { label: "Golang", icon: "/tech/golang-icon.svg" },
  html: { label: "HTML", icon: "/tech/html-icon.svg" },
  java: { label: "Java", icon: "/tech/java-icon.svg" },
  javascript: { label: "JavaScript", icon: "/tech/javascript-icon.svg" },
  mysql: { label: "MySQL", icon: "/tech/mysql-icon.svg" },
  nestjs: { label: "NestJs", icon: "/tech/nestjs-icon.svg" },
  nodejs: { label: "Node.js", icon: "/tech/nodejs-icon.svg" },
  photoshop: { label: "Photoshop", icon: "/tech/photoshop-icon.svg" },
  python: { label: "Python", icon: "/tech/python-icon.svg" },
  spring: { label: "Spring", icon: "/tech/spring-icon.svg" },
  typescript: { label: "TypeScript", icon: "/tech/typescript-icon.svg" },
  unity: { label: "Unity", icon: "/tech/unity-icon.svg" },
  vuejs: { label: "Vue.js", icon: "/tech/vuejs-icon.svg" },
  aws: { label: "AWS", icon: "/tech/aws-icon.svg" },
  c: { label: "C", icon: "/tech/c-icon.svg" },
  cpp: { label: "C++", icon: "/tech/cpp-icon.svg" },
  django: { label: "Django", icon: "/tech/django-icon.svg" },
  docker: { label: "Docker", icon: "/tech/docker-icon.svg" },
  expressjs: { label: "Express.js", icon: "/tech/expressjs-icon.svg" },
  firebase: { label: "Firebase", icon: "/tech/firebase-icon.svg" },
  flutter: { label: "Flutter", icon: "/tech/flutter-icon.svg" },
  git: { label: "Git", icon: "/tech/git-icon.svg" },
  github: { label: "GitHub", icon: "/tech/github-icon.svg" },
  graphql: { label: "GraphQL", icon: "/tech/graphql-icon.svg" },
  kotlin: { label: "Kotlin", icon: "/tech/kotlin-icon.svg" },
  kubernetes: { label: "Kubernetes", icon: "/tech/kubernetes-icon.svg" },
  mongodb: { label: "MongoDB", icon: "/tech/mongodb-icon.svg" },
  php: { label: "PHP", icon: "/tech/php-icon.svg" },
  postgresql: { label: "PostgreSQL", icon: "/tech/postgresql-icon.svg" },
  redis: { label: "Redis", icon: "/tech/redis-icon.svg" },
  supabase: { label: "Supabase", icon: "/tech/supabase-icon.svg" },
  svelte: { label: "Svelte", icon: "/tech/svelte-icon.svg" },
  swift: { label: "Swift", icon: "/tech/swift-icon.svg" },
  nextjs: { label: "Next.js", icon: "/tech/nextjs-icon.svg" },
};

export const PROFILE_LINK_ITEMS = [
  {
    key: "githubLink" as const,
    label: "Github",
  },
  {
    key: "blogLink" as const,
    label: "블로그",
  },
  {
    key: "portfolioLink" as const,
    label: "포트폴리오",
  },
];

export const MY_TAB_ITEMS = [
  { value: "challenges", label: "챌린지" },
  { value: "projects", label: "프로젝트" },
  { value: "comments", label: "댓글 관리" },
] as const;

export const MY_ROLE_TABS = [
  { value: "MEMBER", label: "멤버" },
  { value: "HOST", label: "호스트" },
  { value: "PENDING", label: "승인대기" },
] as const;

export const MY_CHALLENGE_STATUS_FILTERS = [
  { value: "", label: "전체" },
  { value: "RECRUITING", label: "모집중" },
  { value: "RECRUITMENT_CLOSED", label: "모집 종료" },
  { value: "IN_PROGRESS", label: "진행중" },
  { value: "COMPLETED", label: "종료" },
] as const;

export const MY_PROJECT_STATUS_FILTERS = [
  { value: "", label: "전체" },
  { value: "recruiting", label: "모집중" },
  { value: "recruitment_closed", label: "모집 완료" },
] as const;
