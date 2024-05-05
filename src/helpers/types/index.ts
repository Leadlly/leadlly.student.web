import React from "react";

export type TContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export type TLogoProps = {
  fullLogoWidth: number;
  fullLogoHeight: number;
  fullLogoClassName: string;
  smallLogoWidth: number;
  smallLogoHeight: number;
  smallLogoClassName: string;
};

export type TSidebarLink = {
  label: string;
  icon: React.ComponentType<{ stroke: string }>;
  href: string;
};

export type THeaderProps = {
  title: string;
  className?: string;
  icon?: React.ReactNode;
  titleClassName?: string;
};

export type TDashboardTodaysTopic = {
  label: string;
  completed: boolean;
};

export type TTabNavItemProps = {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

export type TTabContentProps = {
  id: string;
  activeTab: string;
  children: React.ReactNode;
};

export type TSemiRadialChartProps = {
  series: number[];
  colors: string[];
  chartLabel: string;
};

export type TLevelPointProps = {
  cardBgColor: string;
  iconImageSrc: string;
  iconAltText: string;
  iconShadowColor?: string;
  chevronBgColor: string;
  pointsColor: string;
  points: number;
  pointsText: string;
  progressValue?: number;
  progressIndicatorBg?: string;
  pointsProgressText?: string;
  pointsProgressTextColor?: string;
  progressIconStroke?: string;
};

export type TMoodEmojisProps = {
  mood: string;
  mood_id: string;
};
