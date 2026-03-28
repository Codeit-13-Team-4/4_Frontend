const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSideProjectList() {
  try {
    const response = await fetch(`${BASE_URL}/projects?start=0&perPage=10`);
    console.log("🚀 ~ getSideProjectList ~ response:", response.status);
    if (!response.ok) {
      throw new Error(
        `사이드 프로젝트 목록을 불러오는데 실패했습니다. (${response.status})`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("getSideProjectLists error:", error);
    throw error;
  }
}

export async function getSideProjectSearchList(keyword?: string) {
  console.log("🚀 ~ getSideProjectSearchList ~ keyword:", keyword);
  // try {
  //   const query = keyword ? `&q=${keyword}` : "";

  //   const response = await fetch(
  //     `${BASE_URL}/projects?start=0&perPage=10${query}`,
  //   );
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error(error);
  // }
}
