import { Item } from "../@types/type";

export function getPbImageURL(index: Item, fileName = "photo") {
  return `${import.meta.env.VITE_PB_API}/files/${index.collectionId}/${index.id}/${
    index[fileName]
  }`;
}

// export function getPbImageURL<K extends keyof Item>(index: Item, fileName: K = "photo" as K) {
//   return `http://127.0.0.1:8090/api/files/${index.collectionId}/${index.id}/${index[fileName]}`;
// }
