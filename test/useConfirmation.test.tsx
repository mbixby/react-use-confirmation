import React, { useEffect } from "react";
import { useConfirmation } from "./useConfirmation";
import { useAsyncCallback } from "./useAsyncCallback";

const ConfirmationModal = ({ onCancel, onConfirm }) => (
  <>
    Are you sure?
    <button onClick={onCancel} />
    <button onClick={onConfirm} />
  </>
);

const pet = jest.fn();

const Component = () => {
  const { confirm, confirmProps } = useConfirmation();

  const handleClick = useAsyncCallback(async () => {
    const didConfirm = await confirm();
    if (didConfirm) {
      pet();
    }
  }, [confirm]);

  return (
    <>
      <ConfirmationModal {...confirmProps} />
      <button onClick={handleClick}>Pet platypus</button>
    </>
  );
};

const Component2 = () => {
  const { confirm, confirmResult, confirmProps } = useConfirmation();

  useEffect(() => {
    if (confirmResult) {
      pet();
    }
  }, [confirmResult]);

  return (
    <>
      <ConfirmationModal {...confirmProps} />
      <button onClick={confirm}>Pet platypus</button>
    </>
  );
};
