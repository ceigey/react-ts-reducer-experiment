declare module "redux-arc" {

  interface Action {
    payload?: any
    meta?: any
    error?: boolean
  }

  interface ActionDict {
    [k: string]: Action
  }

  interface TypeString<N extends string, K> {
    namespace: N, key: K
  }

  export function createActions<NS extends string, Actions extends ActionDict>(
    namespace: NS,
    actions: Actions
  ): {
    types: {
      // This is a lie!
      [Key in keyof Actions]:
        TypeString<NS, Key>
    }
    creators: {
      [Key in keyof Actions]:
        (d: Actions[Key] extends Action
          ? Actions[Key]['payload']
          : null
        ) => {
          // This is a lie!
          type: TypeString<NS, Key>
        } & {
          [Subkey in keyof Actions[Key]]:
            Actions[Key][Subkey]
        }
    }
  }

  export function createReducers<State, Handlers>(

  )
}