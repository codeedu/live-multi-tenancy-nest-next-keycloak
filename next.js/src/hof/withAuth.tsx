import { getPayload, isTokenExpired } from "../util/auth";
import { parseCookies } from "../util/cookies";

export function withAuth(func: any) {
  return async (ctx: any) => {
    const cookies = parseCookies(ctx.req);

    if (!cookies.token || isTokenExpired(cookies.token)) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const payload = getPayload(cookies.token);

    const result = await func(ctx, cookies, payload);
    if ("props" in result) {
      result.props = {
        payload,
        ...result.props,
      };
    }

    return result;
  };
}
