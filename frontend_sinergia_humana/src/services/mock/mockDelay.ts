import { env } from "@/config/env";
import { sleep } from "@/lib/utils";

/**
 * Simula la latencia de una API real. Todos los mock services deben
 * llamar a esto antes de resolver, para que la UX (skeletons, loaders,
 * animaciones de procesamiento) se comporte igual que contra Django.
 */
export async function mockDelay(customMs?: number) {
  await sleep(customMs ?? env.mockDelayMs);
}
