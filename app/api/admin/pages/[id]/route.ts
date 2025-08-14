import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma, StatsSection } from "@prisma/client";

async function syncWeWorkMentors(sectionId: string, mentorsPayload: any) {
  // Load current mentors for this section
  const existing = await db.mentor.findMany({
    where: { weWorkSectionId: sectionId },
    select: { id: true },
  });
  const existingIds = new Set(existing.map(m => m.id));

  // --------- SHAPE A: plain array ----------
  if (Array.isArray(mentorsPayload)) {
    const incoming = mentorsPayload;

    const incomingIds = new Set(incoming.map((m: any) => m.id).filter(Boolean));

    const toCreate = incoming.filter((m: any) => !m.id);
    const toUpdate = incoming.filter((m: any) => m.id && existingIds.has(m.id));
    const toDelete = Array.from(existingIds).filter(id => !incomingIds.has(id)); // delete removed

    await Promise.all([
      // create new (no id)
      ...toCreate.map((m: any) =>
        db.mentor.create({
          data: {
            name: m.name,
            profession: m.profession,
            imgSrc: m.imgSrc,
            linkedin: m.linkedin ?? null,
            weWorkSectionId: sectionId,
          },
        })
      ),
      // update existing
      ...toUpdate.map((m: any) =>
        db.mentor.update({
          where: { id: m.id },
          data: {
            name: m.name,
            profession: m.profession,
            imgSrc: m.imgSrc,
            linkedin: m.linkedin ?? null,
            weWorkSectionId: sectionId,
          },
        })
      ),
      // delete removed
      ...toDelete.map((id) => db.mentor.delete({ where: { id } })),
    ]);

    return;
  }

  // --------- SHAPE B: envelope: { upsert, delete } ----------
  if (mentorsPayload && typeof mentorsPayload === 'object') {
    const { upsert = [], delete: deletes = [] } = mentorsPayload as {
      upsert?: Array<{ where: { id: string }, update: any, create: any }>;
      delete?: Array<{ id: string }>;
    };

    const upsertIds = new Set(
      upsert.map((u) => u?.where?.id).filter(Boolean)
    );

    await Promise.all([
      // perform upserts
      ...upsert.map((u) =>
        db.mentor.upsert({
          where: { id: u.where.id },
          update: {
            ...u.update,
            weWorkSectionId: sectionId,
          },
          create: {
            ...u.create,
            id: u.where.id, // keep client id (optional if DB generates)
            weWorkSectionId: sectionId,
          },
        })
      ),
      // explicit deletes from envelope
      ...deletes.map((d: any) => db.mentor.delete({ where: { id: d.id } })),
    ]);

    // (optional) prune any mentor not present in upsertIds if you want strict sync
    // const toPrune = [...existingIds].filter(id => !upsertIds.has(id));
    // await db.mentor.deleteMany({ where: { id: { in: toPrune } } });

    return;
  }

  // nothing to do
}



