// app/(home)/_components/Dedicated/index.tsx
import Image from "next/image";

export type DedicatedProps = {
  title: string;
  subtitle?: string;
  points: string[];
  imageSrc: string;          // main image (right now on the left column)
  commaSrc?: string;         // small decorative image
  spiralSrc?: string;        // background spiral image
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
};

export default function Dedicated({
  title,
  subtitle = "",
  points,
  imageSrc,
  commaSrc = "/images/dedicated/comma.svg",
  spiralSrc = "/images/dedicated/spiral.svg",
  button1Text = "Explore More",
  button1Link = "/explore",
  button2Text = "Download Brochure",
  button2Link = "/brochure.pdf",
}: DedicatedProps) {
  return (
    <div className="relative">
      {/* Background spiral */}
      {spiralSrc ? (
        <Image
          src={spiralSrc}
          height={272}
          width={686}
          alt="spiral-design"
          className="absolute left-0 hidden lg:block -z-10"
        />
      ) : null}

      <div className="mx-auto max-w-7xl px-4 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 my-16 gap-12">
          {/* COLUMN-1 (image) */}
          <div className="rounded-3xl">
            <Image
              src={imageSrc}
              alt="dedicated-section-image"
              width={500}
              height={650}
              className="mx-auto md:mx-0 rounded-3xl"
              priority
            />
          </div>

          {/* COLUMN-2 (content) */}
          <div className="relative">
            {/* comma decoration */}
            {commaSrc ? (
              <Image
                src={commaSrc}
                alt="comma-image"
                width={200}
                height={106}
                className="absolute comma-pos hidden lg:block"
              />
            ) : null}

            <h2 className="text-4xl lg:text-6xl pt-4 font-bold sm:leading-tight mt-5 text-center lg:text-start">
              {title}
            </h2>

            {subtitle ? (
              <p className="font-medium text-lightblack text-2xl mt-4 text-center lg:text-start">
                {subtitle}
              </p>
            ) : null}

            {points?.length ? (
              <ul className="list-disc text-2xl text-lightblack font-medium mt-6 space-y-3 pl-5 lg:pl-8 text-start">
                {points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-6 mt-10 text-center lg:text-start">
              {button1Text ? (
                <a href={button1Link ?? "#"} className="text-xl font-semibold text-white bg-btnblue py-4 px-10 rounded-full hover:bg-hoblue">
                  {button1Text}
                </a>
              ) : null}
              {button2Text ? (
    <a
      href={button2Link ?? "/path/to/file.pdf"} // link to your PDF
      download // prompts download instead of navigation
      target="_blank" // still allows opening in a new tab if needed
      rel="noopener noreferrer"
      className="text-xl font-semibold text-btnblue border border-btnblue py-4 px-10 rounded-full hover:bg-btnblue hover:text-white"
    >
      {button2Text}
    </a>
  ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
