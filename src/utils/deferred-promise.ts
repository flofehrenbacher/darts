export type DeferredPromise<T> = {
  promise: Promise<T>
  resolve: (value?: T | PromiseLike<T> | undefined) => void
  reject: (value?: T | PromiseLike<T> | undefined) => void
}

export function createDeferredPromise<T>(): DeferredPromise<T> {
  const deferred = {} as DeferredPromise<T>

  deferred.promise = new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deferred.resolve = resolve
    deferred.reject = reject
  })

  return deferred
}
