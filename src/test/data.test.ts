import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { mockups } from "@/data/mockups";
import { experience, services } from "@/data/profile";

describe("portfolio content", () => {
  it("gives every project a unique slug", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a cover mockup for every project", () => {
    const missing = projects.filter((p) => !mockups[p.slug]).map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it("only links to https sites", () => {
    for (const p of projects) {
      for (const url of [p.repo, p.live].filter(Boolean)) expect(url).toMatch(/^https:\/\//);
    }
  });

  it("keeps hover previews in step with their lists", () => {
    // Services.tsx and Experience.tsx pair rows with previews by index
    expect(services).toHaveLength(5);
    expect(experience).toHaveLength(4);
  });
});
