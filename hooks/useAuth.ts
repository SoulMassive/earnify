"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // First try to restore from localStorage for instant UI response (optimistic)
        const storedUser = localStorage.getItem("earnify_user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Local storage parse error", e);
          }
        }

        // Verify with secure server-side session (JWT cookie)
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
          // Sync local storage
          localStorage.setItem("earnify_user", JSON.stringify(data.user));
        } else {
          // If server says no user, clear state
          setUser(null);
          localStorage.removeItem("earnify_user");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
