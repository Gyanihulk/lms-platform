"use client"
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const faqData = [
  {
    question: "What is the eligibility for joining CPL Ground Classes?",
    answer: "You must have completed 10+2 with Physics and Math. We also guide you through the DGCA documentation process if needed."
  },
  {
    question: "Do you offer online classes for pilot training?",
    answer: "Yes, we offer both online and offline CPL Ground Classes so you can choose the mode of learning that best suits you."
  },
  {
    question: "Can I complete my flying training outside India?",
    answer: "Yes, we have global tie-ups with flying schools in South Africa, Canada, USA, and Europe. We also help with visa and documentation."
  },
  {
    question: "What is the selection rate for cadet programs?",
    answer: "We have a 100% cadet selection rate for IndiGo and Air India programs for batches trained in 2023 and 2024."
  },
  {
    question: "Do you provide assistance with license conversion?",
    answer: "Yes, we offer dedicated conversion flying support for pilots who have trained abroad and wish to get DGCA licensing in India."
  }
];

const FAQ = () => {
  return (
    <div id="faq-section" className='mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg'>
      <h3 className='text-xl font-normal text-white text-center mb-6'>FAQ</h3>
      <h2 className='text-4xl lg:text-6xl font-semibold text-center text-white'>Frequently Asked<br /> Questions</h2>

      <div className="w-full px-4 pt-16">
        {faqData.map((item, index) => (
          <div key={index} className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ;
