"use client";

import { useFirestoreQuery } from "./use-firestore-query";

interface WAFPillar {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  score?: number;
}

/**
 * Hook to fetch WAF pillars with their current scores
 */
export function useWAFPillars() {
  const { data: pillars, loading, error, refetch } = useFirestoreQuery<WAFPillar>("pillars");
  
  // Default pillar data if Firestore is empty
  const defaultPillars: WAFPillar[] = [
    {
      id: "security",
      name: "Security",
      slug: "security",
      description: "Protect data, systems, and assets",
      icon: "ShieldCheck",
      color: "orange",
      order: 1,
    },
    {
      id: "reliability",
      name: "Reliability",
      slug: "reliability",
      description: "Ensure workloads perform correctly",
      icon: "PanelsTopLeft",
      color: "blue",
      order: 2,
    },
    {
      id: "performance",
      name: "Performance Efficiency",
      slug: "performance-efficiency",
      description: "Use resources efficiently",
      icon: "Gauge",
      color: "green",
      order: 3,
    },
    {
      id: "cost",
      name: "Cost Optimization",
      slug: "cost-optimization",
      description: "Avoid unnecessary costs",
      icon: "PiggyBank",
      color: "yellow",
      order: 4,
    },
    {
      id: "operations",
      name: "Operational Excellence",
      slug: "operational-excellence",
      description: "Run and monitor effectively",
      icon: "Crosshair",
      color: "red",
      order: 5,
    },
  ];
  
  return {
    pillars: pillars.length > 0 ? pillars : defaultPillars,
    loading,
    error,
    refetch,
  };
}
