"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { login as loginService } from "../services/login.service";

type User = {
  username: string;
  accessToken: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setUser({
        username: "",
        accessToken: token,
      });
    }

    setInitialized(true);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginService(username, password);

      const token =
        data?.accessToken ||
        data?.token ||
        data?.jwt ||
        data?.access_token;

      if (!token) {
        throw new Error("Token não encontrado na resposta da API");
      }

      Cookies.set("token", token, { expires: 7 });

      const loggedUser: User = {
        username,
        accessToken: token,
      };

      setUser(loggedUser);

      return loggedUser;
    } catch (err: any) {
      setError(err?.message || "Erro ao fazer login");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove("token");
  }, []);

  return {
    user,
    login,
    logout,
    loading,
    error,
    initialized,
  };
}