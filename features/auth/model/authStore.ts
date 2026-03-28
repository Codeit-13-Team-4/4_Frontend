import { User } from "@/shared/types/user";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  user: null as User | null,
  isAuthenticated: false,
};

const useAuthStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setUser: (user: User) => {
          set({ user, isAuthenticated: true });
        },
        clearUser: () => {
          set({ user: null, isAuthenticated: false });
        },
      },
    })),
    { name: "authStore" },
  ),
);

export const useUserData = () => {
  const user = useAuthStore((store) => store.user);
  return user;
};

export const useIsAuthenticated = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
  return isAuthenticated;
};

export const useSetUser = () => {
  const setUser = useAuthStore((store) => store.actions.setUser);
  return setUser;
};

export const useClearUser = () => {
  const clearUser = useAuthStore((store) => store.actions.clearUser);
  return clearUser;
};
