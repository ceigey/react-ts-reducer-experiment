/**
 * Defines the 'setState' function for a given
 * State interface. This 'setState' is normally
 * the function given by the 'useState' hook.
 * 
 * We force devs to use it with thunks/callbacks.
 */
export type SetState<T> =
  (callback: (prevState: T) => T) => void

/**
 * The canonical, base-line 'Action'.
 * It takes a setState function and
 * returns a paramaterless function
 * to be called by an event handler
 */
export type Action<T> =
  (setState: SetState<T>) => () => void


/**
 * An Action with:
 * - a paramter list to set the setState function
 * - a parameter list to bring in extra parameters
 * 
 * 7/10 you will want Action<T> or Action2<T,U>
 * 
 * Generics:
 * - T represents the type of your state
 * - U represents the type of your action's params
 */
export type Action2<T, U> =
  (setState: SetState<T>) => (x: U) => () => void

/**
 * See Action2, but now you have an extra
 * param list if you really need it... (of type V)
 */
export type Action3<T, U, V> =
  (setState: SetState<T>) => (x: U) => (y: V) => () => void

/**
 * For when you really don't care anymore.
 * DANGER: causes type erasure.
 */
export type ActionAny<T> =
  (setState: SetState<T>) => (...params: any) => () => void

/**
 * Action<T>, but for event handlers that pass events
 * that we need to read, like for input boxes. 
 */
export type ChangeAction<T> =
  (setState: SetState<T>) => (e: React.ChangeEvent<HTMLInputElement>) => void

export interface StateProps<T> {
  state: T
  setState: SetState<T>
}