import { ReactNode } from "react";

export interface StatusCardProps {
  start_adornment: ReactNode;
  onClick?: () => void;
  total: number;
  card_title: string;
}
