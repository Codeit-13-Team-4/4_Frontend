import { TiptapViewer } from "@/shared/ui/TiptapEditor/TiptapViewer";

interface ChallengeDetailContentProps {
  description: string;
}

export default function ChallengeDetailContent({
  description,
}: ChallengeDetailContentProps) {
  return <TiptapViewer content={description} />;
}
