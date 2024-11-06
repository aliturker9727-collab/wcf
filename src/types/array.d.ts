// https://stackoverflow.com/a/39495173
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>
declare type FixedArray<T, Max extends number, A extends T[] = []> = Max extends A['length'] ? A : FixedArray<T, Max, [...A, T]>
