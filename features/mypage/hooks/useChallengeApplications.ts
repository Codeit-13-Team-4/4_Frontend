"use client";

import { useQuery } from "@tanstack/react-query";
import getChallengeApplications from "../api/getChallengeApplications";
import { mypageKeys } from "../model/mypage.queryKey";

export const useChallengeApplications = (
  challengeId: number,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: mypageKeys.challengeApplications(challengeId),
    queryFn: () => getChallengeApplications({ challengeId }),
    enabled,
  });
};
