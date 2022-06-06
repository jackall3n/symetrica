import { findTopWords } from "./findTopWords";

describe("findTopWords()", () => {
  it("should return the top words of a sentence", () => {
    const actual = findTopWords("this is a sentence. this is another sentence", 5);

    expect(actual).toEqual([
      {
        count: 2,
        word: "is"
      },
      {
        count: 2,
        word: "sentence"
      },
      {
        count: 2,
        word: "this"
      },
      {
        count: 1,
        word: "a"
      },
      {
        count: 1,
        word: "another"
      }
    ])
  })

  it("should limit the size of the results", () => {
    const actual = findTopWords("this is a sentence. this is another sentence!", 5);

    expect(actual).toEqual([
      {
        count: 2,
        word: "is"
      },
      {
        count: 2,
        word: "sentence"
      },
      {
        count: 2,
        word: "this"
      },
      {
        count: 1,
        word: "a"
      },
      {
        count: 1,
        word: "another"
      }
    ])
  })

  it("should handle multiple spaces", () => {
    const actual = findTopWords("this is a      sentence. this     is another   sentence!", 5);

    expect(actual).toEqual([
      {
        count: 2,
        word: "is"
      },
      {
        count: 2,
        word: "sentence"
      },
      {
        count: 2,
        word: "this"
      },
      {
        count: 1,
        word: "a"
      },
      {
        count: 1,
        word: "another"
      }
    ])
  })

  it("should remove punctuation", () => {
    const size = 3;
    const actual = findTopWords("this is a sentence. this is another sentence!", size);

    expect(actual).toEqual([
      {
        count: 2,
        word: "is"
      },
      {
        count: 2,
        word: "sentence"
      },
      {
        count: 2,
        word: "this"
      }
    ])

    expect(actual).toHaveLength(size)
  })

  it("should handle an empty sentence", () => {
    const actual = findTopWords("", 5);

    expect(actual).toEqual([])
  })

  it("should handle multiple lines", () => {
    const sentence = `
      this is a sentence. 
      this is another sentence!
    `;

    const actual = findTopWords(sentence, 5);

    expect(actual).toEqual([
      {
        count: 2,
        word: "is"
      },
      {
        count: 2,
        word: "sentence"
      },
      {
        count: 2,
        word: "this"
      },
      {
        count: 1,
        word: "a"
      },
      {
        count: 1,
        word: "another"
      }
    ])
  })
})
