'use client'

import Image from 'next/image'

type Boolish = boolean | 'true' | 'false' | 1 | 0 | '1' | '0'

interface HighlightSectionProps {
  title?: string
  description?: string[]
  buttonText?: string
  imageSrc?: string
  backgroundClass?: string
  reverse?: Boolish
  imageWidth?: number
  imageHeight?: number
}

export default function HighlightSection({
  title,
  description = [],
  buttonText,
  imageSrc,
  backgroundClass = 'bg-blue bg-digital',
  reverse,
  imageWidth = 600,
  imageHeight = 500,
}: HighlightSectionProps) {
  // normalize reverse to boolean
  const isReversed =
    reverse === true || reverse === 'true' || reverse === 1 || reverse === '1'

  return (
    <div className="mx-2">
      <div className={`mx-auto max-w-7xl px-4 pb-20 lg:px-8 rounded-3xl relative overflow-hidden ${backgroundClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* TEXT */}
          <div className={`pr-5 pt-24 order-first ${isReversed ? 'lg:order-last' : 'lg:order-first'}`}>
            <h3 className="text-4xl sm:text-6xl font-bold text-white mb-8 leading-snug text-center lg:text-start">
              {title}
            </h3>
            {description.map((para, i) => (
              <p
                key={i}
                className="text-white text-lg mb-6 text-center lg:text-start"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
            {buttonText && (
              <div className="text-center lg:text-start">
                <button className="text-xl font-semibold text-white bg-btnblue py-4 px-12 hover:bg-hoblue rounded-full">
                  {buttonText}
                </button>
              </div>
            )}
          </div>

          {/* IMAGE */}
          <div className={`relative order-last ${isReversed ? 'lg:order-first' : 'lg:order-last'}`}>
            <div className="lg:absolute right-0">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="highlight image"
                  width={imageWidth}
                  height={imageHeight}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
