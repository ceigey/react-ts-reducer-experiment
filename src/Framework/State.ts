/**
 * The callbacks that setState uses
 * to calculate state changes
 */
export type SetStateUpdater<T> =
  (prevState: T) => T

/**
 * Defines the 'setState' function for a given
 * State interface. This 'setState' is normally
 * the function given by the 'useState' hook.
 * 
 * We force devs to use it with thunks/callbacks.
 */
export type SetState<T> =
  (callback: SetStateUpdater<T>) => void

export interface StateProps<T> {
  state: T
  setState: SetState<T>
}