import { fetchClient } from "@/shared/lib/client/fetchClient";
import { UpdateProfileRequest } from "../model/edit.type";

export async function updateProfile(body: UpdateProfileRequest) {
  await fetchClient("/api/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      githubLink: body.githubLink || null,
      blogLink: body.blogLink || null,
      portfolioLink: body.portfolioLink || null,
    }),
  });
}
