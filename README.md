# `useLifecycleRef`

[![npm](https://img.shields.io/npm/v/use-lifecycle-ref)](https://npmjs.com/package/use-lifecycle-ref)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-lifecycle-ref)](https://bundlephobia.com/package/use-lifecycle-ref)
[![codecov](https://codecov.io/gh/billykwok/use-lifecycle-ref/branch/main/graph/badge.svg?token=I73J70MS2V)](https://codecov.io/gh/billykwok/use-lifecycle-ref)
[![Test](https://github.com/billykwok/use-lifecycle-ref/actions/workflows/test.yml/badge.svg)](https://github.com/billykwok/use-lifecycle-ref/actions/workflows/test.yml)

Like useRef, but with lifecycle and ref merging support

## Quick Look

Here is a simplfied demonstration on how easy to use `useLifecycleRef`.

```tsx
import React, { type ForwardedRef, type Ref, forwardRef } from 'react';
import useLifecycleRef from 'use-lifecycle-ref';

export function ComponentHidingRef({ id }: { id: string }) {
  const ref = useLifecycleRef<HTMLDivElement>({
    onAttach: (el: HTMLDivElement) => {
      console.log(`${el} attached`);
    },
    onDetach: (el: HTMLDivElement) => {
      console.log(`${el} detached`);
    }
  });
  return <div id={id} ref={ref}>Hello World</div>;
};

export const ComponentExposingRef = forwardRef(function HelloWorld(
  { id }: { id: string },
  ref: ForwardedRef<HTMLDivElement>
) {
  const _ref = useLifecycleRef<HTMLDivElement>({
    onAttach: (el: HTMLDivElement) => {
      console.log(`${el} attached`);
    },
    onDetach: (el: HTMLDivElement) => {
      console.log(`${el} detached`);
    },
    ref
  });
  return <div id={id} ref={_ref}>Hello World</div>;
});
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/use-lifecycle-ref/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/use-lifecycle-ref/blob/main/package.json).

## License

MIT
