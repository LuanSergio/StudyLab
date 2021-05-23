import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

interface IOptionInput {
  id: string;
  label: string;
  letter: string;
  value: string;
}

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const maxLength = 25;

const DynamicInput = () => {
  const inputList: Array<IOptionInput> = [
    {
      id: "A1",
      letter: "A",
      label: "Alternativa A",
      value: "",
    },
    {
      id: "B2",
      letter: "B",
      label: "Alternativa B",
      value: "",
    },
  ];

  const [inputs, setInputs] = useState(inputList);

  const handleOnChange =
    (id: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((inputs) =>
        inputs.map((input) =>
          input.id === id
            ? {
                ...input,
                value: evt.target.value,
              }
            : input
        )
      );
    };

  function reorderList(list: Array<IOptionInput>) {
    return list.map((item, index) => {
      item.letter = alphabet[index];
      item.label = `Alternativa ${alphabet[index]}`;
      return item;
    });
  }

  function handleRemoveOptionInput(id: string): void {
    const newList = inputs.filter((item) => item.id !== id);
    const reorderedList = reorderList(newList);
    setInputs(reorderedList);
  }

  function handleAddOptionInput(): void {
    const newList = inputs.map((option) => option);
    const alphabetLetters = getAlphabetLetters();
    if (alphabetLetters.length > 0) {
      newList.push({
        id: uuid(),
        letter: alphabetLetters[0],
        label: `Alternativa ${alphabetLetters[0]}`,
        value: "",
      });
      setInputs(newList);
    }
  }

  function getAlphabetLetters(): Array<string> {
    const usedLetters = inputs.map((option) => option.letter);
    const availableLetters = alphabet.filter(
      (letter) => !usedLetters.includes(letter)
    );
    return availableLetters;
  }

  return (
    <div className="app">
      <div className="container">
        {inputs.map((input) => (
          <div key={input.id}>
            <input
              value={input.value}
              onChange={handleOnChange(input.id)}
              className="input"
              maxLength={maxLength}
              placeholder={`Option ${input.letter}`}
              type="text"
            />
            <div className="helper-container">
              <button
                onClick={() => handleRemoveOptionInput(input.id)}
                className="remove"
              >
                Remove
              </button>
              <span className="helper-text">
                {maxLength - input.value.length} characters remaining
              </span>
            </div>
          </div>
        ))}

        <button onClick={handleAddOptionInput} className="button">
          Add new input
        </button>
      </div>
    </div>
  );
};

export default DynamicInput;
