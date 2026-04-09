type SearchParamsLike =
  | {
      toString(): string;
    }
  | null
  | undefined;

function isBlockedRedirectPath(pathname: string) {
  //이화면들로는 리다이렉트 안한다
  return (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/auth/callback")
  );
}

export function getSafeRedirectPath(redirectPath: string | null | undefined) {
  //되돌아갈곳없으면 null
  if (
    !redirectPath ||
    !redirectPath.startsWith("/") ||
    redirectPath.startsWith("//")
  ) {
    return null;
  }

  try {
    const redirectUrl = new URL(redirectPath, "http://localhost");

    if (isBlockedRedirectPath(redirectUrl.pathname)) {
      return null;
    }

    return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`; //있으면 주소로
  } catch {
    return null;
  }
}

export function buildPathWithQuery( //서버컴포넌트에선 라우터 못써서 쿼리있을때 사용
  pathname: string,
  params: Record<string, string | null | undefined>,
) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    //인자들꺼내서
    if (value) {
      query.set(key, value);
    }
  }

  const queryString = query.toString();

  if (!queryString) {
    return pathname;
  }

  return `${pathname}?${queryString}`; //쿼리 만들어줌
}

export function buildCurrentPath( //쿼리를 만들지않고 지금꺼로부터 가져옴
  pathname: string,
  searchParams?: SearchParamsLike,
) {
  const queryString = searchParams?.toString();

  if (!queryString) {
    return pathname;
  }

  return `${pathname}?${queryString}`;
}

export function buildLoginPath( //로그인하는 화면 이동할때 현재위치 넣어주기위해
  redirectPath?: string | null,
  extraParams: Record<string, string | null | undefined> = {},
) {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);

  return buildPathWithQuery("/login", {
    ...extraParams,
    redirect: safeRedirectPath,
  });
}

export function buildSignupPath( //회원가입하는 화면 이동할때 현재위치 넣어주기위해
  redirectPath?: string | null,
  extraParams: Record<string, string | null | undefined> = {},
) {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);

  return buildPathWithQuery("/signup", {
    ...extraParams,
    redirect: safeRedirectPath,
  });
}
