export interface Tree<V, C extends Tree<any, any>> {
  value: V;
  weight: number;
  children: C[];
}