async function syncFAQItems(sectionId: string, itemsPayload: any) {
  // Load existing items for this section
  const existing = await db.fAQItem.findMany({
    where: { fAQSectionId: sectionId },
    select: { id: true },
  });
  const existingIds = new Set(existing.map(i => i.id));

  // We support simple array payload: [{ id?, question, answer }]
  if (Array.isArray(itemsPayload)) {
    const incoming = itemsPayload;

    const incomingIds = new Set(incoming.map((i: any) => i.id).filter(Boolean));
    const toCreate = incoming.filter((i: any) => !i.id);
    const toUpdate = incoming.filter((i: any) => i.id && existingIds.has(i.id));
    const toDelete = Array.from(existingIds).filter(id => !incomingIds.has(id)); // prune removed

    await Promise.all([
      // create new (no id)
      ...toCreate.map((i: any) =>
        db.fAQItem.create({
          data: {
            question: i.question,
            answer: i.answer,
            fAQSectionId: sectionId,
          },
        })
      ),
      // update existing
      ...toUpdate.map((i: any) =>
        db.fAQItem.update({
          where: { id: i.id },
          data: {
            question: i.question,
            answer: i.answer,
          },
        })
      ),
      // delete removed
      ...toDelete.map((id) => db.fAQItem.delete({ where: { id } })),
    ]);

    return;
  }

  // (Optional) If you ever send Prisma-style envelopes:
  // itemsPayload = { upsert: [...], delete: [...] }
  if (itemsPayload && typeof itemsPayload === 'object') {
    const { upsert = [], delete: deletes = [] } = itemsPayload as {
      upsert?: Array<{ where: { id: string }, update: any, create: any }>;
      delete?: Array<{ id: string }>;
    };

    await Promise.all([
      ...upsert.map((u) =>
        db.fAQItem.upsert({
          where: { id: u.where.id },
          update: { ...u.update, fAQSectionId: sectionId },
          create: { ...u.create, id: u.where.id, fAQSectionId: sectionId },
        })
      ),
      ...deletes.map((d) => db.fAQItem.delete({ where: { id: d.id } })),
    ]);
  }
}


