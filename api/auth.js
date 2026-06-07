// /api/auth.js — Vercel Serverless Function
// Auth actions: signup, signin, verify — powered by Supabase

import { createClient } from "@supabase/supabase-js";
import {
  applyStandardApiHeaders,
  handleOptionsAndMethod,
  respondRateLimit,
  validateJsonRequest,
} from "./_apiCommon.js";
import { checkRateLimit, getClientIp } from "./_rateLimit.js";
import {
  logRequestStart,
  logRateLimitCheck,
  logValidationError,
  logSuccess,
  logError,
} from "./_logging.js";

const VALID_ACTIONS = new Set(["signup", "signin", "verify"]);
const EMAIL_RE = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;
const AUTH_RATE_LIMIT = { max: 10, windowMs: 60 * 60 * 1000 };

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );
}

export default async function handler(req, res) {
  logRequestStart(req, "auth", req.headers["x-vercel-id"] || "");
  applyStandardApiHeaders(req, res, "POST, OPTIONS", "Content-Type");

  if (handleOptionsAndMethod(req, res, "POST")) return;
  if (
    !validateJsonRequest(req, res, {
      requestId: "",
      endpoint: "auth",
      maxBytes: 10_000,
      logValidationError,
    })
  ) {
    return;
  }

  const ip = getClientIp(req);
  const rlResult = await checkRateLimit(req, AUTH_RATE_LIMIT);
  logRateLimitCheck("", "auth", rlResult, ip);
  if (respondRateLimit(res, rlResult)) return;

  const { action, email, password } = req.body ?? {};

  // Validate action
  if (!action || !VALID_ACTIONS.has(action)) {
    logValidationError("", "auth", "Invalid or missing action", "action");
    return res
      .status(400)
      .json({ error: "action must be one of: signup, signin, verify" });
  }

  // For verify: extract Bearer token from Authorization header
  if (action === "verify") {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"] || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization header with Bearer token required" });
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data?.user) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      logSuccess("", "auth", 200, 0, rlResult);
      return res.status(200).json({ user: data.user });
    } catch (err) {
      logError("", "auth", err, 500, 0);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // For signup/signin: validate email and password
  if (!email || !EMAIL_RE.test(email)) {
    logValidationError("", "auth", "Invalid email", "email");
    return res
      .status(400)
      .json({ error: "email is required and must be a valid email address" });
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    logValidationError("", "auth", "Password too short", "password");
    return res
      .status(400)
      .json({ error: "password must be at least 8 characters" });
  }

  const supabase = getSupabase();

  if (action === "signup") {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        if (
          error.message &&
          error.message.toLowerCase().includes("already registered")
        ) {
          return res.status(409).json({ error: "Email already registered" });
        }
        return res
          .status(400)
          .json({ error: error.message || "Signup failed" });
      }
      logSuccess("", "auth", 200, 0, rlResult);
      return res.status(200).json({ user: data.user });
    } catch (err) {
      logError("", "auth", err, 500, 0);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (action === "signin") {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      logSuccess("", "auth", 200, 0, rlResult);
      return res.status(200).json({ session: data.session });
    } catch (err) {
      logError("", "auth", err, 500, 0);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
