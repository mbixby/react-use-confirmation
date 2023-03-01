import { useCallback, useMemo, useRef, useState } from "react";

type ResolveFn = <T>(value: T | PromiseLike<T>) => void;

export const useConfirmation = <
  ConfirmResult = true,
  ExtraProps extends object = object
>({
  keepOpen,
}: {
  /**
   * Keep open after confirmation
   */
  keepOpen?: boolean;
} = {}) => {
  // True when the confirmation dialog is open
  const [isOpen, setOpen] = useState(false);

  // Promise resolver called when the dialog is confirmed or cancelled
  const resolve = useRef<ResolveFn>();

  // Props passed to the confirmation dialog
  const extraProps = useRef<ExtraProps>();

  // Open the confirmation dialog
  const confirm = useCallback(
    (props?: ExtraProps): Promise<ConfirmResult | false> =>
      new Promise((resolveArg) => {
        // If confirm() is called twice without waiting for the result we'll optimistically
        // throw away the previous context
        resolve.current?.(false);

        resolve.current = resolveArg;
        extraProps.current = props;

        setOpen(true);
      }),
    [setOpen, resolve]
  );

  const close = useCallback(() => setOpen(false), []);

  const onConfirm = useCallback(
    (result: ConfirmResult) => {
      if (!keepOpen) {
        close();
      }
      resolve.current?.(result ?? true);
      resolve.current = undefined;
    },
    [close, keepOpen]
  );

  const onCancel = useCallback(() => {
    close();
    resolve.current?.(false);
    resolve.current = undefined;
  }, [close]);

  const confirmProps = useMemo(
    () => ({
      onConfirm,
      onCancel,
      open: isOpen,
      ...(extraProps.current as ExtraProps),
    }),
    [onConfirm, onCancel, isOpen]
  );

  return { confirm, confirmProps, isOpen, close };
};
