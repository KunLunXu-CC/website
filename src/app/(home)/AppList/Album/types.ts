import { AlbumPhotoItemFragment } from "@/gql/graphql";

export interface IAlbumState {
  activeMenuKey: string | number;
  phoneList: AlbumPhotoItemFragment[];
  isUploading: boolean;
  form: {
    type?: number;
    files: File[];
  };
}

export interface IAlbumStore extends IAlbumState {
  setActiveMenuKey: (activeMenuKey: IAlbumState["activeMenuKey"]) => void;
  setPhoneList: (phoneList: IAlbumState["phoneList"]) => void;
  setIsUploading: (isUploading: IAlbumState["isUploading"]) => void;
  updateForm: (form: Partial<IAlbumState["form"]>) => void;
  appendPhotos: (photos: IAlbumState["phoneList"]) => void;
  removePhotos: (ids: string[]) => void;
}
