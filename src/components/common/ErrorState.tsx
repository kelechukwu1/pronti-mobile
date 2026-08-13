import React from "react";

import { MESSAGES } from "@/constants/messages";

import { StateView } from "./StateView";

export interface ErrorStateProps {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = MESSAGES.common.somethingWrong,
  subtitle = MESSAGES.dashboard.loadFailed,
  onRetry,
  retryLabel = MESSAGES.common.retry,
}: ErrorStateProps) {
  return (
    <StateView
      icon="alert-triangle"
      tone="error"
      title={title}
      subtitle={subtitle}
      actionLabel={onRetry ? retryLabel : undefined}
      onAction={onRetry}
    />
  );
}
