import { PATH } from '@/constants/path';

type PathKeys = keyof typeof PATH;
export type PathValues = (typeof PATH)[PathKeys];
