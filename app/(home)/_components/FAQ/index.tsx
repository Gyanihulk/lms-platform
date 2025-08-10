'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

// =============================
// Types
// =============================
export type FAQItem = {
  id?: string
  question: string
  answer: string
}

export type FAQProps = {
  title?: string
  subtitle?: string
  bgClassName?: string
  cardClassName?: string
  items?: FAQItem[]
  faqs?: FAQItem[] // tolerate alternate API key
}

// =============================
// Component
// =============================
export default function FAQ({
  title = 'Frequently Asked Questions',
  subtitle = 'Answers to common questions about our training programs.',
  bgClassName = 'bg-faqblue',
  cardClassName = 'mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5',
  items,
  faqs,
}: FAQProps) {
  const finalItems = (items && items.length ? items : faqs) ?? []

  return (
    <section id="faq-section" className={`mx-auto max-w-7xl py-24 lg:px-8 rounded-2xl my-16 faq-bg ${bgClassName}`}>
      <h3 className="text-xl font-normal text-white text-center mb-6">FAQ</h3>
      <h2 className="text-4xl lg:text-6xl font-semibold text-center text-white">
        {title.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i === 0 && <br />}
          </React.Fragment>
        ))}
      </h2>
      {subtitle && (
        <p className="mt-4 text-center text-white/80 max-w-3xl mx-auto">{subtitle}</p>
      )}

      <div className="w-full px-4 pt-16">
        {(finalItems.length ? finalItems : getFAQFallback().items).map((item, index) => (
          <div key={item.id ?? index} className={cardClassName}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                    <span>{item.question}</span>
                    <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-70">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </section>
  )
}

