import { FC } from 'react'

interface Props {
  questions?: Question[]
}

interface Question {
  question: string
  response: string
}

export const Faq: FC<Props> = (props: Props) => {
  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12">
        FAQs
      </h2>

      <ul className="flex items-start gap-8 flex-wrap">
        {props.questions.map((quest) => {
          return (
            <li className="w-2/5" key={quest.question}>
              <p className="text-lg font-medium leading-6 text-gray-900">
                {quest.question}
              </p>
              <p className="mt-2">
                <p className="text-base leading-6 text-gray-500">
                  {quest.response}
                </p>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
