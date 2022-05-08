import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => { if (props.open) handleClickOpen() }, [props.open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const finish = () => {
    handleClose();
    props.verify();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">请验证邮箱</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            请前往您刚刚输入邮箱的收件箱中验证邮箱是否有效。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={finish} autoFocus>验证完成,去登陆</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
