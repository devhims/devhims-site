export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormResponse = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
};
