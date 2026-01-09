"use client";

import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function CopyablePassword({ password, className = "" }) {
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTooltipOpen(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  return (
    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <TooltipTrigger asChild>
        <span
          className={`cursor-pointer ${className}`}
          onClick={handleCopy}
        >
          {password}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        {copied ? "Copied!" : "Click to copy"}
      </TooltipContent>
    </Tooltip>
  );
}
