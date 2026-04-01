export async function readNotification(id: number): Promise<void> {
  const response = await fetch(`/api/notifications/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "알림 읽음 처리에 실패했습니다.");
  }
}
