# react-use-confirmation

> Await confirmation dialogs

[![NPM](https://img.shields.io/npm/v/react-use-confirmation)](https://www.npmjs.com/package/react-use-confirmation)
[![CI](https://img.shields.io/github/workflow/status/mbixby/react-use-confirmation/CI)](https://github.com/mbixby/react-use-confirmation/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/codecov/c/github/mbixby/react-use-confirmation.svg)](https://codecov.io/gh/mbixby/react-use-confirmation/branch/main)

Async/await chains are an alternative to effectful [...]. Unlike effects they have a local confirmation result.

## Simple example

```jsx
import React from 'react';
import { useConfirmation } from 'react-use-confirmation';

const ConfirmationModal = ({ onCancel, onConfirm }) => (
  <>
    Are you sure?
    <button onClick={onCancel} />
    <button onClick={onConfirm} />
  </>
);

const MyComponent = () => {
  const { confirm: select, confirmProps: selectProps } = useConfirmation();
  const { confirm: confirmRemoval, confirmProps: confirmRemovalProps } = useConfirmation();
  const handleClick = useAsyncCallback(async () => {
    const itemToRemove = await select();
    await confirm({ itemToRemove });
    api.removeItem();
  }, [])
  return (
    <>
      <button onClick={handleClick}>Remove item</button>
      <SelectModal {...selectProps} />
      <ConfirmationModal {...confirmProps} />
    </>
  );
};
```


## Installation

```sh
npm install --save react-use-confirmation
# or
yarn add react-use-confirmation
```


## Motivation

```jsx
import React from 'react';

const ConfirmationModal = ({ onCancel, onConfirm }) => (
  <>
    Are you sure?
    <button onClick={onCancel} />
    <button onClick={onConfirm} />
  </>
);

const MyComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { confirm, renderConfirm } = useConfirmation();
  const handleClick = async () => {
    const didConfirm = await confirm();
    if (didConfirm) {
      api.removeItem();
    }
  };
  return (
    <>
      {renderConfirm(ConfirmationModal)}
      <button onClick={handleClick}>Pet platypus</button>
    </>
  );
};
```

## License

This project is licensed under the terms of the
[MIT license](https://github.com/mbixby/react-use-confirmation/blob/master/LICENSE).

-------

<sup>1. With one minor prop change in `mouseEvent` / `touchEvent`. Compatibility with MUI is not guaranteed.</sup>

