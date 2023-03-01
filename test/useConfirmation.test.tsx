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

const BasicExample = () => {
  const { confirm, confirmProps } = useConfirmation();

  const confirmAndRemove = useAsyncCallback(async () => {
    const result = await confirm();
    if (result) {
      remove()
    }
  }, [confirm]);

  return <>
     <button onClick={() => confirmAndRemove()}>Remove item</button>
     <ConfirmationModal {...confirmProps} />
  </>
}




const PromiseDriven = () => {
  const { confirm: selectAlpaca, confirmProps: selectAlpacaProps } = useConfirmation();
  const { confirm: selectFeed, confirmProps: selectFeedProps } = useConfirmation();

  const findAndFeedAlpaca = useAsyncCallback(async () => {
    const selectedAlpaca = await selectAlpaca({ options: ['Xavier', 'Indigo'] });
    if (!selectedAlpaca) {
      return
    }
    const selectedFeed = await selectFeed({ options: ['hay', 'grain' ]});
    if (!selectedFeed) {
      snackbar.alert(`${selectedAlpaca} remains hungry`)
      return
    }
    if (didConfirm) {
      feed(animal, food);
    }
  }, [confirm]);

  return (
    <>
      <SelectModal {...selectAlpacaProps} />
      <SelectModal {...selectFeedProps} />
      <button onClick={findAndFeedAlpaca}>Feed an alpaca</button>
    </>
  );
};

const EffectDriven = () => {
  const { confirm: selectAlpaca, result: selectedAlpaca, confirmProps: selectAlpacaProps } = useConfirmation();
  const { confirm: selectFeed, result: selectedFeed, confirmProps: selectFeedProps } = useConfirmation();

  const handleFeedAlpacaClick = useCallback(() => {
    selectAlpaca({ options: ['Xavier', 'Indigo'] });
  }, [selectAlpaca]);

  useEffect(() => {
    if (selectedAlpaca) {
      selectFeed({ options: ['hay', 'grain' ]});
    }
  }, [selectedAlpaca])

  useEffect(() => {
    if (selectedFeed) {
      feed(selectedAlpaca, food);
    }
  }, [selectedAlpaca, selectedAlpaca])

  // - needs state reset
  const resetState = useCallback(() => {
    setSelectedAlpaca(undefined)
    setSelectedFeed(undefined)
  }, [])

  const onCancelSelectFeed = useCallback(() => {
    snackbar.alert(`${selectedAlpaca} remains hungry`)
    resetState()
  }, [])

  return (
    <>
    <SelectModal {...selectAlpacaProps} onCancel={onCancelSelectFeed} />
    <SelectModal {...selectFeedProps} onCancel={resetState} />
    <button onClick={handleFeedAlpacaClick}>Feed an alpaca</button>
    </>
  );
};

const CallbackDriven = () => {
  const { confirm: selectAlpaca, result: selectedAlpaca, confirmProps: selectAlpacaProps } = useConfirmation();
  const { confirm: selectFeed, result: selectedFeed, confirmProps: selectFeedProps } = useConfirmation();

  const handleFeedAlpacaClick = useCallback(async () => {
    selectAlpaca({ options: ['Xavier', 'Indigo'] });
  }, [selectAlpaca]);

  // - not restorable from props
  const handleConfirmAlpaca = useCallback(() => {
    if (selectedAlpaca) {
      selectFeed({ options: ['hay', 'grain' ]});
    }
  }, [selectedAlpaca])

  const handleConfirmFeed = useCallback(() => {
    if (selectedFeed) {
      feed(selectedAlpaca, food);
    } else {
      snackbar.alert(`${selectedAlpaca} remains hungry`)
    }
  }, [])

  return (
    <>
    <SelectModal {...selectAlpacaProps}  onConfirm={handleConfirmAlpaca} />
    <SelectModal {...selectFeedProps} onConfirm={handleConfirmFeed} />
    <button onClick={handleFeedAlpacaClick}>Feed an alpaca</button>
    </>
  );
};