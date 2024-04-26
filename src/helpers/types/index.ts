import React from "react";

export type TContainerProps = {
  children: React.ReactNode;
  className?: string;
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
  titleSize?: string;
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
