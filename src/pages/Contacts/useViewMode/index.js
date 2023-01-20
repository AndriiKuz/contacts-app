import { useState, useEffect } from 'react';
import { DATA_VIEW_MODES } from '../constants/constants';

export const useViewMode = () => {
  const getInitialViewMode = () =>
    localStorage.getItem('viewMode') || DATA_VIEW_MODES.TABLE;

  const [viewMode, setViewMode] = useState(getInitialViewMode);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  return [viewMode, setViewMode];
};
