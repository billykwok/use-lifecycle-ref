/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { createRef, type RefCallback, type Ref } from 'react';
import { describe, expect, afterEach, jest, test } from '@jest/globals';

import useLifecycleRef from './index';

describe('should update inner and outer refs, and call listeners correctly', () => {
  const onAttach = jest.fn((el: Element) => console.log(`${el} attached`));
  const onDetach = jest.fn((el: Element) => console.log(`${el} detached`));
  const instance = document.createElement('div');

  test('when outer ref is RefObject and inner ref is used as RefCallback', () => {
    const outerRef: Ref<Element> = createRef();
    const {
      result: { current: innerRef },
    } = renderHook(() =>
      useLifecycleRef({ onAttach, onDetach, ref: outerRef })
    );
    expect(onAttach).not.toHaveBeenCalled();
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();

    act(() => innerRef(instance));
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onAttach).toHaveBeenCalledWith(instance);
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef.current).toBe(instance);

    act(() => innerRef(null));
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();
  });

  test('when outer ref is RefObject and inner ref is used as RefObject', () => {
    const outerRef: Ref<Element> = createRef();
    const {
      result: { current: innerRef },
    } = renderHook(() =>
      useLifecycleRef({ onAttach, onDetach, ref: outerRef })
    );
    expect(onAttach).not.toHaveBeenCalled();
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();

    act(() => {
      innerRef.current = instance;
    });
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onAttach).toHaveBeenCalledWith(instance);
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef.current).toBe(instance);

    act(() => {
      innerRef.current = null;
    });
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();
  });

  test('when outer ref is RefCallback and inner ref is used as RefCallback', () => {
    const outerRef = jest.fn<RefCallback<Element>>((instance) => {
      console.log(`outerRef called with ${instance}`);
    });
    const {
      result: { current: innerRef },
    } = renderHook(() =>
      useLifecycleRef({ onAttach, onDetach, ref: outerRef })
    );
    expect(onAttach).not.toHaveBeenCalled();
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef).not.toHaveBeenCalled();

    act(() => innerRef(instance));
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onAttach).toHaveBeenCalledWith(instance);
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef).toHaveBeenCalledTimes(1);
    expect(outerRef).toHaveBeenCalledWith(instance);

    act(() => innerRef(null));
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef).toHaveBeenCalledTimes(2);
    expect(outerRef).toHaveBeenCalledWith(null);
  });

  test('when outer ref is RefCallback and inner ref is used as RefObject', () => {
    const outerRef = jest.fn<RefCallback<Element>>((instance) => {
      console.log(`outerRef called with ${instance}`);
    });
    const {
      result: { current: innerRef },
    } = renderHook(() =>
      useLifecycleRef({ onAttach, onDetach, ref: outerRef })
    );
    expect(onAttach).not.toHaveBeenCalled();
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef).not.toHaveBeenCalled();

    act(() => {
      innerRef.current = instance;
    });
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onAttach).toHaveBeenCalledWith(instance);
    expect(onDetach).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef).toHaveBeenCalledTimes(1);
    expect(outerRef).toHaveBeenCalledWith(instance);

    act(() => {
      innerRef.current = null;
    });
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledTimes(1);
    expect(onDetach).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef).toHaveBeenCalledTimes(2);
    expect(outerRef).toHaveBeenCalledWith(null);
  });

  afterEach(() => {
    onAttach.mockClear();
    onDetach.mockClear();
  });
});
