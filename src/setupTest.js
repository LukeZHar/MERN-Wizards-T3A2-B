import '@testing-library/jest-dom'; 
import { afterEach, expect} from 'vitest'; 
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
});
