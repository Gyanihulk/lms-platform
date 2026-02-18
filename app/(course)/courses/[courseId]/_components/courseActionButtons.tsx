"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseActionButtonsProps {
  courseId: string;
  price: number | null;
  hasAccess: boolean;
  startUrl?: string;
  freePreviewUrl?: string;
}

export const CourseActionButtons = ({
  courseId,
  price,
  hasAccess,
  startUrl,
  freePreviewUrl,
}: CourseActionButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onBuyCourse = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch {
      toast.error("Could not start checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {startUrl ? (
        <Button asChild>
          <Link href={startUrl}>{hasAccess ? "Continue Course" : "Start Course"}</Link>
        </Button>
      ) : (
        <Button disabled>Start Course</Button>
      )}

      {!hasAccess && (
        <Button
          variant="secondary"
          onClick={onBuyCourse}
          disabled={isLoading || price === null}
        >
          {price !== null ? `Buy Course - ${formatPrice(price)}` : "Buy Course"}
        </Button>
      )}

      {freePreviewUrl ? (
        <Button variant="outline" asChild>
          <Link href={freePreviewUrl}>Check Free Videos</Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          No Free Videos
        </Button>
      )}
    </div>
  );
};
