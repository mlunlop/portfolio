import { createContext, useContext, useRef, useSyncExternalStore, useCallback, type ReactNode } from "react";

export type CursorType = "default" | "text" | "block";

export interface CursorState {
  type: CursorType;
  rect?: DOMRect | null;
  radius?: string;
  lineHeight?: number;
  activeElement?: HTMLElement | null;
  stickiness?: boolean;
}

interface CursorContextType {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => CursorState;
  setConfig: (config: CursorState) => void;
  updateCursor: (config: Partial<CursorState>) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<{
    config: CursorState;
    listeners: Set<() => void>;
  }>({
    config: {
      type: "default",
      rect: null,
      activeElement: null,
    },
    listeners: new Set(),
  });

  const subscribe = useCallback((listener: () => void) => {
    storeRef.current.listeners.add(listener);
    return () => {
      storeRef.current.listeners.delete(listener);
    };
  }, []);

  const getSnapshot = useCallback(() => storeRef.current.config, []);

  const setConfig = useCallback((newConfig: CursorState) => {
    storeRef.current.config = newConfig;
    storeRef.current.listeners.forEach((cb) => cb());
  }, []);

  const updateCursor = useCallback((updates: Partial<CursorState>) => {
    storeRef.current.config = { ...storeRef.current.config, ...updates };
    storeRef.current.listeners.forEach((cb) => cb());
  }, []);

  return (
    <CursorContext.Provider value={{ subscribe, getSnapshot, setConfig, updateCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  const config = useSyncExternalStore(context.subscribe, context.getSnapshot, context.getSnapshot);

  return {
    config,
    setConfig: context.setConfig,
    updateCursor: context.updateCursor,
  };
}
