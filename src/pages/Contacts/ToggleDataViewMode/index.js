import { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { DATA_VIEW_MODES } from '../constants/constants';

export const ToggleDataViewMode = ({ viewMode, setViewMode }) => {
  const handleChangeViewMode = useCallback(
    (_, nextView) => {
      setViewMode(nextView);
    },
    [setViewMode]
  );
  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={viewMode}
      exclusive
      onChange={handleChangeViewMode}
    >
      <ToggleButton
        value={DATA_VIEW_MODES.GRID}
        aria-label={DATA_VIEW_MODES.GRID}
      >
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton
        value={DATA_VIEW_MODES.TABLE}
        aria-label={DATA_VIEW_MODES.TABLE}
      >
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

ToggleDataViewMode.propTypes = {
  viewMode: PropTypes.oneOf([DATA_VIEW_MODES.TABLE, DATA_VIEW_MODES.GRID])
    .isRequired,
  setViewMode: PropTypes.func.isRequired,
};
