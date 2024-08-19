import { AlbumPhotoItemFragment } from "@/gql/graphql";

export interface IAlbumState {
  activeMenuKey: string | number;
  phoneList: AlbumPhotoItemFragment[];
  isUploading: boolean;
}

export interface IAlbumStore extends IAlbumState {
  setActiveMenuKey: (activeMenuKey: IAlbumState["activeMenuKey"]) => void;
  setPhoneList: (phoneList: IAlbumState["phoneList"]) => void;
  setIsUploading: (isUploading: IAlbumState["isUploading"]) => void;
}
