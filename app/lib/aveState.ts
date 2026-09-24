"use client";

type Listener = (aveId: number | string | null) => void;
const listeners: Set<Listener> = new Set();
let currentAveId: number | string | null = null;

export const abrirAveModalGlobal = (id: number | string) => {
  currentAveId = id;
  listeners.forEach((listener) => listener(currentAveId));
};

export const cerrarAveModalGlobal = () => {
  currentAveId = null;
  listeners.forEach((listener) => listener(currentAveId));
};

export const suscribirAveModal = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};