const supportedModels: Record<string, any> = {
  HighlightSection: db.highlightSection,
  BannerSection: db.bannerSection,
  StatsSection: db.statsSection,
  FAQSection: db.fAQSection,
  TestimonialSection: db.testimonialSection,
  WeWorkSection: db.weWorkSection,
  BeliefsSection: db.beliefsSection,
  JoinUsSection: db.joinUsSection,
  ProgramsGridSection: db.programsGridSection,
  DedicatedSection: db.dedicatedSection,
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const page = await db.page.findUnique({
      where: { id: params.id },
      include: {
        blocks: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Load full component data for each block
    const blocksWithData = await Promise.all(
      page.blocks.map(async (block) => {
        const model = supportedModels[block.type];
        if (!model) return block;

        const componentData = await model.findUnique({
          where: { id: block.componentId },
          include:  block.type === "StatsSection"
          ? { stats: true }
          : block.type === "TestimonialSection"
          ? { testimonials: true }
          : block.type === "FAQSection"
          ? { items: true }
          : block.type === "WeWorkSection"
          ? { mentors: true }
          : undefined,
        });

        return {
          ...block,
          data: componentData,
        };
      })
    );

    return NextResponse.json({
      ...page,
      blocks: blocksWithData,
    });

  } catch (error) {
    console.error("[GET_PAGE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
function sanitizeUpdateData(data: Record<string, any>) {
  const { id, createdAt, updatedAt, ...cleanData } = data
  return cleanData
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const pageId = params.id;
  console.log(`[REQUEST] Update page ID: ${pageId}`);

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("[ERROR] Invalid JSON body:", err);
    return NextResponse.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  const { slug, title, components } = body;
  console.log("[BODY]", { slug, title, componentsCount: components?.length });

  try {
    const page = await db.page.update({
      where: { id: pageId },
      data: { slug, title },
    });
    console.log("[PAGE UPDATED]", page);

    const supportedModels: Record<string, any> = {
      HighlightSection: db.highlightSection,
      BannerSection: db.bannerSection,
      StatsSection: db.statsSection,
      FAQSection: db.fAQSection,
      TestimonialSection: db.testimonialSection,
      WeWorkSection: db.weWorkSection,
      BeliefsSection: db.beliefsSection,
      JoinUsSection: db.joinUsSection,
      ProgramsGridSection: db.programsGridSection,
      DedicatedSection: db.dedicatedSection 
    };

    const componentResponses = [];

    if (Array.isArray(components)) {
      for (let index = 0; index < components.length; index++) {
        

        const comp = components[index];
        const {
          type,
          componentData,
          componentId, // optional
          sortOrder = index,
        } = comp;

        console.log(`\n[COMPONENT ${index}] Type: ${type}`);
        const model = supportedModels[type];

        if (!model) {
          console.warn(`[SKIPPED] Unsupported component type: ${type}`);
          continue;
        }

        let section:any;
        let sectionIdForLink: string | undefined;
        try {
          if (componentId) {
            console.log(`[UPDATE] Updating existing ${type} with ID: ${componentId}`);
            if (type === "StatsSection") {
              // 1. Update section fields if any
              section = await db.statsSection.update({
                where: { id: componentId },
                data: {},
              })
            
              // 2. Manually sync stats
              const incomingStats = componentData.stats || []
            
              const existingStats = await db.statItem.findMany({
                where: { sectionId: componentId }
              })
            
              const incomingIds = new Set(incomingStats.map((s: any) => s.id).filter(Boolean))
              const existingIds = new Set(existingStats.map((s: any) => s.id))
            
              const toCreate = incomingStats.filter((s: any) => !s.id)
              const toUpdate = incomingStats.filter((s: any) => s.id && existingIds.has(s.id))
              const toDelete = existingStats.filter((s: any) => !incomingIds.has(s.id))
            
              await Promise.all([
                ...toCreate.map((stat: any) =>
                  db.statItem.create({
                    data: {
                      ...stat,
                      sectionId: componentId,
                    },
                  })
                ),
                ...toUpdate.map((stat: any) =>
                  db.statItem.update({
                    where: { id: stat.id },
                    data: {
                      icon: stat.icon,
                      value: stat.value,
                      label: stat.label,
                      suffix: stat.suffix || null,
                      textColor: stat.textColor || null,
                    },
                  })
                ),
                ...toDelete.map((stat: any) =>
                  db.statItem.delete({
                    where: { id: stat.id },
                  })
                ),
              ])
            }  else if (type === "WeWorkSection") {
              // 1) Update section fields only
              const safeData = sanitizeUpdateData(componentData);
              delete (safeData as any).mentors;
            
              section = await db.weWorkSection.update({
                where: { id: componentId },
                data: safeData,
              });
            
              // 2) Sync mentors separately (array or envelope)
              if (componentData?.mentors) {
                console.log('[WeWorkSection] syncing mentors (update)…');
                await syncWeWorkMentors(section.id, componentData.mentors);
              }
            
              // 3) Reliable id for linking
              sectionIdForLink = componentId; // on update we already know it
            }
             else if (type === "BeliefsSection") {
              // Load current so we can preserve when fields are omitted
              const existing = await db.beliefsSection.findUnique({
                where: { id: componentId },
              });
            
              // Support both payload shapes:
              // 1) Nested: { mission: { heading, description, points }, vision: {...} }
              // 2) Flat:   { missionTitle, missionText, missionPoints, visionTitle, visionText, visionPoints }
              const { mission, vision, ...flat } = componentData ?? {};
            
              const nextMissionTitle =
                mission?.heading ?? flat.missionTitle ?? existing?.missionTitle ?? "";
              const nextMissionText =
                mission?.description ?? flat.missionText ?? existing?.missionText ?? "";
              const nextMissionPoints =
                (Array.isArray(mission?.points) && mission!.points) ||
                (Array.isArray(flat.missionPoints) && flat.missionPoints) ||
                existing?.missionPoints ||
                [];
            
              const nextVisionTitle =
                vision?.heading ?? flat.visionTitle ?? existing?.visionTitle ?? "";
              const nextVisionText =
                vision?.description ?? flat.visionText ?? existing?.visionText ?? "";
              const nextVisionPoints =
                (Array.isArray(vision?.points) && vision!.points) ||
                (Array.isArray(flat.visionPoints) && flat.visionPoints) ||
                existing?.visionPoints ||
                [];
            
              section = await db.beliefsSection.update({
                where: { id: componentId },
                data: {
                  missionTitle: nextMissionTitle,
                  missionText: nextMissionText,
                  missionPoints: nextMissionPoints,
                  visionTitle: nextVisionTitle,
                  visionText: nextVisionText,
                  visionPoints: nextVisionPoints,
                },
              });
            }else if (type === "TestimonialSection") {
              // 1) Update section fields (title/subtitle)
              section = await db.testimonialSection.update({
                where: { id: componentId },
                data: {
                  title: componentData.title ?? null,
                  subtitle: componentData.subtitle ?? null,
                },
              });
            
              // 2) Sync testimonials (expects componentData.testimonials = Array of items)
              //    Each item: { id?: string, name, profession, comment, imgSrc, rating }
              const incoming = Array.isArray(componentData.testimonials)
                ? componentData.testimonials
                : [];
            
              // Load existing
              const existing = await db.testimonial.findMany({
                where: { sectionId: componentId },
                select: { id: true },
              });
            
              const existingIds = new Set(existing.map((t) => t.id));
              const incomingIds = new Set(incoming.map((t: any) => t.id).filter(Boolean));
            
              const toCreate = incoming.filter((t: any) => !t.id);
              const toUpdate = incoming.filter(
                (t: any) => t.id && existingIds.has(t.id)
              );
              const toDelete = Array.from(existingIds).filter((id) => !incomingIds.has(id));
            
              // Apply changes
              await Promise.all([
                // create new
                ...toCreate.map((t: any) =>
                  db.testimonial.create({
                    data: {
                      sectionId: componentId,
                      name: t.name,
                      profession: t.profession,
                      comment: t.comment,
                      imgSrc: t.imgSrc,
                      rating: t.rating ?? 0,
                    },
                  })
                ),
                // update existing
                ...toUpdate.map((t: any) =>
                  db.testimonial.update({
                    where: { id: t.id },
                    data: {
                      name: t.name,
                      profession: t.profession,
                      comment: t.comment,
                      imgSrc: t.imgSrc,
                      rating: t.rating ?? 0,
                    },
                  })
                ),
                // delete removed
                ...toDelete.map((id) =>
                  db.testimonial.delete({ where: { id } })
                ),
              ]);
            
              // (optional) reload full section with testimonials
              section = await db.testimonialSection.findUnique({
                where: { id: componentId },
                include: { testimonials: true },
              });
            }else if (type === "FAQSection") {
              // 1) Update section fields only (strip nested items)
              const safeData = sanitizeUpdateData(componentData);
              delete (safeData as any).items;
            
               section = await db.fAQSection.update({
                where: { id: componentId },
                data: { title: safeData.title ?? null },
              });
            
              // 2) Sync items separately (array or envelope)
              if (componentData?.items) {
                console.log("[FAQSection] syncing items (update)...");
                await syncFAQItems(componentId, componentData.items);
              }
            
              // 3) (optional) reload if you need it
              section = await db.fAQSection.findUnique({
                where: { id: componentId },
                include: { items: true },
              });
            
              // make sure your linking upsert uses componentId (on update)
              sectionIdForLink = componentId;
            }else{
            
              const safeData = sanitizeUpdateData(componentData)
  
              section = await model.update({
                where: { id: componentId },
                data: safeData,
              });
            }
           
          } else {
            console.log(`[CREATE] Creating new ${type}`);
            if (type === "StatsSection" && componentData.stats) {
              // First create the StatsSection
              section = await db.statsSection.create({
                data: {},
              });

              // Then bulk create StatItem[] using the returned section.id
              await Promise.all(
                componentData.stats.map((stat: any) =>
                  db.statItem.create({
                    data: {
                      icon: stat.icon,
                      value: stat.value,
                      label: stat.label,
                      suffix: stat.suffix || null,
                      textColor: stat.textColor || null,
                      sectionId: section.id,
                    },
                  })
                )
              );

            } else if (type === "TestimonialSection" && componentData.testimonials?.create) {
              console.log(`[CREATE] Creating new TestimonialSection`);
            
              // Step 1: Create TestimonialSection
              section = await db.testimonialSection.create({
                data: {
                  title: componentData.title,
                  subtitle: componentData.subtitle,
                },
              });
            
              // Step 2: Create nested testimonials and link via testimonialSectionId
              await Promise.all(
                componentData.testimonials.create.map((t: any) =>
                  db.testimonial.create({
                    data: {
                      name: t.name,
                      profession: t.profession,
                      comment: t.comment,
                      imgSrc: t.imgSrc,
                      rating: t.rating,
                      sectionId: section.id, 
                    },
                  })
                )
              )
            
              // Optional: fetch full data back
              section = await db.testimonialSection.findUnique({
                where: { id: section.id },
                include: { testimonials: true },
              });
            }else if (type === "BeliefsSection") {
              const { mission, vision, ...flat } = componentData ?? {};
            
              const missionTitle = mission?.heading ?? flat.missionTitle ?? "";
              const missionText = mission?.description ?? flat.missionText ?? "";
              const missionPoints =
                (Array.isArray(mission?.points) && mission!.points) ||
                (Array.isArray(flat.missionPoints) && flat.missionPoints) ||
                [];
            
              const visionTitle = vision?.heading ?? flat.visionTitle ?? "";
              const visionText = vision?.description ?? flat.visionText ?? "";
              const visionPoints =
                (Array.isArray(vision?.points) && vision!.points) ||
                (Array.isArray(flat.visionPoints) && flat.visionPoints) ||
                [];
            
              section = await db.beliefsSection.create({
                data: {
                  missionTitle,
                  missionText,
                  missionPoints,
                  visionTitle,
                  visionText,
                  visionPoints,
                },
              });
            }else if (type === "WeWorkSection") {
              console.log(`[CREATE] Creating new WeWorkSection`);
            
              const { mentors, ...safe } = componentData ?? {};
            
              // 1) Create section WITHOUT nested mentors
              section = await db.weWorkSection.create({
                data: {
                  title: safe?.title ?? null,
                  subtitle: safe?.subtitle ?? null,
                },
              });
            
              // 2) Sync mentors via helper
              if (mentors) {
                console.log('[WeWorkSection] syncing mentors (create)…');
                await syncWeWorkMentors(section.id, mentors);
              }
            
              // 3) (optional) reload full section
              section = await db.weWorkSection.findUnique({
                where: { id: section.id },
                include: { mentors: true },
              });
            
              // 4) Reliable id for linking
              sectionIdForLink = section?.id;
            }else if (type === "FAQSection") {
              console.log(`[CREATE] Creating new FAQSection`);
            
              const { items, ...safe } = componentData ?? {};
            
              // 1) Create section WITHOUT nested items
               section = await db.fAQSection.create({
                data: {
                  title: safe?.title ?? null,
                },
              });
            
              // 2) Sync items separately
              if (items) {
                console.log("[FAQSection] syncing items (create)...");
                await syncFAQItems(section.id, items);
              }
            
              // 3) (optional) reload full section
              section = await db.fAQSection.findUnique({
                where: { id: section.id },
                include: { items: true },
              });
            
              sectionIdForLink = section?.id;
            }
            else {
              section = await model.create({ data: componentData });
            }
          }
        } catch (err) {
          console.error(`[ERROR] ${type} create/update failed:`, err);
          continue;
        }

        try {
          console.log(`[UPSERT] Linking component to page with upsert`);
          await db.pageComponent.upsert({
            where: {
              pageId_componentId_type: {
                pageId,
                componentId: section.id,
                type,
              },
            },
            update: { sortOrder },
            create: {
              pageId,
              type,
              componentId: section.id,
              sortOrder,
            },
          });
        } catch (err) {
          console.error("[UPSERT ERROR] Failed to link component to page:", err);
        }

        componentResponses.push({
          type,
          sectionId: section.id,
        });
      }
    }

    console.log("[SUCCESS] Page updated with components");
    return NextResponse.json({
      message: "Page and components updated successfully",
      page,
      components: componentResponses,
    });
  } catch (error) {
    console.error("[PAGE_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update page or components" },
      { status: 500 }
    );
  }
}
