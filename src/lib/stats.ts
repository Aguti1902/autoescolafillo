import { getStats, saveStats } from "./data";

export async function trackPageView(pathname: string) {
  const stats = await getStats();
  const day = new Date().toISOString().slice(0, 10);
  stats.pageViews[pathname] = (stats.pageViews[pathname] || 0) + 1;
  stats.daily[day] = (stats.daily[day] || 0) + 1;
  stats.updatedAt = new Date().toISOString();
  await saveStats(stats);
}

export async function trackChatMessage() {
  const stats = await getStats();
  stats.chatMessages = (stats.chatMessages || 0) + 1;
  stats.updatedAt = new Date().toISOString();
  await saveStats(stats);
}
