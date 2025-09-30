"use client";

import { get, set } from "idb-keyval";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const IDB_KEY = "wishlist.ids.v1"; // compatible with earlier data
const LS_KEY = "wishlist.ids"; // one-time migrate from localStorage
const CHANNEL = "wishlist-sync";

function parseArray(json: string | null): string[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? (v as string[]) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  const readyRef = useRef(false);

  // initial load + one-time migration
  useEffect(() => {
    let mounted = true;
    (async () => {
      const fromIDB = await get<string[]>(IDB_KEY);
      let next = Array.isArray(fromIDB) ? fromIDB : [];
      if (!next.length) {
        const fromLS = parseArray(
          typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null
        );
        if (fromLS.length) {
          next = fromLS;
          await set(IDB_KEY, next);
          try {
            localStorage.removeItem(LS_KEY);
          } catch {}
        }
      }
      if (mounted) {
        setIds(next);
        readyRef.current = true;
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // cross-tab sync
  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;
    const bc = new BroadcastChannel(CHANNEL);
    bc.onmessage = (e) => {
      if (Array.isArray(e.data)) setIds(e.data as string[]);
    };
    return () => bc.close();
  }, []);

  const publish = (next: string[]) => {
    if (!("BroadcastChannel" in window)) return;
    const bc = new BroadcastChannel(CHANNEL);
    bc.postMessage(next);
    bc.close();
  };

  const write = useCallback(
    async (updater: (prev: string[]) => string[]) => {
      const prev = readyRef.current
        ? ids
        : (await get<string[]>(IDB_KEY)) ?? [];
      const next = updater(prev);
      setIds(next);
      await set(IDB_KEY, next);
      publish(next);
    },
    [ids]
  );

  const add = useCallback(
    (id: string) => {
      void write((p) => (p.includes(id) ? p : [...p, id]));
    },
    [write]
  );
  const remove = useCallback(
    (id: string) => {
      void write((p) => p.filter((x) => x !== id));
    },
    [write]
  );
  const toggle = useCallback(
    (id: string) => {
      void write((p) =>
        p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
      );
    },
    [write]
  );
  const clear = useCallback(() => {
    void write(() => []);
  }, [write]);
  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return useMemo(
    () => ({
      ids,
      add,
      remove,
      toggle,
      clear,
      has,
      isReady: readyRef.current,
    }),
    [ids, add, remove, toggle, clear, has]
  );
}
