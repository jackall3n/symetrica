import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useEffect, useMemo, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import path from 'path';
import fs from 'fs';
import pluralize from 'pluralize';
import { MinusCircleIcon, PlusCircleIcon, } from '@heroicons/react/outline';

import { findTopWords } from '../utils/findTopWords';
import Code from '../components/code';
import { Loader } from '../components/icons';

const SAMPLES = {
  charlesDickens: `it was the best of times it was the worst of times`,
  symetrica: `
Leading Threat Detection
Our goal is simple – to provide the very best, Machine Learning enhanced integrated threat detection and identification solutions. As a result, customs organisations and government departments worldwide have bought and are using our products to protect people and infrastructure 24 hours a day.

Machine Learning
Symetrica uses Machine Learning to provide the very best operational tools. As a result Symetrica provides world-leading performance and low through-life costs to the Military and Homeland Security markets.

Discovery Technology
Symetrica manufactures a complete range of Radiation Detection products including handhelds, backpacks, mobiles and portals. Founded on innovation our Discovery Technology® brings together everything we know about detection into overarching solutions that ‘just work’.

Radiation Vision
We have developed Radiation Vision™, the unique ability to visualise radiation without specialized nuclear imaging devices. This enables our users to see where the radiation is coming from and more efficiently carry out their duties. Radiation Vision is currently being showcased by Symetrica for pedestrian & personnel screening, the Discovery Mobile 360 and High Energy X-ray Cargo screening solutions
`.trim()
}


const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ code }) => {
  const [size, setSize] = useState(5)
  const [sentence, setSentence] = useState(SAMPLES.charlesDickens);

  const [initialized, setInitialized] = useState(false);

  // This is required as Next.js doesn't handle `performance.now()` very well, but I wanted to use it below.
  useEffect(() => {
    setInitialized(true)
  }, [])

  // Memoize the results to reduce unnecessary processing.
  const { words, duration } = useMemo(() => {
    const start = performance.now();

    const words = findTopWords(sentence, size);

    const end = performance.now();

    return {
      duration: end - start,
      words
    }

  }, [sentence, size]);

  if (!initialized) {
    return (
      <div className="flex flex-1 items-center justify-center font-semibold">
        <Loader />
        <div className="ml-2">Firing up the engines...</div>
      </div>
    );
  }

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

      <div className="flex flex-1 flex-col overflow-hidden">
        <h2 className="text-4xl font-medium p-3">
          The Results
        </h2>

        <label className="flex flex-col m-3">
          <span className="text-base font-medium flex justify-between">
            <span>Enter your sentence below: </span>
            <button className="underline text-sky-500"
                    onClick={() => setSentence(SAMPLES.symetrica)}>Set random text</button>
          </span>
          <TextareaAutosize value={sentence}
                            placeholder="Enter your sentence here"
                            onChange={event => setSentence(event.target.value)}
                            className="border h-32 p-3 rounded-md mt-3 shadow md:max-h-[50vh]"
          />
        </label>

        <div className="m-3 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center text-base">
            <div className="font-medium">Showing top {pluralize('result', size, true)} ({duration.toFixed(2)}ms):</div>

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

          <div className="shadow-lg mt-3 overflow-auto">
            <Code code={JSON.stringify(words, undefined, 2)} language="json" />
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
