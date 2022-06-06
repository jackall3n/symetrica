import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useMemo, useState } from "react";
import path from 'path';
import fs from 'fs';
import pluralize from 'pluralize';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';

import { findTopWords } from '../utils/findTopWords';
import Code from '../components/code';

const INITIAL_VALUE = `it was the best of times it was the worst of times`;

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ code }) => {
  const [size, setSize] = useState(5)
  const [sentence, setSentence] = useState(INITIAL_VALUE);

  // Memoize the results to reduce unnecessary processing.
  const topWords = useMemo(() => findTopWords(sentence, size), [sentence, size]);

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 overflow-hidden m-3">
      <div className="flex flex-col overflow-hidden">
        <h2 className="text-4xl font-medium p-3">
          The Function
        </h2>

        <div className="shadow-lg m-3 overflow-auto">
          <Code code={code} language="typescript" showLineNumbers />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="text-4xl font-medium p-3">
          The Results
        </h2>

        <label className="flex flex-col m-3">
          <span className="text-base font-medium">Enter your sentence here:</span>
          <textarea value={sentence}
                    rows={3}
                    placeholder="Enter your sentence here"
                    onChange={event => setSentence(event.target.value)}
                    className="border h-32 p-3 rounded-md mt-3 shadow"
          />
        </label>

        <div className="m-3 overflow-auto">
          <div className="flex justify-between items-center text-base">

            <div className="font-medium">Showing top {pluralize('result', size, true)}:</div>

            <div className="flex items-center justify-center font-medium">
              <div className="px-2">Results:</div>
              <div className="flex items-center justify-center">
                <button onClick={() => setSize(Math.max(1, size - 1))}>
                  <MinusCircleIcon className="w-5 h-5" />
                </button>

                <div className="w-7 text-center">{size}</div>

                <button onClick={() => setSize(size + 1)}>
                  <PlusCircleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="shadow-lg mt-3">
            <Code code={JSON.stringify(topWords, undefined, 2)} language="json" />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const functionPath = path.join(__dirname, '..', '..', '..', 'utils', 'findTopWords.ts');
  const code = fs.readFileSync(functionPath, { encoding: 'utf8' });

  return {
    props: {
      code
    },
  }
}

export default Home
