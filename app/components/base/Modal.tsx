import * as React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { sendMessage } from '@utils'

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      color: theme.palette.grey[500],
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
  })

export interface IDialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose?: () => void
}

export const DialogTitle = withStyles(styles)((props: IDialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
          data-testid='close-button'
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const Modal: React.FunctionComponent<{
  id?: string
  modalTitle?: string
  isOpen: boolean
  fullScreen?: boolean
  onClose?: any
}> = ({
  id = 'customized-dialog-title',
  modalTitle = 'Modal title',
  isOpen,
  onClose,
  children,
  fullScreen,
}) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby={id}
      open={isOpen}
      fullScreen={fullScreen}
    >
      <DialogTitle id={id} onClose={onClose}>
        {modalTitle}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal

export const FormModalContent: React.FC<{
  onClose?: any
  onSubmit?: any
  onReset?: any
  modalTitle?: string
  isOpen: boolean
  fullScreen: boolean
  id: string
  maxWidth?: false | 'sm' | 'xs' | 'md' | 'lg' | 'xl'
}> = ({
  id,
  isOpen,
  fullScreen,
  onClose,
  onSubmit,
  onReset,
  children,
  modalTitle = 'Form Modal',
  maxWidth = 'xs',
}) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby={id}
      open={isOpen}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      fullWidth={true}
    >
      <DialogTitle id={id} onClose={onClose}>
        {modalTitle}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {onSubmit ? (
          <Button data-testid='modal-submit-button' autoFocus onClick={onSubmit} color='secondary'>
            Submit
          </Button>
        ) : null}
        {onReset ? (
          <Button data-testid='modal-reset-button' autoFocus onClick={onReset}>
            Reset
          </Button>
        ) : null}
        {onClose ? (
          <Button data-testid='modal-close-button' autoFocus onClick={onClose} color='primary'>
            Close
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}

interface IOptionModalHook {
  isOpen?: boolean | undefined
  fullScreen?: boolean
  modalTitle?: string
  params?: any
  CustomModal?: any
  optionCustomModal?: any
  name?: string
}

export const useModal = (
  ModalContenent: any,
  option: IOptionModalHook = {},
) => {
  const [isOpen, setOpen] = React.useState<boolean | null>(
    option.isOpen || null,
  )
  const handleModalClose = () => {
    sendMessage({
      message: `handleModalClose: ${option.modalTitle}`,
      name: option.name,
      params: {
        open: false,
      },
    })
    setOpen(false)
  }
  const handleModalShow = () => {
    sendMessage({
      message: `handleModalShow: ${option.modalTitle}`,
      name: option.name,
      params: {
        open: true,
      },
    })
    setOpen(true)
  }

  const renderModal =
    isOpen === null ? null : option.CustomModal ? (
      <option.CustomModal
        modalTitle={option.modalTitle}
        isOpen={isOpen}
        onClose={handleModalClose}
        fullScreen={option.fullScreen}
        {...option.optionCustomModal}
      >
        <ModalContenent {...option.params} />
      </option.CustomModal>
    ) : (
      <Modal
        modalTitle={option.modalTitle}
        isOpen={isOpen}
        onClose={handleModalClose}
        fullScreen={option.fullScreen}
      >
        <ModalContenent {...option.params} />
      </Modal>
    )

  return {
    closeModal: handleModalClose,
    isOpen,
    renderModal,
    showModal: handleModalShow,
  }
}
