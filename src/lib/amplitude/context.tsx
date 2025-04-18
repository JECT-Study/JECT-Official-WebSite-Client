import { createContext } from 'react';

import { AmplitudeContextType } from './types';

export const AmplitudeContext = createContext<AmplitudeContextType | undefined>(undefined);
