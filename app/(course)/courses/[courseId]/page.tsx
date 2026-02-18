import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";

import { CourseActionButtons } from "./_components/courseActionButtons";

const CourseIdPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          isFree: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const firstChapter = course.chapters[0];
  const firstFreeChapter = course.chapters.find((chapter) => chapter.isFree);

  const startUrl = firstChapter
    ? `/courses/${course.id}/chapters/${firstChapter.id}`
    : undefined;
  const freePreviewUrl = firstFreeChapter
    ? `/courses/${course.id}/chapters/${firstFreeChapter.id}`
    : undefined;

  const freeChapterCount = course.chapters.filter((chapter) => chapter.isFree).length;

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-xl border bg-slate-100">
            {course.imageUrl ? (
              <Image
                fill
                priority
                src={course.imageUrl}
                alt={course.title}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Course image will appear here
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {course.title}
            </h1>
            <p className="text-base leading-7 text-slate-600">
              {course.description || "Course description is coming soon."}
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-medium text-sky-700">
                {course.chapters.length} {course.chapters.length === 1 ? "Chapter" : "Chapters"}
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                {freeChapterCount} Free Preview{freeChapterCount === 1 ? "" : "s"}
              </span>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 font-medium text-violet-700">
                {course.price ? `Price: ${formatPrice(course.price)}` : "Free Course"}
              </span>
            </div>

            <CourseActionButtons
              courseId={course.id}
              price={course.price}
              hasAccess={!!purchase}
              startUrl={startUrl}
              freePreviewUrl={freePreviewUrl}
            />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Course Content Preview</h2>
          <div className="mt-4 space-y-2">
            {course.chapters.length ? (
              course.chapters.slice(0, 6).map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="flex items-center justify-between rounded-md border bg-slate-50 px-4 py-3"
                >
                  <p className="text-sm font-medium text-slate-700">
                    {index + 1}. {chapter.title}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      chapter.isFree
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {chapter.isFree ? "Free" : "Locked"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No published chapters yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
