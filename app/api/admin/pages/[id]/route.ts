import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma, StatsSection } from "@prisma/client";

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
              const { mission, vision } = componentData;
            
              section = await db.beliefsSection.create({
                data: {
                  missionTitle: mission.heading,
                  missionText: mission.description,
                  missionPoints: mission.points,
                  visionTitle: vision.heading,
                  visionText: vision.description, // or description if added later
                  visionPoints: vision.points,
                },
              });
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