// To swap users: change this single import path to a different JSON file.
import data from "./morten-garden-data.json";

export type GardenData = typeof data;
export type Space = GardenData["spaces"][number];
export type Plant = GardenData["plants"][number];

export const gardenData: GardenData = data as GardenData;

export function getSpace(id: string): Space | undefined {
  return gardenData.spaces.find((s) => s.id === id);
}
export function getPlant(id: string): Plant | undefined {
  return gardenData.plants.find((p) => p.id === id);
}
export function getPlantsForSpace(spaceId: string): Plant[] {
  return gardenData.plants.filter((p) => p.space_id === spaceId);
}

// Map a plant or space status string to a visual variant.
export type Variant = "ok" | "warn" | "danger";
export function statusVariant(status?: string | null): Variant {
  if (!status) return "ok";
  const s = status.toLowerCase();
  if (["healthy", "excellent", "good", "decent", "okay", "ok", "mostly_healthy", "thriving"].includes(s)) return "ok";
  if (["struggling", "declining"].includes(s)) return "danger";
  return "warn"; // stressed, recovering, needs_attention, etc.
}
export function badgeClass(v: Variant): string {
  return v === "ok" ? "badge-ok" : v === "danger" ? "badge-danger" : "badge-warn";
}

export function formatDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
