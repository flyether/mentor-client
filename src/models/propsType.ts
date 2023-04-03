export type PropsModal = {
  message: string;
  close: () => void;
};

export type PropsModalParent = {
  message: string;
  close: () => void;
  closeParent?: () => void;
};
