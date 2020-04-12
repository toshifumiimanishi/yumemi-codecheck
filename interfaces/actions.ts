import * as actions from '../actions'

/**
 * Action Creator から Actions 型を抽出するヘルパー型
 *
 * ・{ [K in keyof T]: T[K] } は Mapped Types と keyof の併用でオブジェクトを走査
 * ・Conditinal Types で関数 (...args: any[]) => any か否かを評価
 */
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never
}

// export type T = ReturnTypes<typeof actions>

/**
 * オブジェクトの子ノード型を抽出するヘルパー型
 *
 * 子ノードがすべて String Literal Types なので、Union Types として抽出します。
 *
 * @example
 * type T = Unbox<{ a: 'A'; b: 'B'; c: 'C'; }>
 * -> type T = 'A' | 'B' | 'C'
 */
type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never

type CreatorsToActions<T> = Unbox<ReturnTypes<T>>

export type Actions = CreatorsToActions<typeof actions>
