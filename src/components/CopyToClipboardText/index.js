import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useCopyToClipboard } from 'react-use';
import Button from '@mui/material/Button';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export const CopyToClipboardText = ({ text }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copyStatus, setCopyStatus] = useState('Copy');

  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setCopyStatus('Copied');
  }, [copyToClipboard, text]);

  const onClickAway = useCallback(() => {
    setCopyStatus('Copy');
  }, []);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Tooltip title={copyStatus} placement="top" arrow>
        <Button sx={{ color: 'black' }} onClick={onClickCopy}>
          <FileCopyOutlinedIcon
            variant="outline"
            sx={{ marginRight: 1, fontSize: 'small' }}
          />
          {text}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

CopyToClipboardText.propTypes = {
  text: PropTypes.string.isRequired,
};
