import {
  useMemo,
  useRef,
  type MutableRefObject,
  type Ref,
  type RefCallback,
} from 'react';

const useLifecycleRef = <T extends Element>({
  onAttach,
  onDetach,
  ref,
}: {
  onAttach?: (element: T) => void;
  onDetach?: (element: T) => void;
  ref?: Ref<T>;
}): RefCallback<T> & MutableRefObject<T> => {
  const innerRef = useRef<T>(null);
  return useMemo(() => {
    const callbackRef = ((_ref: T) => {
      if (innerRef.current) {
        if (onDetach && !_ref) {
          onDetach(innerRef.current);
        }
      } else if (onAttach && _ref) {
        onAttach(_ref);
      }
      innerRef.current = _ref;
      if (ref) {
        if (typeof ref === 'function') {
          ref(_ref);
        } else {
          (ref as MutableRefObject<T>).current = _ref;
        }
      }
    }) as RefCallback<T> & MutableRefObject<T>;
    return Object.defineProperty(callbackRef, 'current', {
      set: callbackRef,
      get: () => innerRef.current,
    });
  }, []);
};

export default useLifecycleRef;
