import Image from "next/image";

const TECH_STACK = {
  react: { label: "React", icon: "/icons/tech/react-icon.svg" },
  figma: { label: "Figma", icon: "/icons/tech/figma-icon.svg" },
  golang: { label: "Golang", icon: "/icons/tech/golang-icon.svg" },
  html: { label: "HTML", icon: "/icons/tech/html-icon.svg" },
  java: { label: "Java", icon: "/icons/tech/java-icon.svg" },
  javascript: { label: "JavaScript", icon: "/icons/tech/javascript-icon.svg" },
  mysql: { label: "MySQL", icon: "/icons/tech/mysql-icon.svg" },
  nestjs: { label: "NestJs", icon: "/icons/tech/nestjs-icon.svg" },
  nodejs: { label: "Node.js", icon: "/icons/tech/nodejs-icon.svg" },
  photoshop: { label: "Photoshop", icon: "/icons/tech/photoshop-icon.svg" },
  python: { label: "Python", icon: "/icons/tech/python-icon.svg" },
  spring: { label: "Spring", icon: "/icons/tech/spring-icon.svg" },
  typescript: { label: "TypeScript", icon: "/icons/tech/typescript-icon.svg" },
  unity: { label: "Unity", icon: "/icons/tech/unity-icon.svg" },
  vuejs: { label: "Vue.js", icon: "/icons/tech/vuejs-icon.svg" },
} as const;

export function TechBadge({ tech }: { tech: keyof typeof TECH_STACK }) {
  const { icon, label } = TECH_STACK[tech];
  return (
    <div className="inline-flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1">
      <Image src={icon} alt={label} width={16} height={16} />
      <span className="text-gray-200">{label}</span>
    </div>
  );
}
