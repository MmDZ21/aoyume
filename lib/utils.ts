import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { type Session } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-\u0600-\u06FF]+/g, "") // Remove all non-word chars (keeping Persian/Arabic)
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

export type UserRole = "admin" | "moderator" | "translator" | "vip" | "free";

const KNOWN_ROLES = new Set<UserRole>([
  "admin",
  "moderator",
  "translator",
  "vip",
  "free",
]);

function normalizeRole(maybeRole: unknown): UserRole {
  if (typeof maybeRole !== "string") return "free";
  const role = maybeRole as UserRole;
  return KNOWN_ROLES.has(role) ? role : "free";
}

/**
 * Decode Supabase access_token (JWT) and extract your app role.
 *
 * IMPORTANT:
 * - Supabase built-in claim `role` is usually "authenticated"/"anon" and NOT your app role.
 * - Your app role is typically in `app_metadata.role` (or sometimes `app_metadata.app_role`).
 */
interface SupabaseJwtPayload {
  app_metadata?: {
    role?: string;
    app_role?: string;
  };
  user_metadata?: {
    role?: string;
  };
  user_role?: string;
  role?: string;
}

export function getRoleFromJwt(accessToken: string): UserRole {
  try {
    const decoded = jwtDecode<SupabaseJwtPayload>(accessToken);

    // Optional debug log (enable with DEBUG_JWT=true / NEXT_PUBLIC_DEBUG_JWT=true)
    const debug =
      (typeof process !== "undefined" &&
        (process.env.DEBUG_JWT === "true" ||
          process.env.NEXT_PUBLIC_DEBUG_JWT === "true")) ||
      false;
    if (debug && process.env.NODE_ENV !== "production") {
      console.log("Decoded JWT:", decoded);
    }

    const appRole =
      decoded?.app_metadata?.role ??
      decoded?.app_metadata?.app_role ??
      decoded?.user_role ??
      decoded?.user_metadata?.role;

    const builtInRole = decoded?.role;
    const candidate =
      appRole ??
      (builtInRole === "authenticated" || builtInRole === "anon"
        ? undefined
        : builtInRole);

    return normalizeRole(candidate);
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return "free";
  }
}

export function getRoleFromSession(session: Session | null): UserRole {
  const token = session?.access_token;
  if (typeof token !== "string" || token.length === 0) return "free";
  return getRoleFromJwt(token);
}

// Helper type for objects that might contain a token
export type TokenCarrier = {
  access_token?: string;
  session?: {
    access_token?: string;
  } | null;
  [key: string]: unknown;
};

/**
 * Backwards-compatible name used across the app.
 * This function **only trusts JWT token data**. If you pass a user without token, it returns "free".
 */
export function getUserRole(sessionOrTokenCarrier: TokenCarrier | null | undefined): UserRole {
  if (!sessionOrTokenCarrier) return "free";

  // Session shape: { access_token: string }
  if (typeof sessionOrTokenCarrier?.access_token === "string") {
    // We check for string type explicitly, so it is safe to pass to getRoleFromJwt
    return getRoleFromJwt(sessionOrTokenCarrier.access_token);
  }

  // Legacy shapes: { session: { access_token } }
  if (typeof sessionOrTokenCarrier?.session?.access_token === "string") {
    return getRoleFromJwt(sessionOrTokenCarrier.session.access_token);
  }

  return "free";
}

export function hasRole(
  sessionOrTokenCarrier: TokenCarrier | null | undefined,
  roles: UserRole[]
): boolean {
  const userRole = getUserRole(sessionOrTokenCarrier);
  return roles.includes(userRole);
}

export function canVerifyComments(sessionOrTokenCarrier: TokenCarrier | null | undefined): boolean {
  return hasRole(sessionOrTokenCarrier, ["admin", "moderator"]);
}
