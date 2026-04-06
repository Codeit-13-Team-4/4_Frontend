import { fetchClient } from "@/shared/lib/client/fetchClient";
import {
  ContactMethod,
  PositionType,
  ProjectType,
  TechStackType,
} from "../model";

interface CreateSideProjectBody {
  title: string;
  description: string;
  projectType: ProjectType;
  techStacks: TechStackType[];
  positions: PositionType[];
  maxMembers: number;
  recruitEndDate: string;
  projectStartDate: string;
  projectEndDate: string;
  contactMethod: ContactMethod;
  contactLink: string;
}

export async function createSideProject(body: CreateSideProjectBody) {
  const response = await fetchClient("/api/projects/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}
