export type TabId = "detail" | "member" | "comment";

export const PROJECT_DETAIL_TABS: {
  id: TabId;
  label: string;
  sectionId: string;
}[] = [
  { id: "detail", label: "상세정보", sectionId: "detail-section" },
  { id: "member", label: "멤버", sectionId: "member-section" },
  { id: "comment", label: "댓글", sectionId: "comment-section" },
];
