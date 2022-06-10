# `useLifecycleRef`

Like useRef, but with lifecycle and ref merging support

## Quick Look

Here is a simplfied demonstration on how easy to use `useLifecycleRef`.

```tsx
import React, { type Ref } from 'react';
import useLifecycleRef from 'use-lifecycle-ref';
// or
// import { useLifecycleRef } from 'use-lifecycle-ref';

export type Props = {
  ref: Ref<HTMLDivElement>
};

export function HelloWorld({ ref }: Props) {
  const _ref = useLifecycleRef<HTMLDivElement>({
    onAttach: (el: HTMLDivElement) => {
      console.log(`${el} attached`);
    },
    onDetach: (el: HTMLDivElement) => {
      console.log(`${el} detached`);
    },
    ref
  });
  return <div ref={_ref}>Hello World</div>;
}
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/use-lifecycle-ref/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/use-lifecycle-ref/blob/main/package.json).

## License

MIT