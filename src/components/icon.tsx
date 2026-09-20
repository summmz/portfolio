"use client";

import {
  Activity,
  Book,
  Box,
  Briefcase,
  Database,
  Layout,
  Music,
  Orbit,
  Pen,
  Rocket,
  Terminal,
  Users,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  book: Book,
  box: Box,
  briefcase: Briefcase,
  database: Database,
  layout: Layout,
  music: Music,
  orbit: Orbit,
  pen: Pen,
  rocket: Rocket,
  terminal: Terminal,
  users: Users,
  wifi: Wifi,
  zap: Zap,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name] ?? Box;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}